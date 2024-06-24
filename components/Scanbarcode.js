import React, { useRef, useEffect, useState } from 'react';
import { BrowserBarcodeReader, NotFoundException } from '@zxing/library';

function BarcodeScanner({ onBarcodeDetected, onOpenScan }) {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);
  const codeReader = new BrowserBarcodeReader();
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (scanning && videoRef.current) {
      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
        if (result) {
          console.log(result.text);
          onBarcodeDetected(result.text);
          setshowModal(false);
          setScanning(false);
          timeoutId = setTimeout(() => {
            codeReader.reset();
            codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
              if (error && !(error instanceof NotFoundException)) {
                console.error(error);
              }
            });
          }, 500);
        } else if (error && !(error instanceof NotFoundException)) {
          console.error(error);
        }
      });
    } else {
      codeReader.reset();
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      codeReader.reset();
      clearTimeout(timeoutId);
    };
  }, [scanning]);

  const handleStartScan = () => {
    setshowModal(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setScanning(true);
          onOpenScan();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStopScan = () => {
    setshowModal(false);
    setScanning(false);
  };

  const handleCancelScan = () => {
    setshowModal(false);
    setScanning(false);
    codeReader.reset();
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-gray-900 bg-opacity-75   ">
          <div className="bg-gray-100 p-12  shadow-lg w-1/4 h-4/12 border-2 border-sky-600 rounded-3xl  ">
            <label className=" text-gray-700 font-medium text-2xl mb-4 flex justify-center">
              Scan Your Qrcode
            </label>
            <div className="flex justify-center mt-4 border-2 border-sky-600 rounded-3xl">
              <div>
                <video ref={videoRef} className="w-5/5 h-5/5 rounded-2xl" />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 w-full h-full text-white font-bold py-2 px-4 rounded-lg mr-2"
                onClick={handleCancelScan}
                disabled={!scanning}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-green-700 w-24 h-10 text-white font-bold py-2 px-4 rounded-lg mr-2"
          onClick={handleStartScan}
          disabled={scanning}
        >
          Start Scan
        </button>
      </div>
    </div>
   );
  }
  
  export default BarcodeScanner; 
