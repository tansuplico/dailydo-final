import asyncHandler from "express-async-handler";
import { User } from "../models/usersModel.js";

export const fetchWorkspace = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(404).json({ error: "Unauthorized" });
    }

    const findUserData = await User.findOne({ _id: userId });

    res.status(200).json({ findUserData });
  } catch (err) {
    res.status(500).json({ error: `An internal error has occured: ${err}` });
  }
});
