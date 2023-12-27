const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

export default async function dbConnect() {
  await mongoose.connect(MONGODB_URI);
}
