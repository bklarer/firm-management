import { Outlet } from "react-router-dom";
import React, { useState } from "react";

const LeftBar = () => {
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  console.log("isHidden", isHidden);

  return (
    
    <div
      className={`left-bar ${isHidden ? "hidden" : ""}`}
    >
      <div className="menu-icon" >
        
        <svg onClick={handleClick} viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </div>
      <div className={isHidden ? "hide-content" : ""}>
      <Outlet />
      </div>
    </div>
  );
};

export default LeftBar;
