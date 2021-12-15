const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  author_id: Number,
  author_name: String,
  birth_place: String,
  follower_count: Number,
  about_author: String,
});
module.exports = mongoose.model("authors", AuthorSchema);
