import { Configuration, OpenAIApi } from "openai";

// Configuration and setup for OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  // Check if OpenAI API key is configured
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const mood = req.body.mood || '';
  // Validate the provided mood (ensures mood data exists in the prompt and trims)
  if (mood.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid mood",
      }
    });
    return;
  }

  try {
    // Make a completion request to OpenAI API
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(mood),
      temperature: 0.6,
      max_tokens: 100,
    });

    // Parse and extract suggestions from the API response
    const suggestions = parseResponse(completion.data.choices);

    // Return the suggestions in the response
    res.status(200).json({ suggestions });
  } catch(error) {
    // Error handling logic (the first I added while tested)
    if(error.response.status === 429){
      console.erroe('Server is overloaded. Please wait a few moments and try again')
    }
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
  const capitalizedMood = mood[0].toUpperCase() + mood.slice(1).toLowerCase();
  let sentiment = "";

  // Set sentiment based on mood
  if (mood.toLowerCase() === "negative") {
    sentiment = "Negative";
  } else if (mood.toLowerCase() === "positive") {
    sentiment = "Positive";
  } else {
    sentiment = `Classify the sentiment in the mood "${capitalizedMood}" and suggest three well-being activities to boost the mood.`;
  }

  return `
Mood: Happy
Activity: You seem Happy! Go for a walk in nature, listen to uplifting music, practice gratitude
Mood: Stressed
Activity: It's okay to be stressed sometimes. Try deep breathing exercises, engage in physical activity, talk to a friend
Mood: 😕
Activity: You seem sad today. Surround yourself with loved ones, hug a favorite stuffed animal, take your pet for a walk
Mood: ${capitalizedMood} ${sentiment}
Activity:`;
}


function parseResponse(choices) {
  const suggestions = choices.map(choice => choice.text.trim());
  return suggestions;
}