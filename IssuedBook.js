const mongoose = require("mongoose");

const issuedBookSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  title: String,
  issueDate: String,
  returnDate: String,
  userEmail: { type: String, required: true }, // USER IDENTIFIER
});

module.exports = mongoose.model("IssuedBook", issuedBookSchema);
