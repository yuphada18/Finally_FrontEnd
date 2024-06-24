import React, { useState, useRef, useEffect } from "react";

const App = () => {
    const [pinnedPosition, setPinnedPosition] = useState({ x: 50, y: 50 });
    const [hasPinned, setHasPinned] = useState(false);
    const imgRef = useRef(null);
    const [pinSize, setPinSize] = useState({ width: 30, height: 30 });
    const [isDragging, setIsDragging] = useState(false);

    const handleClick = (event) => {
        if (!hasPinned) {
            setHasPinned(true);
        }
        setPinnedPosition({
            x: (event.clientX / imgRef.current.offsetWidth) * 100,
            y: (event.clientY / imgRef.current.offsetHeight) * 100,
        });  
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
        if (imgRef.current) {
            setPinSize({
                width: (30 / imgRef.current.offsetWidth) * 100,
                height: (30 / imgRef.current.offsetHeight) * 100,
            });
        }
    }, [imgRef.current]);

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="relative h-screen w-screen">
            <div className="flex items-center h-full w-full">
                <img
                    ref={imgRef}
                    src="/image/floorplan.png"
                    alt="floorplan"
                    className="h-64 w-64 m-auto"
                    onClick={handleClick}
                    onMouseMove={handleDrag}
                />
            </div>
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
    );
};

export default App;
