import "dotenv/config";
import asyncHandler from "express-async-handler";
import { User } from "../models/usersModel.js";
import { NoteList } from "../models/noteListModel.js";
import { TaskList } from "../models/taskListModel.js";
import { TrashList } from "../models/trashListModel.js";
import { createTransport } from "nodemailer";
import { nanoid } from "nanoid";
import { validateMIMEType } from "validate-image-type";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, picture, verified } = req.validatedInput;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userInfo = await User.create({
      username,
      email,
      password: hash,
      picture,
      verified,
    });

    const deconstructed = {
      username: userInfo.username,
      email: userInfo.email,
      userId: userInfo._id,
    };

    const randTaskListId = nanoid();
    const randToDoId = nanoid();
    const randDoingId = nanoid();
    const randDoneId = nanoid();

    await TaskList.create({
      user: userInfo._id,
      taskGroupList: [
        {
          id: randTaskListId,
          taskGroupName: "",
          taskList: {
            toDoList: [
              {
                id: randToDoId,
                task: "",
                isImportant: false,
                dateCreated: new Date(),
              },
            ],
            doingList: [
              {
                id: randDoingId,
                task: "",
                isImportant: false,
                dateCreated: new Date(),
              },
            ],
            doneList: [
              {
                id: randDoneId,
                task: "",
                isImportant: false,
                dateCreated: new Date(),
              },
            ],
          },

          dateCreated: new Date(),
        },
      ],
    });

    const noteRandId = nanoid();

    await NoteList.create({
      user: userInfo._id,
      noteList: [{ id: noteRandId, name: "", content: "", isFavorite: false }],
    });

    await TrashList.create({ user: userInfo._id, trashList: [] });

    const token = jwt.sign(deconstructed, process.env.MY_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All inputs must be filled" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "This email is not registered" });
    }

    const validatedPassword = await bcrypt.compare(password, user.password);

    if (!validatedPassword) {
      return res.status(403).json({ error: "Incorrect password" });
    }

    if (!user.verified && user.emailVerificationEnabled) {
      const verificationToken = jwt.sign(
        { userId: user._id },
        process.env.MY_SECRET,
        { expiresIn: "365d" }
      );

      const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

      const transporter = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        auth: {
          user: "theofficialdailydo@gmail.com",
          pass: process.env.EMAIL_SECRET,
        },
      });

      const mailOptions = {
        from: "theofficialdailydo@gmail.com",
        to: email,
        subject: "Email Verification",
        html: `
          <p>Please click the following link to verify your email address:</p>
          <a href="${verificationLink}">${verificationLink}</a>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res
            .status(500)
            .json({ message: "Failed to send verification email" });
        }

        return res
          .status(200)
          .json({ message: "Email verification sent", user });
      });
    } else if (
      (!user.verified && !user.emailVerificationEnabled) ||
      (user.verified && user.emailVerificationEnabled)
    ) {
      const cookieToken = jwt.sign(
        { userId: user._id },
        process.env.MY_SECRET,
        { expiresIn: "365d" }
      );

      res.cookie("token", cookieToken, { httpOnly: true });

      return res.status(200).json({ message: "Cookie set successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `A server error has occured: ${error}` });
  }
});

export const toggleEmailVerification = asyncHandler(async (req, res) => {
  try {
    const { verificationEnabled } = req.body;
    const user = await User.findOne({ _id: req.authInfo.userId });

    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    if (!verificationEnabled) {
      const updateEmailStatus = await User.findOneAndUpdate(
        { _id: req.authInfo.userId },
        { $set: { emailVerificationEnabled: true } },
        { new: true }
      );

      if (!updateEmailStatus) {
        return res
          .status(404)
          .json({ error: "Couldn't activate email verification" });
      }

      res.status(200).json({ message: "Email Verification Enabled" });
    } else {
      const updateEmailStatus = await User.findOneAndUpdate(
        { _id: req.authInfo.userId },
        { $set: { emailVerificationEnabled: false, verified: false } },
        { new: true }
      );

      if (!updateEmailStatus) {
        return res
          .status(404)
          .json({ error: "Couldn't activate email verification" });
      }

      res.status(200).json({ message: "Email Verification Disabled" });
    }
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const checkVerification = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user.verified) {
      const deconstructed = {
        username: user.username,
        email: user.email,
        userId: user._id,
      };

      const cookieToken = jwt.sign(deconstructed, process.env.MY_SECRET, {
        expiresIn: "365d",
      });

      res.cookie("token", cookieToken, {
        httpOnly: true,
      });

      return res.status(200).json({ user });
    } else {
      return res.status(200).json({ message: "Email not verified yet" });
    }
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const fetchVerifiedEmail = asyncHandler(async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.MY_SECRET);
    const { userId } = decoded;

    await User.findByIdAndUpdate(userId, { verified: true }, { new: true });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired verification token" });
  }
});

export const checkIfAuthenticated = asyncHandler(async (req, res) => {
  if (req.authInfo.userId) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(404).json({ isAuthenticated: false });
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const checkIfExpired = asyncHandler(async (req, res) => {
  try {
    const { userId, token } = req.body;

    const findUser = await User.findOne({ _id: userId });

    if (token !== findUser.verificationToken) {
      return res.status(403).json({ error: "Token expired" });
    }

    findUser.verificationToken = null;
    await findUser.save();

    return res.status(200).json({ message: "Authorized" });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(403).json({ error: `Invalid input value` });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email not registered" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.verificationToken = resetToken;
    await user.save();

    const verificationLink = `http://localhost:3000/change-password?token=${resetToken}&user=${user._id}`;
    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: "theofficialdailydo@gmail.com",
        pass: process.env.EMAIL_SECRET,
      },
    });

    const mailOptions = {
      from: "theofficialdailydo@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `
        <p>Please click the following link to change your password:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send verification email" });
      }

      return res.status(200).json({ message: "Email verification sent", user });
    });
  } catch (err) {
    res.status(500).json({ error: `An error has oocured: ${err}` });
  }
});

