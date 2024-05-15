import User from "../models/UserModel.js";

import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseApp = getApp();
const storage = getStorage(
  firebaseApp,
  "gs://chatapp-4141.appspot.com/profileImages",
);
