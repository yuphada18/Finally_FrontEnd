import React, { useState } from "react";

const ImageWithPin = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [oldImageProperties, setOldImageProperties] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleOldImageLoad = (event) => {
    setOldImageProperties({
      offsetLeft: event.target.offsetLeft,
      offsetTop: event.target.offsetTop,
      width: event.target.width,
      height: event.target.height,
    });
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      let x = event.clientX;
      let y = event.clientY;
      const { offsetLeft, offsetTop, width, height } = oldImageProperties;
      if (x > offsetLeft && x < offsetLeft + width) {
        if (y > offsetTop && y < offsetTop + height) {
          setPosition({ x: x, y: y });
        }
      }
    }
  };

  return (
    <div
      style={{ position: "relative", height: "100vh", width: "100vw" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        src="/image/floorplan.png"
        alt="Your Old Image"
        onLoad={handleOldImageLoad}
      />
      <img
        src="/image/pin.png"
        alt="Your Pin Image"
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: "50px",
          height: "50px",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ImageWithPin;