export const verifyUserPassword = asyncHandler(async (req, res) => {
  try {
    const { newPassword, reTypePassword, userToken } = req.body;

    if (!newPassword || !reTypePassword) {
      return res.status(403).json({ error: "All inputs must be filled" });
    }

    if (newPassword.length < 8) {
      return res
        .status(403)
        .json({ error: "Password must be at least 8 characters" });
    }

    if (newPassword !== reTypePassword) {
      return res.status(403).json({ error: "Password doesn't match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(reTypePassword, salt);

    await User.findByIdAndUpdate(userToken, { password: hash }, { new: true });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const uploadProfilePicture = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
    }

    const validationResult = await validateMIMEType(req.file.path, {
      originalFilename: req.file.originalname,
      allowMimeTypes: ["image/jpeg", "image/gif", "image/png", "image/svg+xml"],
    });

    if (!validationResult.ok) {
      return res.send(400);
    }

    const profilePicPath = `${req.protocol}://${req.get("host")}/Images/${
      req.file.filename
    }`;

    const findUser = await User.findOne({ _id: userId });

    if (!findUser) {
      res.status(404).json({ error: "User doesn't exist" });
    }

    const email = findUser.email;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { picture: profilePicPath } },
      { new: true }
    );

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const { checkCurrentPassword, newPassword, reNewPassword } = req.body;
    const findUser = await User.findOne({ _id: req.authInfo.userId });

    if (!findUser) {
      return res.status(404).json({ error: "No user found" });
    }

    if (!checkCurrentPassword || !newPassword || !reNewPassword) {
      return res.status(400).json({ error: "All inputs must be filled" });
    }

    const validateCheckedPassword = await bcrypt.compare(
      checkCurrentPassword,
      findUser.password
    );

    if (!validateCheckedPassword) {
      return res.status(403).json({ error: "Incorrect Password" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    if (newPassword !== reNewPassword) {
      return res.status(403).json({ error: "Password doesn't match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const updatedPassword = await User.findOneAndUpdate(
      { _id: req.authInfo.userId },
      { $set: { password: hash } },
      { new: true }
    );

    if (!updatedPassword) {
      return res
        .status(500)
        .json({ error: "An error has occured, couldn't update password" });
    }

    res.status(200).json({ message: "Password Changed Successfully" });
  } catch (error) {
    return res.status(500).json({ error: `Error: ${error}` });
  }
});

export const deleteAccount = asyncHandler(async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: req.authInfo.userId });

    if (!findUser) {
      return res.status(404).json({ error: "No user found" });
    }

    const deleteAccount = await User.findOneAndDelete({ _id: findUser._id });

    if (!deleteAccount) {
      return res.status(404).json({ error: "Account doesn't exist" });
    }

    await TaskList.findOneAndDelete({ user: findUser._id });
    await NoteList.findOneAndDelete({ user: findUser._id });
    await TrashList.findOneAndDelete({ user: findUser._id });

    res.status(200).json({ message: "Account successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const fetchPrivateData = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(404).json({ error: "Unauthorized" });
    }

    const findUserData = await User.findOne({ _id: userId });

    res.status(200).json({ findUserData });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const darkMode = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(404).json({ error: "Unauthorized" });
    }

    const updateDarkMode = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { dark: true } },
      { new: true }
    );

    if (!updateDarkMode) {
      return res.status(400).json({ error: "Unable to update dark mode" });
    }

    res.status(200).json({ message: "Dark mode toggled" });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});

export const lightMode = asyncHandler(async (req, res) => {
  try {
    const userId = req.authInfo.userId;

    if (!userId) {
      res.status(404).json({ error: "Unauthorized" });
    }

    const updateDarkMode = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { dark: false } },
      { new: true }
    );

    if (!updateDarkMode) {
      return res.status(400).json({ error: "Unable to update light mode" });
    }

    res.status(200).json({ message: "Light mode toggled" });
  } catch (error) {
    res.status(500).json({ message: `A server error has occured: ${error}` });
  }
});
