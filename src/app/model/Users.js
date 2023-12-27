import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

mongoose.models = {};
const Users = mongoose.model("Users", usersSchema);
export default Users;
