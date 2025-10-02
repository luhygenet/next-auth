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

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
