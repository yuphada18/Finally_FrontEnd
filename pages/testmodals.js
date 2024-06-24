import React, { useState } from "react";

const AdModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Show Ad
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75">
          <div className="w-full h-full m-auto  bg-white p-10 bg-opacity-0  flex justify-center items-center">
            <img
              src="/image/floorplan.png"
              alt="Advertisement"
              className="w-11/12 h-5/6"
            />
            <div className="fixed top-4 right-10"> <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setShowModal(false)}
            >

              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button></div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdModal;
