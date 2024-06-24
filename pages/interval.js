import { useState } from "react";
import Modal from "react-modal";

function MyComponent() {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Welcome to my website</h1>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
}

export default MyComponent;
