import React, { useEffect } from "react";
import axios from "axios";
import VerifiedNav from "../components/global/VerifiedNav";
import verifiedCheck from "../assets/verified-check.png";

const VerifyEmail = () => {
  useEffect(() => {
    const handleVerification = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        try {
          await axios.get(
            `https://dailydo-0bc4.onrender.com/api/user/verify-email?token=${token}`
          );
        } catch (error) {
          console.error("Error verifying email:", error);
        }
      }
    };

    handleVerification();
  }, []);

  return (
    <>
      <VerifiedNav />
      <div className="w-full h-full poppins-regular py-[5rem] flex flex-center">
        <div className="w-[95%] md:w-[50%] py-[5rem] bg-white flex flex-col flex-center gap-5 shadow-lg text-center">
          <img src={verifiedCheck} alt="verified-check" />
          <strong className="text-[#DE3163] text-[2rem]">Email Verified</strong>
          <p className="text-center w-[80%]">
            Your email has been successfully verified. You can now access all
            features of our platform. Welcome aboard!
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
