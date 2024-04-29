import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
const Slidebar = ({
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
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        className="w-full h-full flex"
      >
        <SwiperSlide className="w-full">
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
        </SwiperSlide>

        <SwiperSlide className="w-full">
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
        </SwiperSlide>

        <SwiperSlide className="w-full">
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
        </SwiperSlide>
      </Swiper>
    </ul>
  );
};

export default Slidebar;
