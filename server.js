const express = require("express");
const cors = require('cors'); //allows for multi server connection
const mongoose = require("mongoose");

const app = express();
app.use(cors({
  origin: 'https://gun4shot.github.io'
}));
app.use(express.json());
require('dotenv').config();

const MONGO_URI="mongodb+srv://sidant:Sidant=9749896792@taptapbird.6gt5flt.mongodb.net/?retryWrites=true&w=majority&appName=TapTapBird"

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define Score Schema
const scoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  level: String
});

const Score = mongoose.model("Score", scoreSchema);

// Get top 5 scores
app.get("/leaderboard", async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a new score
app.post("/submit", async (req, res) => {
  const { name, score, level } = req.body;

  if (!name || score == null || !level) {
    return res.status(400).json({ error: "Name and score required" });
  }

  try {
    const newScore = new Score({ name, score, level });
    await newScore.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
