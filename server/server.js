const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newMessage = `${new Date().toISOString()} | ${name} | ${email} | ${message}\n`;

  fs.appendFile("messages.txt", newMessage, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error saving message" });
    }
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});