import React from "react";

const Appearance = ({
  toggleLightMode,
  darkMode,
  toggleDarkMode,
  darkTheme,
  lightTheme,
}) => {
  return (
    <div className="h-full p-5 flex flex-col gap-2 dark:text-white">
      <div className="w-full flex flex-col gap-1">
        <strong className="text-[1.2rem]">Theme</strong>
        <hr className="border-black" />
      </div>

      <div className="w-full flex flex-col gap-2 ">
        <div className="flex gap-1">
          <div className="radio-button">
            <input
              name="radio-group"
              id="radio1"
              className="radio-button__input"
              type="radio"
              value="light"
              onChange={() => {
                toggleLightMode();
              }}
              checked={!darkMode}
            />
            <label
              htmlFor="radio1"
              className="radio-button__label dark:text-white"
            >
              <span className="radio-button__custom"></span>
              Light Mode
            </label>
          </div>
        </div>

        <img src={lightTheme} alt="light-theme" />

        <div className="flex gap-1">
          <div className="radio-button">
            <input
              name="radio-group"
              id="radio3"
              className="radio-button__input"
              type="radio"
              value="dark"
              onChange={() => {
                toggleDarkMode();
              }}
              checked={darkMode}
            />

            <label
              htmlFor="radio3"
              className="radio-button__label dark:text-white"
            >
              <span className="radio-button__custom"></span>
              Dark Mode
            </label>
          </div>
        </div>

        <img src={darkTheme} alt="light-theme" />
      </div>
    </div>
  );
};

export default Appearance;
