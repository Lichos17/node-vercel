import mongoose, { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IBought extends Document {
  user: string;
  property: string;
}

const boughtSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
});

export default model<IBought>("Bought", boughtSchema);
