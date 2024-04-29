import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { fetchWorkspace } from "../controllers/workspaceController.js";
const router = express.Router();

router.get("/", authenticateToken, fetchWorkspace);

export default router;
