import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/router';
import { callApiLogin } from "./api/calllogin";
import Swal from 'sweetalert2';
import { CallRegisTer } from './api/calllogin';
function login2() {
    const [value, setvalue] = useState({ username: "", password: "" })
    const router = useRouter();
    const [ModalRegister, setModalRegister] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordCheck: '',
        gender: 'ชาย',
        firstName: '',
        lastName: '',
        address: '',
        district: '',
        subdistrict: '',
        province: '',
        zipcode: '',
    });
    const handleSubmit = async () => {
        console.log(formData);
 
        const emptyFields = Object.values(formData).filter(value => value === '');
        if (emptyFields.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            timer: 2000
          });
          return;
        }
      
 
        if (formData.password !== formData.passwordCheck) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match',
            timer: 2000
          });
          return;
        }
      
        // Confirmation dialog
        Swal.fire({
          title: 'Do you want to Register?',
          showCancelButton: true,
          confirmButtonText: 'Save'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let reg = await CallRegisTer(formData);
            if (reg) {
              Swal.fire('Register!', '', 'success');
              setModalRegister(!ModalRegister);
              setFormData({
                username: '',
                password: '',
                passwordCheck: '',
                gender: 'ชาย',
                firstName: '',
                lastName: '',
                address: '',
                district: '',
                subdistrict: '',
                province: '',
                zipcode: '',
              });
            }
          }
        });
      };
      
    const handleChangeRegister = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        var test = ""
        var test2 = ""
        value.username = test
        value.password = test2
        setvalue({ ...value })
    }, [])
    const RegisterClick = () => {
        setModalRegister(!ModalRegister)
        setFormData({
            username: '',
            password: '',
            passwordCheck: '',
            gender: 'ชาย',
            firstName: '',
            lastName: '',
            address: '',
            district: '',
            subdistrict: '',
            province: '',
            zipcode: '',
        })
    }
    const handleChang = (name, e) => {
        value[name] = e.target.value
        setvalue({ ...value })
        console.log(value)

    }
    const call_login = async () => {
        let data = await callApiLogin(value)
        console.log(data);
        if (data.status == 'success') {
            localStorage.setItem("Authorization", data.access_token)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: false,
                timer: 1500
            })
            if (data.role_name != "user")
                router.push("/admin/indexadmin");
            else {
                router.push("/")
            }
        }
        else {
            console.log("Fail")
            Swal.fire({
                icon: 'error',
                title: 'Incorrect Login',
                text: 'Your username or password is incorrect. Please try again.',
                showConfirmButton: false,
                timer: 1500,
                background: '#FFEBEB',
                width: 400,
                padding: '3em',
                customClass: {
                    title: 'text-red-500 font-medium',
                    content: 'text-red-500 font-medium'
                }
            });
        }
    }
    return (
        <div className="background_login2">
            {ModalRegister && (
                <div className="fixed flex flex-row w-full h-full bg-gray-500 bg-opacity-50  items-center justify-center z-10">
                    <div class="mt-4 bg-white shadow-md rounded-[1rem] text-left w-1/3">
                           
                        <div class="h-4 bg-blue-400 rounded-t-[1rem] "></div>
                         {/* <h2 className="mt-0 text-center text-xl font-extrabold text-gray-900">
                                    Register your account
                                </h2> */}
                        <div class="px-20 py-14 flex flex-row w-full ">
                            <div className="w-1/2 flex flex-col">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mt-2">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200"
                                        value={formData.username}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-2">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200"
                                        value={formData.password}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="passwordCheck" className="block text-sm font-medium text-gray-700 mt-2">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="passwordCheck"
                                        name="passwordCheck"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200"
                                        value={formData.passwordCheck}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mt-2">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={handleChangeRegister}
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w -full sm:text-sm border-gray-300 rounded-md bg-gray-200">
                                        
                                        <option value="ชาย">ชาย</option>
                                        <option value="หญิง">หญิง</option>
                                    </select>
                                </div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mt-2">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200"
                                        value={formData.firstName}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mt-2">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200"
                                        value={formData.lastName}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mt-2 ml-2">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        autoComplete="street-address"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200 ml-2"
                                        value={formData.address}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mt-2 ml-2">
                                    District
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="district"
                                        name="district"
                                        type="text"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200 ml-2"
                                        value={formData.district}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="subdistrict" className="block text-sm font-medium text-gray-700 mt-2 ml-2">
                                    Subdistrict
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="subdistrict"
                                        name="subdistrict"
                                        type="text"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200 ml-2"
                                        value={formData.subdistrict}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mt-2 ml-2">
                                    Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="province"
                                        name="province"
                                        type="text"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200 ml-2"
                                        value={formData.province}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                                <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mt-2 ml-2">
                                    Zip Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="zipcode"
                                        name="zipcode"
                                        type="text"
                                        required
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200 ml-2"
                                        value={formData.zipcode}
                                        onChange={handleChangeRegister}
                                    />
                                </div>
                            </div>
                                
                        </div>
                        <div class=" mb-10 w-full flex justify-center">
                                <button onClick={() => handleSubmit()} type="submit" class="mt-2 bg-blue-400 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
                                <button onClick={() => RegisterClick(formData)} type="text" class="mt-2 bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-purple-600 ">Cancle</button>
                            </div>
                    </div>
                </div>
            )}
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
                                <button onClick={() => call_login()} type="submit" class="mt-4 bg-blue-400 text-white py-2 px-6 rounded-md hover:bg-red-600 ">Login</button>
                                <button onClick={() => RegisterClick()} type="text" class="mt-4 bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login2