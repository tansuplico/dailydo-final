import React, { useState } from "react";
import FormNav from "../components/global/FormNav";
import Form from "../components/register/Form";
import { useNavigate, Link } from "react-router-dom";
import defaultImage from "../assets/default-alora.png";
import logo from "../assets/daily-icon.png";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");
    setUsername("");

    const userData = {
      username,
      email,
      password,
      picture: defaultImage,
      verified: false,
    };

    axios
      .post("https://dailydo-0bc4.onrender.com/api/user/register", userData, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/client/workspace");
      })
      .catch((error) => {
        switch (error.response.data.error) {
          case "All inputs must be filled":
            setUsernameError(true);
            setEmailError(true);
            setPasswordError(true);
            break;
          case "Email already registered":
            setEmailError(true);
            setUsernameError(false);
            setPasswordError(false);
            setErrorMessage(error.response.data.error);
            break;
          case "Invalid Email":
            setEmailError(true);
            setUsernameError(false);
            setPasswordError(false);
            setErrorMessage(error.response.data.error);
            break;
          case "Username must be at least 4 characters":
            setUsernameError(true);
            setEmailError(false);
            setPasswordError(false);
            break;
          case "Username must only be 16 characters or less":
            setUsernameError(true);
            setEmailError(false);
            setPasswordError(false);
            setErrorMessage(error.response.data.error);
            break;
          case "Password must be at least 8 characters long":
            setUsernameError(false);
            setEmailError(false);
            setPasswordError(true);
            break;
          default:
        }
      });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row flex-center">
      <div className="hidden lg:w-[50%] h-screen lg:flex flex-center bg-[#DE3163]">
        <span className="w-[50%] text-[4rem] font-bold text-white ">
          Join the DailyDo Community.
        </span>
      </div>
      <div className="w-full lg:w-[50%] h-screen flex flex-col flex-center">
        <FormNav navigate={navigate} />

        <div className="w-[60%] h-[95%] flex flex-col flex-center gap-5">
          <img src={logo} alt="avatar" className="w-[8rem] rounded-[50%]" />
          {usernameError && emailError && passwordError && (
            <h1 className="text-red-500"> All inputs must be filled </h1>
          )}
          {usernameError && !emailError && !passwordError && (
            <h1 className="text-red-500">
              {errorMessage === "Username must only be 16 characters or less"
                ? "Username must only be 16 characters or less"
                : "Username must be at least 4 characters"}
            </h1>
          )}
          {!usernameError && emailError && !passwordError && (
            <h1 className="text-red-500">
              {errorMessage === "Invalid Email"
                ? "Invalid Email"
                : "Email is already registered"}
            </h1>
          )}
          {!usernameError && !emailError && passwordError && (
            <h1 className="text-red-500">
              Password must be at least 8 characters long
            </h1>
          )}

          <div className="w-full flex flex-col flex-center gap-5">
            <Form
              handleRegister={handleRegister}
              setEmail={setEmail}
              setPassword={setPassword}
              setUsername={setUsername}
              usernameError={usernameError}
              username={username}
              emailError={emailError}
              email={email}
              passwordError={passwordError}
              password={password}
            />

            <div className="w-full flex flex-center gap-2">
              <hr className="w-full h-[1px] bg-gray-300" />
              <span>or</span>
              <hr className="w-full h-[1px] bg-gray-300" />
            </div>

            <Link
              to="/login"
              className="w-full py-2 bg-[#DE3163] hover:bg-red-500 flex flex-center rounded-3xl cursor-pointer text-white transition-all"
            >
              <button>Already have an account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
