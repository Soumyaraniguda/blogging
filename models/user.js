import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    // match: [
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-A0-9._]+(?<![_.])$/,
    //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    // ],
  },
  image: {
    type: String,
  },
});

// The "models" object is provided by the Mongoose Library and stores all the registered models.
// If a model named "User" already exist in the "models" object, it assigns that exisiting model
// to the "User" variable
// This prevents redefining the model and ensures that the exisiting model is reused.

// If a model named "User" does not exist in the "models" object, the "model" function from
// Mongoose is called to create a new model
// This newly created model is then assigned to the "User" variable

// This route is called every time when the connection is established every single time from scratch
// So we need to make this additional check

const User = models.User || model("User", UserSchema);

export default User;
