import React, { useState } from "react";
import logo from "../assets/daily-icon.png";
import { useNavigate, Link } from "react-router-dom";
import { useLoginStore } from "../store/store";
import ForgotPassword from "../components/modals/ForgotPassword";
import VerificationModal from "../components/modals/VerificationModal";
import FormNav from "../components/global/FormNav";
import Form from "../components/login/Form";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    email,
    password,
    forgotPasswordEmail,
    emailModalError,
    emailSent,
    showVerificationModal,
    showForgotPasswordModal,
    setEmail,
    setPassword,
    setForgotPasswordEmail,
    setEmailModalError,
    setEmailSent,
    setShowVerificationModal,
    setShowForgotPasswordModal,
  } = useLoginStore((state) => ({
    email: state.email,
    password: state.password,
    forgotPasswordEmail: state.forgotPasswordEmail,
    emailModalError: state.emailModalError,
    emailSent: state.emailSent,
    emailError: state.emailError,
    passwordError: state.passwordError,
    showVerificationModal: state.showVerificationModal,
    showForgotPasswordModal: state.showForgotPasswordModal,
    setEmail: state.setEmail,
    setPassword: state.setPassword,
    setForgotPasswordEmail: state.setForgotPasswordEmail,
    setEmailModalError: state.setEmailModalError,
    setEmailSent: state.setEmailSent,
    setShowVerificationModal: state.setShowVerificationModal,
    setShowForgotPasswordModal: state.setShowForgotPasswordModal,
  }));

  const handleLogin = (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");

    const userData = { email, password };

    axios
      .post("http://localhost:3000/api/user/login", userData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Email verification sent") {
          setShowVerificationModal(true);
          const userId = res.data.user._id;

          const intervalId = setInterval(async () => {
            try {
              const response = await axios.get(
                `http://localhost:3000/api/user/check-verification/${userId}`,
                { withCredentials: true }
              );
              if (response.data.user) {
                clearInterval(intervalId);
                setShowVerificationModal(false);
                navigate("/client/workspace");
              }
            } catch (error) {
              console.error("Error checking verification:", error);
            }
          }, 5000);
        } else {
          setShowVerificationModal(false);
          navigate("/client/workspace");
        }
      })
      .catch((error) => {
        if (error.response.data.error === "All inputs must be filled") {
          setEmailError(true);
          setPasswordError(true);
        } else if (
          error.response.data.error === "This email is not registered"
        ) {
          setEmailError(true);
          setPasswordError(false);
        } else if (error.response.data.error === "Incorrect password") {
          setEmailError(false);
          setPasswordError(true);
        }
      });
  };

  const handleForgotPassword = () => {
    setEmailSent(true);
    setForgotPasswordEmail("");

    axios
      .post(`http://localhost:3000/api/user/forgot-password`, {
        email: forgotPasswordEmail,
      })
      .then(() => {
        setErrorMessage("");
        setEmailModalError(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === "Email not registered") {
          setErrorMessage(err.response.data.error);
          setEmailModalError(true);
        } else if (err.response.data.error === "Invalid input value") {
          setErrorMessage(err.response.data.error);
          setEmailModalError(true);
        }
      });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row flex-center">
      <div className="hidden lg:w-[50%] h-screen lg:flex flex-center bg-[#DE3163]">
        <span className="w-[50%] text-[4rem] font-bold text-white ">
          Welcome back to DailyDo!
        </span>
      </div>
      <div className="w-full lg:w-[50%] h-screen flex flex-col items-center justify-center">
        <FormNav navigate={navigate} />
        <div className="w-[60%] h-[95%] flex flex-col flex-center gap-5">
          <img src={logo} alt="avatar" className="w-[8rem] rounded-[50%]" />

          {emailError && passwordError && (
            <h1 className="text-red-500"> All inputs must be filled </h1>
          )}

          {emailError && !passwordError && (
            <h1 className="text-red-500"> Email is not yet registered </h1>
          )}

          {!emailError && passwordError && (
            <h1 className="text-red-500"> Incorrect Password </h1>
          )}

          <Form
            handleLogin={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            emailError={emailError}
            passwordError={passwordError}
            email={email}
            password={password}
          />

          <h4
            className="cursor-pointer hover:text-[#DE3163] transition-all"
            onClick={() => setShowForgotPasswordModal(true)}
          >
            Forgot password?
          </h4>

          <div className="w-full flex flex-center gap-2">
            <hr className="w-full h-[1px] bg-gray-300" />
            <span>or</span>
            <hr className="w-full h-[1px] bg-gray-300" />
          </div>

          <Link
            to="/register"
            className="w-full py-2 bg-[#DE3163] hover:bg-red-500 flex flex-center rounded-3xl cursor-pointer text-white transition-all"
          >
            <button>Register</button>
          </Link>
        </div>
      </div>

      {showVerificationModal && (
        <VerificationModal
          setShowVerificationModal={setShowVerificationModal}
        />
      )}
      {showForgotPasswordModal && (
        <ForgotPassword
          emailModalError={emailModalError}
          emailSent={emailSent}
          setForgotPasswordEmail={setForgotPasswordEmail}
          handleForgotPassword={handleForgotPassword}
          setShowForgotPasswordModal={setShowForgotPasswordModal}
          setEmailModalError={setEmailModalError}
          setEmailSent={setEmailSent}
          errorMessage={errorMessage}
          forgotPasswordEmail={forgotPasswordEmail}
        />
      )}
    </div>
  );
};

export default Login;
