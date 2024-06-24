import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner = ({ showModal, onCloseModal, onQRCodeDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [detectedQRCode, setDetectedQRCode] = useState('');
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let ctx;
    if (canvas) {
      ctx = canvas.getContext('2d');
    }
    let scanIntervalId;
    const startScanner = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
          scanIntervalId = setInterval(() => {
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);
              if (code) {
                console.log('QR code detected:', code.data);
                setDetectedQRCode(code.data);
                onQRCodeDetected(code.data);
                onCloseModal();
              }
            }
          }, 100);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const stopScanner = () => {
      clearInterval(scanIntervalId);
      if (video && video.srcObject) {
        const stream = video.srcObject;
        stream.getTracks()[0].stop();
      }
    };

    if (showModal) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [showModal, onCloseModal, onQRCodeDetected]);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-gray-900 bg-opacity-75   ">
          <div className="bg-gray-100 p-12  shadow-lg w-1/4 h-4/12 border-2 border-sky-600 rounded-3xl  ">
            <label className=" text-gray-700 font-medium text-2xl mb-4 flex justify-center">
               Scan Your Qrcode
            </label>
            <div className="flex justify-center mt-4 border-2 border-sky-600 rounded-3xl">
              <div>
                <video ref={videoRef} className='hidden' />
                <canvas ref={canvasRef} className="md:24 md:h-24 rounded-3xl" />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 w-full h-full text-white font-bold py-2 px-4 rounded-lg mr-2"
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodeScanner;
