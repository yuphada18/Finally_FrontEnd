import { url } from '@/config';
import { useState } from 'react';

const FileInput = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(url+'/upload/image/promotion', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
  };

  const handleSubmit = async () => {

  }
  return (
    <div className="mt-4">
      <label htmlFor="file" className="block text-sm font-medium text-gray-700">
        Choose a file
      </label>
      <div className="mt-1">
        <input
          id="file"
          name="file"
          type="file"
          className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={handleFileChange}
        />
      </div>
      <button
        className="mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default FileInput;
