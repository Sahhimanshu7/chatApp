import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

export default User;
