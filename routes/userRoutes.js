import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import validateRegister from "../middleware/validateRegister.js";
import multer from "multer";
import {
  registerUser,
  loginUser,
  toggleEmailVerification,
  checkVerification,
  fetchVerifiedEmail,
  checkIfAuthenticated,
  logoutUser,
  checkIfExpired,
  forgotPassword,
  verifyUserPassword,
  uploadProfilePicture,
  changePassword,
  deleteAccount,
  fetchPrivateData,
  darkMode,
  lightMode,
} from "../controllers/userController.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },

  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

router.put(
  "/toggle-email-verification",
  authenticateToken,
  toggleEmailVerification
);
router.get("/check-verification/:userId", checkVerification);

router.get("/verify-email", fetchVerifiedEmail);

router.get("/is-authenticated", authenticateToken, checkIfAuthenticated);

router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword);

router.post("/check-if-expired", checkIfExpired);

router.post("/verify-change-password", verifyUserPassword);

router.post(
  "/uploadProfilePic",
  authenticateToken,
  upload.single("file"),
  uploadProfilePicture
);
router.post("/changePassword", authenticateToken, changePassword);

router.delete("/deleteAccount", authenticateToken, deleteAccount);

router.get("/private/data", authenticateToken, fetchPrivateData);

router.put("/dark-mode", authenticateToken, darkMode);

router.put("/light-mode", authenticateToken, lightMode);

export default router;
