# Bloom: Meet Your AI-Powered Growth Mindset

Created: May 29, 2023 12:14 PM
Tags: Tech Design, Walkthrough

## v1: As a user of Bloom, an AI-powered well-being app

- I want to be able to express and communicate my mood effectively and freely, whether it's through **one word**, **one emoji(or more)**, or an entire paragraph.
- I seek to experience an empowered growth mindset, **receiving personalized guidance and suggestions** that enhance my overall well-being.

**Execution** 

1. **Started by checking out the [quick-start tutorial on chat gpt 4](https://platform.openai.com/docs/quickstart)**
    
    Learned about the logic that makes for the best prompts and trained model
    
    1. Examples in a prompt make for better completions
    2. Being specific in your prompt is how you train your model
    3. When **temperature** is above 0, submitting the same prompt results in different completions each time
        1. “Remember that the model predicts which text is most likely to follow the text preceding it. Temperature is a value between 0 and 1 that essentially lets you control how confident the model should be when making these predictions. Lowering temperature means it will take fewer risks, and completions will be more accurate and deterministic. Increasing temperature will result in more diverse completions.”
2. **Forked the [OpenAI quick-start node repo](https://github.com/openai/openai-quickstart-node)**
    
    An example pet name generator app used in the OpenAI API [quickstart tutorial](https://platform.openai.com/docs/quickstart). It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/).
    
    ![Screen Shot 2023-05-29 at 12.47.46 PM.png](Bloom%20Meet%20Your%20AI-Powered%20Growth%20Mindset%2099be9ec7e622480f957a4e8762c75d4a/Screen_Shot_2023-05-29_at_12.47.46_PM.png)
    
    - Function generatePrompt is responsible for accepting the input animal
    - Firsts makes sure the input is capitalized (the first letter), and then returns a dynamic completion that’s different for each input based on the prompt instructions and examples and temperature setting
3. Defined mood and trained the model to accept moods communicated in one word, sentence, or paragraph. Trained model to return three ways/suggestions to boost the mood. Updated the index.js file to update the mood data and output the suggestion data generated in generatePrompt to the user. Added styling to improve the user experience and over product brand.
    
    [https://github.com/jaesow/gpt4-react-app/commit/b4b296f9e31fdd4a821b6bebbcb2a9db0bd2565e](https://github.com/jaesow/gpt4-react-app/commit/b4b296f9e31fdd4a821b6bebbcb2a9db0bd2565e)
    

## v2: **As a user of Bloom, an AI-powered well-being app**

- I desire a platform that can **identify and understands** my state of mind, leading with compassion to help me better understand my moods.
- I anticipate tracking my self-discovery journey, fostering positive changes in my mental health and achieving a brighter state of mind over time.

**Execution**

1. Defined sentiment and trained the model to classify the sentiment in the mood and suggest three well-being activities to boost the mood.
2. Improved the Suggestions(Activity) output to include the sentiment with a considerate and encouraging tone instead of being as blunt and direct as before. Trained the model to read emoji’s as Mood inputs and output sentiment, and 3 activities in the same way as with text.
    
    [https://github.com/jaesow/gpt4-react-app/commit/570b098647500817ab5e9ade6af275b2a9df6c0b](https://github.com/jaesow/gpt4-react-app/commit/570b098647500817ab5e9ade6af275b2a9df6c0b)
    
3. Added a sentiment chart to be updated after each mood input. Tracks the sentiment within a given session. Added some animation to the sentiment output.
    
    [https://github.com/jaesow/gpt4-react-app/commit/3d9e3a018c44aa402d188a0c4c11e14dae8e4f1d](https://github.com/jaesow/gpt4-react-app/commit/3d9e3a018c44aa402d188a0c4c11e14dae8e4f1d)
    

## Next Steps

- Allow for the sentiment captured from an emoji to be represented on the sentiment chart and not the emoji itself
- Store user data across sessions
- Want to explore more react chart packages that may better present the information
- Improve the user interface
- Add another feature to serve the user’s mental health