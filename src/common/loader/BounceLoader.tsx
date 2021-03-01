import React from "react";
import "./bouncer.scss";

const BounceLoader: React.FC = () => {
  return (
    <div className="BounceLoader">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
};

export default BounceLoader;
