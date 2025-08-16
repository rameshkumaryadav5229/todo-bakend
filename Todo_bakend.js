const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://ramesh9450:ramesh9450@cluster0.kotyazi.mongodb.net/",
    {}
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// Schema & Model
const todoSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

// Routes

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// Create new todo
app.post("/todos", async (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc)
    return res.status(400).json({ error: "Title and description required" });

  const newTodo = new Todo({ title, desc });
  await newTodo.save();
  res.json(newTodo);
});

// Update todo
app.put("/todos/:id", async (req, res) => {
  const { title, desc } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, desc },
    { new: true }
  );
  res.json(updated);
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
