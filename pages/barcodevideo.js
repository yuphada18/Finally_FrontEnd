import React, { useRef, useEffect } from 'react';
import Quagga from 'quagga';

function BarcodeScanner() {
  const videoRef = useRef(null);

  useEffect(() => {
    // set up camera stream
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  
    // set up barcode scanner
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current,
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          aspectRatio: { min: 1, max: 100 },
          facingMode: "environment",
          attribute: true
        }
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Barcode scanner initialized");
      Quagga.start();
    });

    // listen for barcode detection events
    Quagga.onDetected((result) => {
      console.log(result.codeResult.code);
    });

    return () => {
      // stop barcode scanner when component unmounts
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline  />
    </div>
  );
}

export default BarcodeScanner;
