import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const mood = req.body.mood || '';
  if (mood.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid mood",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(mood),
      temperature: 0.6,
      max_tokens: 100,
     // n: 3, // Generate three suggestions
    });
    const suggestions = parseResponse(completion.data.choices);
    res.status(200).json({ suggestions });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(mood) {
  const capitalizedMood =
    mood[0].toUpperCase() + mood.slice(1).toLowerCase();
  return `Suggest three ways to improve a bad mood.

Mood: Happy
Ways: Go for a walk in nature, listen to uplifting music, practice gratitude
Mood: Stressed
Ways: Try deep breathing exercises, engage in physical activity, talk to a friend
Mood: ${capitalizedMood}
Ways:`;
}

function parseResponse(choices) {
  const suggestions = choices.map(choice => choice.text.trim());
  return suggestions;
}