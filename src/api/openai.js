import express from 'express';
import history from '../models/history.js';
import { Configuration, OpenAIApi } from "openai";


// ----------------------------------------------------------------
// Setting up OpenAI API
// ----------------------------------------------------------------

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// Ada model is trained with data up to October 2019.
// Capable of very simple tasks,
// usually the fastest model in the GPT-3 series, and lowest cost.
// Max tokens of 2048
const AiPrompt = async (userId, model, prompt) => {
  try {
    const completion = await openai.createCompletion({
      model: `text-${model}`,
      prompt: prompt,
      temperature: 0
    });
    return completion;
  } catch (err) {
    console.error(err);
    res.sendJSON({
      status: 500,
      message: "An errror occurred while trying to process your request."
    });;
  }
}

// ----------------------------------------------------------------
// Router for communicating with OpenAI API
// ----------------------------------------------------------------

const AiRouter = express.Router();

AiRouter.get('/:userId/history', async (req, res) => {
  try {
    let userHistory = await history.find({ userId: req.params.userId })
    res.sendJSON({
      status: 200,
      history: [ userHistory ]
    });
  } catch (err) {
    console.error(err);
    res.sendJSON(res, {
      error: err.message
    });
  }
});

AiRouter.post('/:userId/:model/prompt', async (req, res) => {
  // create a middleware function handle the conditional cases
  const { userId, model } = req.params;
  const prompt = req.body.prompt || '';
  if (prompt.trim().length === 0) {
    res.sendJSON(res, {
      status: 400,
      error: {
        message: 'Please enter a valid prompt.'
      }
    });
    return;
  }
  if (!config.apiKey) {
    res.sendJSON(res, {
      status: 401,
      error: {
        message: 'Invalid or missing API Key for OpenAI.'
      }
    });
    return;
  }
  if (!userId || userId === '') {
    res.sendJSON(res, {
      status: 401,
      error: {
        message: 'Invalid or missing User ID.'
      }
    });
    return;
  }
  if (!prompt || prompt === '') {
    res.sendJSON(res, {
      status: 400,
      error: {
        message: 'Please enter a valid prompt.'
      }
    });
    return;
  }
  try {
    const promptResponse = await AiPrompt(userId, model, prompt);
    const userHistory = await history.create({ userId, prompt: promptResponse.data.choices[0].text });
    res.sendJSON(res, {
      status: 200,
      response: promptResponse.data.choices[0].text,
      fullResponse: promptResponse
    });
  } catch (err) {
    console.error(err);
    res.sendJSON(res, {
      status: 404,
      error: {
        message: err.message
      }
    })
  }
});

export default AiRouter;