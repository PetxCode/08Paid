import { Document, Schema, model } from "mongoose";

interface iUser {
  email: string;
  password: string;
  isActive: boolean;
  status: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
