import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { callapi_login } from "./api/calllogin";

function login() {
    const [value, setvalue] = useState({username:"",password:""})
    const router = useRouter();
    useEffect(() => {
      var test = ""
      var test2 = ""
      value.username = test
      value.password = test2
      setvalue({...value})
    }, [])
    const handleChang = (name,e) =>{
        value[name] = e.target.value
        setvalue({...value})
        console.log(value)
    }
    const call_login= async()  =>{
        let data = await callapi_login(value)
        console.log(data);
        if(!data.error){
            localStorage.setItem("Authorization",data.access_token)
            router.push("/home");
            }
        var token = localStorage.getItem("token")
        console.log(token)
    }
  return (
    <div className="background_login">
        <link rel="stylesheet" href="/styles/tailwind.css" />
      <div className=" h-screen flex items-center justify-around">
        <div className="w-1/2 flex justify-center  relative">
            <Image className="ml-10" src={"/image/shopingcart.png"} width={600} height={600}></Image>
        </div>
        <div className="w-1/2 flex justify-center">
        <div className="bg-sky-400 w-[400px] h-[400px] p-6 rounded-lg shadow-2xl">
          <div>
            <label className="block text-gray-700 font-medium mb-2 shadow-lg">
              Username:
              <input onChange={(e)=>handleChang("username",e)} value={value.username} type="text" className="form-input mt-1 block w-full p-5 rounded-lg" placeholder="Username" />
            </label>
            <label className="block text-gray-700 font-medium mb-2">
              Password:
              <input onChange={(e)=>handleChang("password",e)} value={value.password} type="password" className="form-input mt-1 block w-full p-5 rounded-lg" placeholder="Password" />
            </label>
            <div className="flex justify-center mt-4">
              <button onClick={()=>call_login()} className="bg-blue-500 text-white p-5 rounded-lg">Login</button>
              <button className="bg-gray-200 text-black p-5 rounded-lg ml-4">Register</button>
            </div>
            <br></br>
            <p className="text-2xl text-center text-gray-100">UWB Tracking Location</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default login;
