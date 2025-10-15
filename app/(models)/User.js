import mongoose, { Schema } from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

//this will check if the model is already created, if not it will create a new one
const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
