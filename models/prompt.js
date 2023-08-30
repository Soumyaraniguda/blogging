import mongoose, { Schema, models, model } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", // 1 to many relation, 1 user can create many number of prompts
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

// Get the prompts from models or create one based on this schema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
