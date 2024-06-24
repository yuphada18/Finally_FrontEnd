import React, { useState } from 'react';
import BarcodeScanner from '@/components/Scanbarcode';

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleBarcodeDetected = (data) => {
    console.log('Barcode detected:', data);
    // Do something with the detected barcode data
  };
  return (
    <div>
      <button onClick={handleShowModal}>Show Modal</button>
      <BarcodeScanner showModal={showModal} onCloseModal={handleCloseModal} onBarcodeDetected={handleBarcodeDetected} />
    </div>
  );
};

export default MyComponent;
