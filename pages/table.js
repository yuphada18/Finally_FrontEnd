import React, { useState } from 'react'

function table() {
    const data = [
        {
            "zone_id": 1,
            "zone_name": "zone A",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 2,
            "zone_name": "zone B",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 3,
            "zone_name": "zone C",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 4,
            "zone_name": "zone A",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 5,
            "zone_name": "zone B",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 6,
            "zone_name": "zone C",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 7,
            "zone_name": "zone A",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 8,
            "zone_name": "zone B",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 9,
            "zone_name": "zone C",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 10,
            "zone_name": "zone A",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 11,
            "zone_name": "zone B",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 12,
            "zone_name": "zone C",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 1,
            "zone_name": "zone A",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 2,
            "zone_name": "zone B",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 3,
            "zone_name": "zone C",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 4,
            "zone_name": "zone A",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 5,
            "zone_name": "zone B",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 6,
            "zone_name": "zone C",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 7,
            "zone_name": "zone A",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 8,
            "zone_name": "zone B",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 9,
            "zone_name": "zone C",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 10,
            "zone_name": "zone A",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 11,
            "zone_name": "zone B",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 12,
            "zone_name": "zone C",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 1,
            "zone_name": "zone A",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 2,
            "zone_name": "zone B",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 3,
            "zone_name": "zone C",
            "floor_name": "floor 1"
        },
        {
            "zone_id": 4,
            "zone_name": "zone A",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 5,
            "zone_name": "zone B",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 6,
            "zone_name": "zone C",
            "floor_name": "floor 2"
        },
        {
            "zone_id": 7,
            "zone_name": "zone A",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 8,
            "zone_name": "zone B",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 9,
            "zone_name": "zone C",
            "floor_name": "floor 3"
        },
        {
            "zone_id": 10,
            "zone_name": "zone A",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 11,
            "zone_name": "zone B",
            "floor_name": "floor 4"
        },
        {
            "zone_id": 12,
            "zone_name": "zone C",
            "floor_name": "floor 4"
        }

    ]
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);

    const handleViewClick = (item) => {
        setSelectedItem(item);
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
    };

    const handleDeleteClick = (item) => {
        // perform delete action here, using item.zone_id or other identifying property
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
    };

    const handlePrevClick = () => {
        setPageIndex((prevPageIndex) => prevPageIndex - 1);
    };

    const handleNextClick = () => {
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
    };

    const handlePageClick = (index) => {
        setPageIndex(index);
    };

    const pageCount = Math.ceil(data.length / pageSize);
    const pageIndices = Array.from({ length: pageCount }, (_, index) => index);

    // Determine the indices of the page buttons to display
    let startButtonIndex = Math.max(0, pageIndex - 2);
    let endButtonIndex = Math.min(pageCount - 1, startButtonIndex + 4);
    startButtonIndex = Math.max(0, endButtonIndex - 4);

    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = data.slice(startIndex, endIndex);

    return (
        <>  
            <div className="flex items-center justify-between mb-4">
                <div>
                    <label htmlFor="pageSize" className="mr-2">
                        Rows per page:
                    </label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select>
                </div>
            </div>

            <table className="table-auto w-full text-left">
                <thead className="bg-blue-600">
                    <tr className="text-white">
                        <th className="px-4 py-2 w-1/5 text-center">#</th>
                        <th className="px-4 py-2 w-2/5 text-center">Zone Name</th>
                        <th className="px-4 py-2 w-2/5 text-center">Floor Name</th>
                        <th className="px-4 py-2 w-1/5 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pageData.map((item, index) => (
                        <tr className="border-b bg-gray-50" key={item.zone_id}>
                            <td className="px-4 py-2 flex justify-center">
                                {startIndex + index + 1}
                            </td>
                            <td className="px-4 py-2 text-center">{item.zone_name}</td>
                            <td className="px-4 py-2 text-center">{item.floor_name}</td>
                            <td className="px-4 py-2 flex justify-center">
                                <button
                                    onClick={() => handleViewClick(item)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleEditClick(item)}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(item)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex itens-center'>
                <div>
                    <span className="text-gray-600 mr-2">
                        {data.length} records, {pageCount} pages
                    </span>
                    <button
                        onClick={handlePrevClick}
                        disabled={pageIndex === 0}
                        className="px-4 py-2 border rounded text-blue-500 hover:text-blue-700"
                    >
                        Prev
                    </button>
                    {startButtonIndex > 0 && (
                        <button
                            onClick={() => handlePageClick(0)}
                            className="px-4 py-2 border rounded text-blue-500 hover:text-blue-700"
                        >
                            1
                        </button>
                    )}
                    {startButtonIndex > 1 && (
                        <span className="px-4 py-2 border rounded text-gray-600">
                            ...
                        </span>
                    )}
                    {pageIndices.slice(startButtonIndex, endButtonIndex + 1).map((index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index)}
                            className={`px-4 py-2 border rounded ${index === pageIndex
                                ? 'text-blue-700'
                                : 'text-blue-500 hover:text-blue-700'
                                }`}
                        >
                            {index + 1}
                        </button>))}
                    {endButtonIndex < pageCount - 2 && (
                        <span className="px-4 py-2 border rounded text-gray-600">
                            ...
                        </span>
                    )}
                    {endButtonIndex < pageCount - 1 && (
                        <button
                            onClick={() => handlePageClick(pageCount - 1)}
                            className="px-4 py-2 border rounded text-blue-500 hover:text-blue-700"
                        >
                            {pageCount}
                        </button>
                    )}
                    <button
                        onClick={handleNextClick}
                        disabled={pageIndex === pageCount - 1}
                        className="px-4 py-2 border rounded text-blue-500 hover:text-blue-700"
                    >
                        Next
                    </button>
                </div>
            </div>
            {/* Add a modal or other view to display selected item */}
            {selectedItem && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-lg font-bold mb-2">
                            {selectedItem.zone_name} ({selectedItem.floor_name})
                        </h2>
                        <p>Other details about this item could go here...</p>
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default table