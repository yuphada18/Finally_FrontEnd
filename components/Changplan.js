import React, { useEffect, useRef, useState } from "react";
import { url } from "@/config";

function Changplan({ x, y, ImgPosition, floorpicture, setpin, cancle }) {
  const floorPlanRef = useRef(null);
  const [pinSize, setPinSize] = useState({ width: 50, height: 50 });
  const [pinXchang, setPinXchang] = useState(x);
  const [pinYchang, setPinYchang] = useState(y);
  const [xPos, setXPos] = useState(x);
  const [yPos, setYPos] = useState(y);
  const imgRef = useRef(null);
  const [floorPlanWidth, setFloorPlanWidth] = useState(0);
  const [floorPlanHeight, setFloorPlanHeight] = useState(0);
  useEffect(() => {
    return () => {
    }
  }, [])
  useEffect(() => {
    if (floorPlanRef.current) {
      setFloorPlanWidth(floorPlanRef.current.offsetWidth);
      setFloorPlanHeight(floorPlanRef.current.offsetHeight);
    }
    setPinSize({
      width: (50 / imgRef.current.offsetWidth) * 100,
      height: (50 / imgRef.current.offsetHeight) * 100,
    }
    );
  }, [floorPlanRef, imgRef.current]);
  const handleClick = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY + 6;
    setPinXchang(x / floorPlanWidth * 100);
    setPinYchang(y / floorPlanHeight * 100);
    // console.log("Position X:", x / floorPlanWidth * 100, "Pisition Y:", y / floorPlanWidth * 100)
  };
  const OnSave=()=>{
    setpin(pinXchang,pinYchang)

  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-gray-900 bg-opacity-75 z-10">
      <div className="">
        <div className=" h-screen flex  justify-around ">
          <div className='w-8/12 h-5/6 drop-shadow-lg rounded-[24px] mt-24   bg-gray-100 flex items-center flex-col '>
            <label className='mt-4 text-4xl'>Floor Plan</label>
            <div className='w-9/12 h-5/6  my-6 mx-auto border border-[#5787C7]  bg-gray-100 relative' ref={floorPlanRef}>
              <img className='h-full w-full' ref={imgRef} src={url +floorpicture} onClick={handleClick} />
              <img
                className='h-6 w-6 absolute'
                src={"/image/pin.png"}
                style={{
                  left: `${pinXchang}%`, top: `${pinYchang}%`, transform: `translate(-50%, -100%)`, width: `${pinSize.width}%`,
                  height: `${pinSize.height}%`
                }}
              />
            </div>
            <div className="flex flex-row">
              <button onClick={()=>OnSave()} className='bg-green-500 w-36 h-8 mb-4 '>Save</button>
              <button onClick={cancle} className='bg-red-500 w-36 h-8 mb-4 ml-3'>Cancle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changplan;
