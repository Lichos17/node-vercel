import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  created_at: string;
  updated_at: string;
  comparePasswords: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el: any) {
        return el === (this as { password: string }).password;
      },
      message: "Passwords are not the same!",
    },
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

userSchema.pre<IUser>("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePasswords = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
