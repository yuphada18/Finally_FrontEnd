import React, { useState } from 'react';
import QRCodeScanner from '@/components/Scanqrcode';

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleQRCodeDetected = (data) => {
    console.log('QR code detected:', data);
    // Do something with the detected QR code data
  };

  return (
    <div>
      <button onClick={handleShowModal}>Show Modal</button>
      <QRCodeScanner showModal={showModal} onCloseModal={handleCloseModal} onQRCodeDetected={handleQRCodeDetected} />
    </div>
  );
};

export default MyComponent;