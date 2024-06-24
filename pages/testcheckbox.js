import React, { useState } from "react";

function CheckboxList() {
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = (featureId) => {
        if (selectedFeatures.includes(featureId)) {
            setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
        } else {
            setSelectedFeatures([...selectedFeatures, featureId]);
        }
    };
    const data = [{ "feature_id": 1, "feature_name": "จัดการผู้ใช้", "feature_key": "/admin/user" }, { "feature_id": 2, "feature_name": "จัดการกลุ่มสินค้า", "feature_key": "/admin/product_group" }, { "feature_id": 3, "feature_name": "จัดการกลุ่มสินค้าย่อย", "feature_key": "/admin/product_sub_group" }, { "feature_id": 4, "feature_name": "จัดการสินค้า", "feature_key": "/admin/product" },];

    const logSelectedValues = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-sky-blue-200">
            <h1 className="text-2xl font-bold mb-10">Features</h1>
            <div className="w-3/4">
                <div className="flex flex-row flex-wrap">
                    {data.map(feature => (
                        <div className="flex mb-6 w-1/4 h-full">
                            <input
                                type="checkbox"
                                className="form-checkbox h-6 w-6 mr-4"
                                value={feature.feature_id}
                                onChange={() => handleCheckboxChange(feature.feature_id)}
                            />
                            <label className="text-lg">{feature.feature_name}</label>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                onClick={logSelectedValues}
            >
                Log selected values
            </button>
            {isModalOpen && (
                <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-white p-10">
                    <h2 className="text-2xl font-bold mb-6">Selected Values</h2>
                    <ul className="list-disc">
                        {selectedFeatures.map(id => {
                            const feature = data.find(feature => feature.feature_id === id);
                            return <li key={id}>{feature.feature_name}</li>;
                        })}
                    </ul>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-6"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black opacity-50" onClick={closeModal} />
            )}
        </div>
    );
}

export default CheckboxList;
