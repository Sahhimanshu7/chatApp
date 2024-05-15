import express from "express";

import {
  getUser,
  loginUser,
  signupUser,
  getAllUsers,
} from "../controllers/user.js";

const router = express.Router();

router.post("/sign-up", signupUser);
router.post("/login", loginUser);
router.post("/get-user", getUser);

// Google example
// GET /users/search?name=John%20Doe
router.get("/get-users", getAllUsers);

export default router;
