import React, { useState } from "react";

const Table = ({ headerData, bodyData, handleEdit, handleDelete }) => {
  const [maxRows, setMaxRows] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMaxRowsChange = (event) => {
    setMaxRows(parseInt(event.target.value));
  };

  const handleView = (data) => {
    console.log("Selected Row Data:", data);
    setSelectedRow(data);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <select
          value={maxRows}
          onChange={handleMaxRowsChange}
          className="bg-white border border-gray-400 rounded-lg px-4 py-2"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <table className="table-auto w-full text-left bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr className="text-gray-600 uppercase text-sm font-medium">
            {headerData.map((header, index) => (
              <th key={index} className="py-3 px-6 text-left">
                {header}
              </th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bodyData.slice(0, maxRows).map((body, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-6">{index + 1}</td>
              {Object.values(body).map((value, index) => (
                <td key={index} className="py-3 px-6">
                  {value}
                </td>
              ))}
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleView(body)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-400"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(body)}
                  className="bg-yellow-500 text-black px-3 py-1 rounded-full mr-2 hover:bg-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(body)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
