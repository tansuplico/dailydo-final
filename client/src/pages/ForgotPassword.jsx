import React, { useEffect, useState } from "react";
import axios from "axios";
import VerifiedNav from "../components/global/VerifiedNav";
import logo from "../assets/daily-icon.png";
import lock from "../assets/lock.png";
import verifiedCheck from "../assets/verified-check.png";

import expired from "../assets/session-expired.png";
import Expired from "../components/forgot/Expired";
import Changed from "../components/forgot/Changed";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [newPasswordError, setNewPasswordError] = useState(false);
  const [reTypedPasswordError, setReTypedPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isExpired, setIsExpired] = useState(null);

  const fetchData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    const token = urlParams.get("token");

    axios
      .post(`https://dailydo-0bc4.onrender.com/api/user/check-if-expired`, {
        userId,
        token,
      })
      .then(() => {})
      .catch((err) => {
        if (err.response.data.error === "Token expired") {
          setIsExpired(true);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");

    if (user) {
      try {
        axios
          .post(
            `https://dailydo-0bc4.onrender.com/api/user/verify-change-password`,
            {
              newPassword: newPassword,
              reTypePassword: reTypePassword,
              userToken: user,
            }
          )
          .then(() => {
            setPasswordChanged(true);
          })
          .catch((err) => {
            console.log(err.response.data.error);
            if (err.response.data.error === "All inputs must be filled") {
              setNewPasswordError(true);
              setReTypedPasswordError(true);
              setErrorMessage(err.response.data.error);
            } else if (
              err.response.data.error ===
              "Password must be at least 8 characters"
            ) {
              setNewPassword(true);
              setReTypedPasswordError(false);
              setErrorMessage(err.response.data.error);
            } else if (err.response.data.error === "Password doesn't match") {
              setNewPasswordError(true);
              setReTypedPasswordError(true);
              setErrorMessage(err.response.data.error);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <VerifiedNav />
      {isExpired ? (
        <Expired expired={expired} />
      ) : (
        <div className="poppins-regular w-full h-[90vh] flex flex-center flex-col gap-5">
          {passwordChanged ? (
            <Changed verifiedCheck={verifiedCheck} />
          ) : (
            <>
              <img src={logo} alt="logo" className="w-[8rem] " />
              <strong className="text-[2rem] text-center">
                Ch<span className="text-[#DE3163]">a</span>nge your Passw
                <span className="text-[#DE3163]">o</span>rd
              </strong>

              {newPasswordError &&
                errorMessage === "Password must be at least 8 characters" && (
                  <h1 className="text-red-500 w-[70%] mdsm:w-auto text-center ">
                    Password must be at least 8 characters
                  </h1>
                )}

              {newPasswordError &&
                reTypedPasswordError &&
                errorMessage === "All inputs must be filled" && (
                  <h1 className="text-red-500"> All inputs must be filled </h1>
                )}

              {newPasswordError &&
                reTypedPasswordError &&
                errorMessage === "Password doesn't match" && (
                  <h1 className="text-red-500"> Password doesn't match </h1>
                )}

              <form
                className="w-[80%] md:w-[50%] flex flex-col flex-center gap-5 "
                onSubmit={(e) => handleChangePassword(e)}
              >
                <div
                  className={`${
                    newPasswordError && "border-red-500"
                  } w-full px-2 flex flex-center bg-white rounded-2xl border-2`}
                >
                  <img src={lock} alt="profile" className="w-[23px] h-[25px]" />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full py-2 pl-2 focus:outline-none rounded-2xl"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div
                  className={`${
                    reTypedPasswordError && "border-red-500"
                  } w-full px-2 flex flex-center bg-white rounded-2xl border-2`}
                >
                  <img src={lock} alt="lock" className="w-[23px] h-[25px]" />
                  <input
                    type="password"
                    placeholder="Re-type New Password"
                    className="w-full py-2 pl-2 focus:outline-none rounded-2xl"
                    onChange={(e) => setReTypePassword(e.target.value)}
                  />
                </div>

                <button
                  className="w-full py-2 bg-[#DE3163] hover:bg-red-500 rounded-3xl cursor-pointer text-white transition-all"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
