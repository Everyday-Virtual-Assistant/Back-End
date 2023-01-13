import express from 'express';
import dotenv from 'dotenv';
import history from '../models/history.js';
import { Configuration, OpenAIApi } from "openai";
dotenv.config();


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
const AiPrompt = async (model, prompt) => {
  try {
    const completion = await openai.createCompletion({
      model: `text-${model}`,
      prompt: prompt,
      temperature: 0,
      max_tokens: 2000,
    });
    return completion.data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
}

// ----------------------------------------------------------------
// Router for communicating with OpenAI API
// ----------------------------------------------------------------

const AiRouter = express.Router();

AiRouter.get('/:userId/history', async (req, res) => {
  try {
    let userHistory = await history.find({ userId: req.params.userId })
    res.status(200).json({
      history: [ userHistory ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }
});

AiRouter.post('/:userId/:model/prompt', async (req, res) => {
  // create a middleware function handle the conditional cases
  const { userId, model } = req.params;
  const prompt = req.body.prompt || '';
  console.log({ userId, model, prompt });
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt."
      }
    });
    return;
  }
  if (!config.apiKey) {
    res.status(401).json({
      error: {
        message: "Invalid or missing API Key for OpenAI."
      }
    });
    return;
  }
  if (!userId || userId === '') {
    res.status(401).json({
      error: {
        message: "Invalid of missing User ID."
      }
    });
    return;
  }
  if (!prompt || prompt === '') {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt and try again."
      }
    });
    return;
  }
  try {
    const promptResponse = await AiPrompt(model, prompt);
    // const userHistory = await history.create({ userId, prompt: promptResponse.data.choices[0].text });
    res.send(promptResponse);
  } catch (err) {
    console.error(`Error with OpenAI API request: ${err.message}`);
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }
});

export default AiRouter;