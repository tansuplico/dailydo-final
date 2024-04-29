import React from "react";
import { Tooltip } from "react-tooltip";

import "react-toastify/dist/ReactToastify.css";
const MiniNav = ({
  recoverDark,
  recoverLight,
  deleteDark,
  deleteLight,
  handleRecoverTrash,
  recoveredAlert,
  setRemovePerm,
  theme,
}) => {
  return (
    <div className="px-4 py-3 border-[#ccc] border border-b-0 flex justify-between">
      <strong className="poppins-semibold cursor-pointer">
        Daily<span className="text-[#DE3163]">Do.</span>com
      </strong>

      <div className="flex gap-3">
        <img
          src={theme === "dark" ? recoverLight : recoverDark}
          alt="more-dark"
          data-tooltip-id="recover"
          data-tooltip-content="Recover"
          className={`w-[25px] cursor-pointer`}
          onClick={() => {
            handleRecoverTrash();
            recoveredAlert();
          }}
        />
        <Tooltip
          id="recover"
          place="bottom"
          style={{ backgroundColor: "#DE3163" }}
        />

        <img
          src={theme === "dark" ? deleteLight : deleteDark}
          alt="more-dark"
          data-tooltip-id="more-options"
          data-tooltip-content="Delete"
          className="w-[25px] cursor-pointer"
          onClick={() => setRemovePerm((val) => !val)}
        />

        <Tooltip id="more-options" style={{ backgroundColor: "#DE3163" }} />
      </div>
    </div>
  );
};

export default MiniNav;
