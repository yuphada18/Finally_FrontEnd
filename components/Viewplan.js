import React, { useState } from "react";
import { url } from "@/config";

function Showplan({ x, y, onClose, ImgPosition,floorpicture }) {
  const [pinSize, setPinSize] = React.useState({ width: 50, height: 50 });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const imgRef = React.useRef(null);
  const [imgAlt, setImgAlt] = useState("");
  React.useEffect(() => {
    setPinSize({
      width: (50 / imgRef.current.offsetWidth) * 100,
      height: (50 / imgRef.current.offsetHeight) * 100,
    });
  }, [imgRef.current]);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal = (src, alt) => {
    setModalIsOpen(true);
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-gray-900 bg-opacity-75 z-10">
      {modalIsOpen && (
        <div className="w-full fixed inset-0 z-10 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-sky-200 rounded-lg overflow-y-auto">
            <div className="w-full flex justify-end">
             
                <button
                  onClick={() => closeModal()}
                  className=" py-1 p-6 text-center bg-red-500 text-gray-400"
                >
                  X
                </button>
            </div>
            <img
             src={url + "/image/product/" + ImgPosition}
             //src='/image/lay.jpg'
              className="mx-auto max-w-xl py-8"
            />
          </div>
        </div>
      )}
      <div className=" h-screen flex justify-around">
        <div className="w-8/12 h-5/6 drop-shadow-lg rounded-24 mt-24 border-t-20 border-#5787C7 bg-gray-100 flex items-center flex-col">
          <label className="mt-4 text-4xl">Floor Plan</label>
          <button
            className="absolute top-0 right-0 m-2 p-2 w-20 text-2xl bg-grey-50 hover:bg-red-500"
            onClick={onClose}
          >
            X
          </button>
          <div className="w-9/12 h-5/6 my-6 mx-auto border border-#5787C7 bg-gray-100 relative">
            <img
              className="h-full w-full"
              ref={imgRef}
              src={url +floorpicture}
              //src = '/image/floorplan.png'
            />
            <button>
              <img
                className="h-6 w-6 absolute"
                onClick={() => openModal()}
                src={"/image/pin.png"}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -100%)`,
                  width: `${pinSize.width}%`,
                  height: `${pinSize.height}%`,
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showplan;
