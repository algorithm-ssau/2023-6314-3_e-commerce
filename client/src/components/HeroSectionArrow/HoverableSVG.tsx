import React, { useState } from "react";
import { TestPic } from "./TestPic";

export const HoverableSVG = () => {
  const [isHovered, setIsHovered] = useState(false);
  const fillColor = isHovered ? "#fff" : "#3B2D2D";

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TestPic style={{ fill: fillColor }} />
    </span>
  );
};
