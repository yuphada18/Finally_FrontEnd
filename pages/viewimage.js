import React, { useState } from "react";

const ImageWithHover = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ height: "100vh", width: "100vw" }}
    >
      <img src="https://picsum.photos/id/237/200/300" alt="Your Image" />
      {mousePosition.x !== 0 && mousePosition.y !== 0 && (
        <div
          style={{
            position: "absolute",
            left: mousePosition.x,
            top: mousePosition.y,
            backgroundColor: "white",
            padding: "5px 10px",
          }}
        >
          x: {mousePosition.x}, y: {mousePosition.y}
        </div>
      )}
    </div>
  );
};

export default ImageWithHover;