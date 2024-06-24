import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'Live',
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment'
        },
        target: canvasRef.current
      },
      locator: {
        patchSize: 'medium',
        halfSample: true
      },
      numOfWorkers: 2,
      decoder: {
        readers: ['code_128_reader']
      },
      locate: true
    }, function(err) {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BarcodeScanner;
