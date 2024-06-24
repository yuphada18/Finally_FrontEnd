import React, { useState, useRef, useEffect } from "react";

const App = () => {
    const [hasPinned, setHasPinned] = useState(true);
    const imgRef = useRef(null);
    const [pinSize, setPinSize] = useState({ width: 30, height: 30 });
    const [isDragging, setIsDragging] = useState(false);
    const [pinnedPosition, setPinnedPosition] = useState({ x: 50, y: 50 });
    const handleClick = (event) => {
        if (!hasPinned) {
            setHasPinned(true);
        }
        setPinnedPosition({
            x: (event.clientX / imgRef.current.offsetWidth) * 100,
            y: (event.clientY / imgRef.current.offsetHeight) * 100,
        }
        );
        console.log("Pin position:", pinnedPosition.x, pinnedPosition.y);
    };

    const handleDragStart = (event) => {
        setIsDragging(true);
    };

    const handleDragEnd = (event) => {
        setIsDragging(false);
    };
    const handleEscape = (event) => {
        if (event.keyCode === 27) {
            setIsDragging(false);
        }
    };

    const handleDrag = (event) => {
        if (isDragging) {
            setPinnedPosition({
                x: (event.clientX / imgRef.current.offsetWidth) * 100,
                y: (event.clientY / imgRef.current.offsetHeight) * 100,
            });
        }
    };

    useEffect(() => {
        setPinSize({
            width: (30 / imgRef.current.offsetWidth) * 100,
            height: (30 / imgRef.current.offsetHeight) * 100,
        }
        );
        console.log("Pin position:", pinnedPosition.x, pinnedPosition.y);
    }, [imgRef.current]);

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);
    return (
        <div className="">
            <div
                onClick={handleClick}
                onMouseMove={handleDrag}
                className="flex items-center h-full w-full">
                <img
                    src="/image/hospital.jpg"
                    alt="floorplan"
                    className="w-full h-screen image"
                    ref={imgRef}
                    onLoad={() => {
                        setPinSize({
                            width: (20 / imgRef.current.offsetWidth) * 100,
                            height: (20 / imgRef.current.offsetHeight) * 100,
                        });
                    }}
                />
                {hasPinned && (
                    <img
                        src="/image/pin.png"
                        alt="pin"
                        className="absolute pin-icon"
                        style={{
                            top: `${pinnedPosition.y}%`,
                            left: `${pinnedPosition.x}%`,
                            width: `${pinSize.width}%`,
                            height: `${pinSize.height}%`,
                        }}
                        onMouseDown={handleDragStart}
                        onMouseUp={handleDragEnd}
                    />
                )}
            </div>
        </div>

    );
};

export default App;
