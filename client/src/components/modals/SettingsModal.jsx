import React, { useState, useEffect } from "react";
import closeDark from "../../assets/close-dark.png";
import closeLight from "../../assets/close-light.png";
import appearanceDark from "../../assets/appearance-dark.png";
import appearanceLight from "../../assets/appearance-light.png";
import accountDark from "../../assets/account-dark.png";
import accountLight from "../../assets/account-light.png";
import securityDark from "../../assets/security-dark.png";
import securityLight from "../../assets/security-light.png";
import lightTheme from "../../assets/light-theme.png";
import darkTheme from "../../assets/dark-theme.png";
import defaultImage from "../../assets/default-alora.png";
import { useNavigate } from "react-router-dom";
import { useSettingsStore, useSidebarStore } from "../../store/store";
import axios from "axios";
import Asidebar from "../settingsModal/Asidebar";
import Slidebar from "../settingsModal/Slidebar";
import Appearance from "../settingsModal/Appearance";
import Account from "../settingsModal/Account";
import Security from "../settingsModal/Security";

const SettingsModal = ({ setSettingIsClicked }) => {
  const navigate = useNavigate();
  const [appearanceIsHovered, setAppearanceIsHovered] = useState(false);
  const [accountIsHovered, setAccountIsHovered] = useState(false);
  const [securityIsHovered, setSecurityIsHovered] = useState(false);
  const [settingSelected, setSettingSelected] = useState("Appearance");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [verifiedUserImage, setVerifiedUserImage] = useState(defaultImage);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [checkCurrentPassword, setCheckCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [reNewPasswordError, setReNewPasswordError] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { verificationEnabled, setVerificationEnabled } = useSettingsStore(
    (state) => ({
      verificationEnabled: state.verificationEnabled,
      setVerificationEnabled: state.setVerificationEnabled,
    })
  );

  const {
    settingsFetched,
    setSettingsFetched,
    theme,
    setTheme,
    darkMode,
    setDarkMode,
  } = useSidebarStore((state) => ({
    settingsFetched: state.settingsFetched,
    setSettingsFetched: state.setSettingsFetched,
    theme: state.theme,
    setTheme: state.setTheme,
    darkMode: state.darkMode,
    setDarkMode: state.setDarkMode,
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [settingsFetched]);

  const fetchData = () => {
    axios
      .get(`http://localhost:3000/api/user/private/data`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserName(res.data.findUserData.username);
        setUserEmail(res.data.findUserData.email);
        setVerifiedUserImage(
          res.data.findUserData.picture
            ? res.data.findUserData.picture
            : defaultImage
        );
        const isDarkMode = res.data.findUserData.dark;
        setDarkMode(isDarkMode);
        setTheme(isDarkMode ? "dark" : "light");
        setVerificationEnabled(res.data.findUserData.emailVerificationEnabled);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    axios
      .post("http://localhost:3000/api/user/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadProfilePicture = () => {
    const formData = new FormData();
    formData.append("file", userImage);
    axios
      .post("http://localhost:3000/api/user/uploadProfilePic", formData, {
        withCredentials: true,
      })
      .then((res) => {
        setSettingsFetched((val) => !val);
        const updatedUser = res.data.user;
        setVerifiedUserImage(
          updatedUser.picture ? updatedUser.picture : defaultImage
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    const passwordData = {
      checkCurrentPassword,
      newPassword,
      reNewPassword,
    };

    axios
      .post("http://localhost:3000/api/user/changePassword", passwordData, {
        withCredentials: true,
      })
      .then(() => {
        setPasswordChanged(true);
        setCurrentPasswordError(false);
        setNewPasswordError(false);
        setReNewPasswordError(false);
        setCheckCurrentPassword("");
        setNewPassword("");
        setReNewPassword("");
      })
      .catch((err) => {
        if (
          err.response.data.error === "All inputs must be filled" ||
          err.response.data.error ===
            "An error has occured, couldn't update password"
        ) {
          setCurrentPasswordError(true);
          setNewPasswordError(true);
          setReNewPasswordError(true);
          setCheckCurrentPassword("");
          setNewPassword("");
          setReNewPassword("");
          setPasswordChanged(false);
        } else if (err.response.data.error === "Incorrect Password") {
          setCurrentPasswordError(true);
          setNewPasswordError(false);
          setReNewPasswordError(false);
          setCheckCurrentPassword("");
          setPasswordChanged(false);
        } else if (
          err.response.data.error === "Password must be at least 8 characters"
        ) {
          setCurrentPasswordError(false);
          setNewPasswordError(true);
          setReNewPasswordError(false);
          setNewPassword("");
          setReNewPassword("");
          setPasswordChanged(false);
        } else if (err.response.data.error === "Password doesn't match") {
          setCurrentPasswordError(false);
          setNewPasswordError(true);
          setReNewPasswordError(true);
          setCheckCurrentPassword("");
          setNewPassword("");
          setReNewPassword("");
          setPasswordChanged(false);
        }
      });
  };

  const deleteAccount = () => {
    axios
      .delete("http://localhost:3000/api/user/deleteAccount", {
        withCredentials: true,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err.response.data.error);
      });

    navigate("/login");
  };

  const toggleEmailVerification = () => {
    setVerificationEnabled(!verificationEnabled);
    axios
      .put(
        "http://localhost:3000/api/user/toggle-email-verification",
        { verificationEnabled: verificationEnabled },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const toggleDarkMode = () => {
    axios
      .put(
        "http://localhost:3000/api/user/dark-mode",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setTheme("dark");
        setDarkMode(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleLightMode = () => {
    axios
      .put(
        "http://localhost:3000/api/user/light-mode",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setTheme("light");
        setDarkMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`w-full h-full ${
        theme === "dark" && "dark"
      } fixed inset-0 poppins-regular bg-black bg-opacity-50 flex justify-center items-center z-50`}
    >
      <div className="bg-white dark:bg-neutral-900 w-[18rem] sm:w-[25rem] md:w-[35rem] lg:w-[45rem] xl:w-[50rem] h-[35rem] py-5 sm:py-0 xl:h-[42rem] text-black flex flex-col rounded">
        <div className="w-full p-5 flex justify-between items-center">
          <strong className="text-[1.7rem] dark:text-white"> Settings </strong>
          <img
            src={theme === "dark" ? closeLight : closeDark}
            onClick={() => setSettingIsClicked(false)}
            className="w-[20px] cursor-pointer"
          />
        </div>

        <div className="w-full h-full flex flex-col md:flex-row border border-x-0 border-gray-300 overflow-y-scroll">
          <aside className="w-full md:w-[30%] border-r border-gray-300 dark:text-white">
            {windowWidth < 768 ? (
              <Slidebar
                settingSelected={settingSelected}
                setSettingSelected={setSettingSelected}
                setAppearanceIsHovered={setAppearanceIsHovered}
                appearanceIsHovered={appearanceIsHovered}
                appearanceLight={appearanceLight}
                appearanceDark={appearanceDark}
                accountIsHovered={accountIsHovered}
                setAccountIsHovered={setAccountIsHovered}
                accountLight={accountLight}
                accountDark={accountDark}
                securityIsHovered={securityIsHovered}
                setSecurityIsHovered={setSecurityIsHovered}
                securityLight={securityLight}
                securityDark={securityDark}
                theme={theme}
              />
            ) : (
              <Asidebar
                settingSelected={settingSelected}
                setSettingSelected={setSettingSelected}
                setAppearanceIsHovered={setAppearanceIsHovered}
                appearanceIsHovered={appearanceIsHovered}
                appearanceLight={appearanceLight}
                appearanceDark={appearanceDark}
                accountIsHovered={accountIsHovered}
                setAccountIsHovered={setAccountIsHovered}
                accountLight={accountLight}
                accountDark={accountDark}
                securityIsHovered={securityIsHovered}
                setSecurityIsHovered={setSecurityIsHovered}
                securityLight={securityLight}
                securityDark={securityDark}
                theme={theme}
              />
            )}
          </aside>

          <div className="w-full md:w-[70%] overflow-y-scroll">
            {settingSelected === "Appearance" && (
              <Appearance
                toggleLightMode={toggleLightMode}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                darkTheme={darkTheme}
                lightTheme={lightTheme}
              />
            )}

            {settingSelected === "Account" && (
              <Account
                verifiedUserImage={verifiedUserImage}
                userName={userName}
                userEmail={userEmail}
                setShowChangePassword={setShowChangePassword}
                setCurrentPasswordError={setCurrentPasswordError}
                setNewPasswordError={setNewPasswordError}
                setReNewPasswordError={setReNewPasswordError}
                setCheckCurrentPassword={setCheckCurrentPassword}
                setNewPassword={setNewPassword}
                setReNewPassword={setReNewPassword}
                showChangePassword={showChangePassword}
                currentPasswordError={currentPasswordError}
                newPasswordError={newPasswordError}
                reNewPasswordError={reNewPasswordError}
                handleChangePassword={handleChangePassword}
                windowWidth={windowWidth}
                passwordChanged={passwordChanged}
                checkCurrentPassword={checkCurrentPassword}
                newPassword={newPassword}
                reNewPassword={reNewPassword}
                setUserImage={setUserImage}
                uploadProfilePicture={uploadProfilePicture}
                setPasswordChanged={setPasswordChanged}
              />
            )}

            {settingSelected === "Security" && (
              <Security
                verificationEnabled={verificationEnabled}
                toggleEmailVerification={toggleEmailVerification}
                logout={logout}
                setDeleteWarning={setDeleteWarning}
                deleteWarning={deleteWarning}
                deleteAccount={deleteAccount}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
