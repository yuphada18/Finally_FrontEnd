import React, { useEffect, useState } from 'react';
import ReactBarcode from 'react-barcode';
import { GenBarcode } from './api/barcode_login';
import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';
import { Logout } from './api/calllogin';
function Index  ()  {
  const [barcode, setBarcode] = useState('');
  const router = useRouter();
  useEffect(() => {
    var token = localStorage.getItem("Authorization")
    if(!token){
         router.push('/login2')
    }
  })
  
  const createBarcode = async () => {
    const data = await GenBarcode();
    const generatedBarcode = data.barcode;
    setBarcode(generatedBarcode);
  };

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    router.push('/login2');
  };
  
  const CallLogout= async ()=>{
    let logout = await Logout()
    console.log(logout)
    if(logout){
        //setIsLoading(true);
        localStorage.clear();
        router.push('/login2');
    }

}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-gray-700 text-2xl font-medium">QRCode Generator</h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 flex justify-center">
        <QRCode value={barcode} size={256} fgColor="#000000" bgColor="#ffffff" />
        </div>
        <div className="mt-8">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={createBarcode}
          >
            Create Barcode
          </button>
          <button
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>CallLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
