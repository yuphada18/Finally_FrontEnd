import React, { useState } from "react";
import Quagga from "quagga";
const BarcodeReader = () => {
    const [detectedBarcode, setDetectedBarcode] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [Barcode, setBarcode] = useState("")
    const handleStartClick = () => {
        setModalVisible(true);
        Quagga.init(
            {
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    constraints: {
                        width: 640,
                        height: 480,
                        facingMode: "user", // use front camera for mobile devices
                    },
                },
                decoder: {
                    readers: ["code_128_reader"], // list of active readers
                },
            },
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("Quagga initialization finished.");
                Quagga.start();
                setIsScanning(true);
            }
        );
    };

    const handleStopClick = () => {
        setModalVisible(false);
        Quagga.stop();
        setIsScanning(false);
    };

    Quagga.onDetected((data) => {
        setDetectedBarcode(data.codeResult.code);
        setBarcode(data.codeResult.code)
        setIsScanning(false);
        Quagga.stop();
    });

    return (
        <div>
            <label>{Barcode}</label>
            <button onClick={handleStartClick}>Start Scanning</button>
            <div className={` fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-gray-900 bg-opacity-75 ${!isScanning ? 'hidden' : ''}`}>
                <div className="bg-gray-100 p-12  shadow-lg w-1/4 h-4/12 border-2 border-sky-600 rounded-3xl md:w-1/3 h-[450px]">
                    <label className=" text-gray-700 font-medium text-2xl mb-4 flex justify-center">
                        Scan Your Barcode
                    </label>
                    <div className="flex justify-center mx-auto max-w-[230px] h-64 mt-4 border-2 border-sky-600 rounded-3xl md:h-52">
                        <div id="interactive"
                            className="viewport max-w-[230px] h-64 mt-6 md:w-52">
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-red-500 hover:bg-red-700 w-full h-full text-white font-bold py-2 px-4 rounded-lg mr-2"
                            onClick={handleStopClick}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarcodeReader;
