import { Outlet } from "react-router-dom";

const DynamicContainer = () => {
  return (
    <div className="dynamic-container">
      <Outlet />
    </div>
  );
};

export default DynamicContainer;
