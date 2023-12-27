import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  publish_year: {
    type: Number,
  },
  poster: {
    type: Buffer,
  },
});

mongoose.models = {};
const Users = mongoose.model("Movies", movieSchema);
export default Users;
