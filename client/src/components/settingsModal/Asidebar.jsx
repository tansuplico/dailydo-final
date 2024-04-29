import React from "react";

const Asidebar = ({
  settingSelected,
  setSettingSelected,
  setAppearanceIsHovered,
  appearanceIsHovered,
  appearanceLight,
  appearanceDark,
  accountIsHovered,
  setAccountIsHovered,
  accountLight,
  accountDark,
  securityIsHovered,
  setSecurityIsHovered,
  securityLight,
  securityDark,
  theme,
}) => {
  return (
    <ul>
      <li
        className={`p-3 flex gap-3 ${
          settingSelected === "Appearance" && "bg-[#FF004F] text-white"
        } hover:bg-[#FF004F] hover:text-white cursor-pointer`}
        onMouseEnter={() => setAppearanceIsHovered(true)}
        onMouseLeave={() => setAppearanceIsHovered(false)}
        onClick={() => setSettingSelected("Appearance")}
      >
        <img
          src={
            appearanceIsHovered || settingSelected === "Appearance"
              ? appearanceLight
              : theme === "dark"
              ? appearanceLight
              : appearanceDark
          }
          className="w-[25px] hover-image"
        />
        <span> Appearance </span>
      </li>
      <li
        className={`p-3 flex gap-3 ${
          settingSelected === "Account" && "bg-[#FF004F] text-white"
        }  hover:bg-[#FF004F] hover:text-white cursor-pointer`}
        onMouseEnter={() => setAccountIsHovered(true)}
        onMouseLeave={() => setAccountIsHovered(false)}
        onClick={() => setSettingSelected("Account")}
      >
        <img
          src={
            accountIsHovered || settingSelected === "Account"
              ? accountLight
              : theme === "dark"
              ? accountLight
              : accountDark
          }
          className="w-[25px]"
        />
        <span> Account </span>
      </li>
      <li
        className={`p-3 flex gap-3 ${
          settingSelected === "Security" && "bg-[#FF004F] text-white"
        } hover:bg-[#FF004F] hover:text-white cursor-pointer`}
        onMouseEnter={() => setSecurityIsHovered(true)}
        onMouseLeave={() => setSecurityIsHovered(false)}
        onClick={() => setSettingSelected("Security")}
      >
        <img
          src={
            securityIsHovered || settingSelected === "Security"
              ? securityLight
              : theme === "dark"
              ? securityLight
              : securityDark
          }
          className="w-[25px]"
        />
        <span> Security </span>
      </li>
    </ul>
  );
};

export default Asidebar;
