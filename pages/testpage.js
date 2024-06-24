import React, { useState } from 'react';
import Showplan from './Showplan';
function AnotherComponent() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={handleShowModal}> Show Floor Plan </button>
            { showModal && (
                <Showplan
                    floorPlanImage="floor 9.jpeg"
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default AnotherComponent;
