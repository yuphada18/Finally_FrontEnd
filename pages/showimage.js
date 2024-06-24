import React, { useState } from "react";

function App() {
  const [showImage, setShowImage] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState("");

  const handleClick = (url) => {
    setShowImage(true);
    setBigImageUrl(url);
  };

  return (
    <div>
      <img
        src="/image/floorplan.png"
        onClick={() => handleClick("/image/floorplan.png")}
        alt="thumbnail"
      />
      {showImage && (
        <div>
          <img src={bigImageUrl} alt="big-image" />
          <button onClick={() => setShowImage(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;