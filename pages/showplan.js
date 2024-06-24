import React, { useRef, useState, useEffect } from 'react'
import { callapi_pos_pin } from './api/callpin';
import { url } from '@/config';
function Showplan() {
    const floorPlanRef = useRef(null);
    const [pinSize, setPinSize] = useState({ width: 50, height: 50 });
    const [pinX, setPinX] = useState(0);
    const [pinY, setPinY] = useState(0);
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
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
        setPinX(x / floorPlanWidth * 100);
        setPinY(y / floorPlanHeight * 100);
        console.log("Position X:", x / floorPlanWidth * 100, "Pisition Y:", y / floorPlanWidth * 100)
    };
    return (
        <div className="bg-gray-50">
            <div className=" h-screen flex  justify-around ">
                <div className='w-8/12 h-5/6 drop-shadow-lg rounded-[24px] mt-24 border-t-[20px] border-[#5787C7]  bg-gray-100 flex items-center flex-col '>
                    <label className='mt-4 text-4xl'>Floor Plan</label>
                    <div className='w-9/12 h-5/6  my-6 mx-auto border border-[#5787C7]  bg-gray-100 relative' ref={floorPlanRef}>
                        <img className='h-full w-full' ref={imgRef} src={url+"/image/floor/floor 9.jpeg"} onClick={handleClick} />
                        <img
                            className='h-6 w-6 absolute'
                            src={"/image/pin.png"}
                            style={{
                                left: `${pinX}%`, top: `${pinY}%`, transform: `translate(-50%, -100%)`, width: `${pinSize.width}%`,
                                height: `${pinSize.height}%`
                            }}
                        />
                    </div>
                    <button className='bg-red-500'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default Showplan;
