import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Logout } from '@/pages/api/calllogin';
const Sidebar = ({ menus }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = () => {
    setIsLoading(true);
    localStorage.clear();
    router.push('/login2');
    };
    const router_image = () => {
         router.push("/")
      }
    const CallLogout= async ()=>{
        let logout = await Logout()
        console.log(logout)
        if(logout){
            setIsLoading(true);
            localStorage.clear();
            router.push('/login2');
        }

    }
    return (
        <div className='w-64 h-full'>
            <div class=" flex flex-col top-0 left-0 w-full bg-white h-full border-r">
                <div class="relative py-2 mx-auto text-center">
                    <img onClick={()=>router_image()}  src="/image/eshoping.png" alt="big-image" />
                </div>
                <div class="flex-grow bg-neutral-800 h-full overflow-x-auto">
                    <ul class="flex flex-col py-4 space-y-1 h-full">
                        <li class="px-5">
                        </li>
                        {menus && menus.length>0 && menus.map((menu, index) => {
                            if (menu.value === 'Yes') {
                                return (
                                    <li key={index}>
                                        <Link href={menu.feature_key}>
                                            <p class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ">
                                                <span class="inline-flex justify-center items-center ml-4">    </span>
                                                <span class="ml-2 text-sm tracking-wide truncate font-sans text-neutral-300 font-bold ">
                                                    {menu.feature_name}
                                                </span>
                                            </p>
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                        <li class="px-5 my-px">
                            {/* <div class="flex flex-row items-center h-8 my-px" >
                                <div class="text-left text-sm font-light tracking-wide text-gray-500 text-neutral-500 font-bold">
                                    ลงชื่อออก
                                </div>
                            </div> */}
                        </li>
                        <li onClick={()=>CallLogout()} disabled={isLoading}>
                            <a
                                href="#"
                                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span class="inline-flex justify-center items-center ml-4">
                                    <svg
                                        class="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        ></path>
                                    </svg>
                                </span>
                                <span  class="ml-2 text-sm tracking-wide truncate font-sans text-neutral-300 font-bold font-style: italic">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
