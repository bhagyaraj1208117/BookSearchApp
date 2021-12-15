const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  book_id: Number,
  title: String,
  description: String,
  rating: String,
  price: Number,
  author_id: Number,
});
module.exports = mongoose.model("Books", BookSchema);
