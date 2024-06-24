import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar2 from "@/components/Sidebar2";
import { GetFeatureData } from '../api/getfeature';
function indexadmin() {
    const router = useRouter();
    const [menus, setmenus] = useState([{}])
    useEffect(() => {
      on_load();
      return () => {
      }
    }, [])
    
    const on_load = async() => {
      var token = localStorage.getItem("Authorization")
        if(!token){
             router.push('/login2')
        }
        let featuredata = await GetFeatureData()
        if(featuredata){
            setmenus(featuredata)
        }
        else{
            router.push('/404')
        }   
  };
    return (
    <div class="h-screen flex flex-shrink-0 antialiased background_login2">
       <Sidebar2 menus={menus} />
      <div class="w-10/12 h-full flex ">
        <div class=" w-full flex  justify-center font-sans overflow-auto my-10">
          <div class="w-full lg:w-5/6 flex flex-col">
            <div class="py-8">
              <div class="h-4 bg-blue-600  "></div>
              <div class="px-1 py-5 bg-gray-100 font-bold text-3xl font-mono shadow-2xl rounded-b-lg">
                สวัสดี
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default indexadmin