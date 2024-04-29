import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  scrollToSection,
  featureRef,
  reviewsRef,
  previewRef,
  setOpenNav,
  openNav,
}) => {
  return (
    <nav className="w-full border-b bg-white border-gray-300 z-60">
      <div className="w-full relative py-3 px-4 md:py-10 md:px-[5rem] flex items-center justify-between z-50 bg-white">
        <div className="flex items-center gap-10">
          <strong className="poppins-semibold text-[1.5rem] lg:text-[1.7rem] cursor-pointer ">
            Daily<span className="text-[#DE3163]">Do.</span>com
          </strong>
          <ul className="hidden text-[1.15rem] lg:flex items-center gap-5 transition-all">
            <li
              className="cursor-pointer hover:border-b-4 border-[#DE3163] border-h-5"
              onClick={() => scrollToSection(featureRef)}
            >
              Features
            </li>
            <li
              className="cursor-pointer hover:border-b-4 border-[#DE3163] border-h-5"
              onClick={() => scrollToSection(reviewsRef)}
            >
              Reviews
            </li>
            <li
              className="cursor-pointer hover:border-b-4 border-[#DE3163] border-h-5"
              onClick={() => scrollToSection(previewRef)}
            >
              Preview
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex gap-5">
          <Link to="/login">
            <button className="group border bg-[#DE3163]  px-7 py-1 rounded-md transition-all">
              <span className="text-[1.1rem] text-white">Log in</span>
            </button>
          </Link>
          <Link to="/register">
            <button className="group border border-[#DE3163] hover:bg-[#DE3163] px-7 py-1 rounded-md transition-all">
              <span className="text-[1.1rem] text-[#DE3163] group-hover:text-white">
                Sign up
              </span>
            </button>
          </Link>
        </div>

        <label
          htmlFor="nav_bar_icon"
          className="w-7 md:w-9 h-8 md:h-10 lg:hidden cursor-pointer flex flex-col items-center justify-center space-y-1.5"
        >
          <input
            id="nav_bar_icon"
            type="checkbox"
            className="hidden peer"
            onClick={() => setOpenNav((val) => !val)}
          />
          <div className="w-2/3 h-1.5 bg-[#DE3163] rounded-lg transition-all duration-300 origin-right peer-checked:w-full peer-checked:rotate-[-30deg] peer-checked:translate-y-[-5px]"></div>
          <div className="w-full h-1.5 bg-[#DE3163] rounded-lg transition-all duration-300 origin-center peer-checked:rotate-90 peer-checked:translate-x-4"></div>
          <div className="w-2/3 h-1.5 bg-[#DE3163] rounded-lg transition-all duration-300 origin-right peer-checked:w-full peer-checked:rotate-[30deg] peer-checked:translate-y-[5px]"></div>
        </label>
      </div>
      <div
        className={`w-full h-[20rem] absolute ${
          openNav ? "top-[9%] md:top-[18%]" : "top-[-20rem]"
        } border-y p-5 bg-white flex flex-col justify-between transition-all duration-500 z-40`}
      >
        <ul className="text-[1.15rem] flex flex-col items-start gap-5">
          <li
            className="cursor-pointer"
            onClick={() => {
              scrollToSection(featureRef);
              setOpenNav(false);
            }}
          >
            Features
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              scrollToSection(reviewsRef);
              setOpenNav(false);
            }}
          >
            Reviews
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              scrollToSection(previewRef);
              setOpenNav(false);
            }}
          >
            Preview
          </li>
        </ul>

        <div className="w-full flex flex-col flex-center gap-5">
          <Link to="/login" className="w-full">
            <button className="w-full group border bg-[#DE3163]  px-7 py-1 rounded-md transition-all">
              <span className="text-[1.1rem] text-white">Log in</span>
            </button>
          </Link>
          <Link to="/register" className="w-full">
            <button className="w-full group border border-[#DE3163] hover:bg-[#DE3163] px-7 py-1 rounded-md transition-all">
              <span className="text-[1.1rem] text-[#DE3163] group-hover:text-white">
                Sign up
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
