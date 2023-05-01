import { Outlet } from "react-router-dom";
import React, { useState } from "react";

const LeftBar = () => {
  const [isHidden, setIsHidden] = useState(true);

  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`left-bar ${isHidden ? "hidden" : ""}`}>
      <div className="menu-icon">
        <p onClick={handleClick}>
          {isHidden ? "Show Sidebar" : "Hide Sidebar"}
        </p>
      </div>

      <div className={isHidden ? "hide-content" : ""}>
        <Outlet />
      </div>
    </div>
  );
};

export default LeftBar;
