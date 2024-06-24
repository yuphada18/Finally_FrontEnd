import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/router';
import { callApiLogin } from "./api/calllogin";

function login2() {
    const [value, setvalue] = useState({ username: "", password: "" })
    const router = useRouter();
    useEffect(() => {
        var test = ""
        var test2 = ""
        value.username = test
        value.password = test2
        setvalue({ ...value })
    }, [])

    const handleChang = (name, e) => {
        value[name] = e.target.value
        setvalue({ ...value })
        console.log(value)

    }
    const call_login = async () => {
        let data = await callApiLogin(value)
        console.log(data);
        if (!data.error) {
            localStorage.setItem("Authorization", data.access_token)
            if (data.role_name != "user")
                router.push("/admin/indexadmin");
            else {
                router.push("/")
            }
        }
        var token = localStorage.getItem("Authorization")
        console.log(token)
    }
    return (
        <div className="background_login2">
            <div className=" h-screen flex items-center justify-around">
                <div className='w-1/2 flex justify-center  relative'>
                    <div className="w-1/2 flex justify-center  relative">
                        <Image className="ml-10" src={"/image/aishoping.png"} width={600} height={600}></Image>
                    </div>
                </div>
                <div class="relative py-3 sm:w-96 mx-auto text-center">
                    {/* <span class="text-4xl font-normal text-blue-700 decoration-wavy italic">E-Shoping Assistance</span> */}
                    <img src="/image/eshoping.png" alt="big-image" />
                    <div class="mt-4 bg-white shadow-md rounded-lg text-left">
                        <div class="h-4 bg-blue-400 rounded-t-[1rem] "></div>
                            <div class="px-20 py-14 ">
                            <label class="block font-semibold"> Username</label>
                            <input onChange={(e) => handleChang("username", e)} value={value.username} type="text" placeholder="Username" class="border w-75 h-5 px-3 py-5 mt-2 rounded-md bg-gray-200"></input>
                            <label class="block mt-3 font-semibold"> Password</label>
                            <input onChange={(e) => handleChang("password", e)} value={value.password} type="password" placeholder="Password" class="border w-75 h-5 px-3 py-5 mt-2 rounded-md bg-gray-200"></input>
                            <div class="flex justify-between items-baseline">
                                <button onClick={() => call_login()} type="submit" class="mt-4 bg-blue-400 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Login</button>
                                <button type="text" class="mt-4 bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default login2