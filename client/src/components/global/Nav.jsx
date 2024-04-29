import React, { useState, useEffect } from "react";
import menuDark from "../../assets/menu-icon-dark.png";
import menuLight from "../../assets/menu-icon-light.png";

const Nav = ({
  showSidebar,
  setShowSidebar,
  setShowListGroup,
  setShowSortGroup,
  theme,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full py-2 px-5 flex justify-between items-center dark:bg-neutral-900">
      <strong className="poppins-semibold text-[1.5rem] lg:text-[1.3rem] dark:text-white">
        Daily<span className="text-[#DE3163]">Do.</span>com
      </strong>
      {windowWidth < 768 && (
        <img
          src={theme === "dark" ? menuLight : menuDark}
          alt="menu"
          className="w-[25px] h-[25px]"
          onClick={() => {
            setShowSidebar(!showSidebar);
            setShowListGroup(false);
            setShowSortGroup(false);
          }}
        />
      )}
    </div>
  );
};

export default Nav;
