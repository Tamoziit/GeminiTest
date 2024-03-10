const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = 3000;

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Start chat function
const startChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContent(message);
  const response = await result.response;
  const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Define route for starting a chat
app.post("/start-chat", startChat);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});