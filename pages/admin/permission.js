import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar2 from "@/components/Sidebar2";
import { GetFeatureData } from '../api/getfeature';
import Swal from 'sweetalert2';
import { CallUpdateRole, DeleteRole, GetAllFeatureData, GetAllFeatureDataOfRole, InsertRole } from '../api/role_api';

function lock() {
    const router = useRouter();
    const [menus, setmenus] = useState([{}])
    const [entity, setentity] = useState(5);
    const [searchValue, setsearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [ViewModal, setViewModal] = useState(false);
    const [EditModal, setEditModal] = useState(false)
    const [UpdateRole, setUpdateRole] = useState({role_id:"",role_name:"",feature:[]})
    const [NewRole, setNewRole] = useState({role_name:"",feature:[]})
    const [data, setdata] = useState([])
    const [Allfeature, setAllfeature] = useState([])
    useEffect(() => {
        on_load();
        get_role_data();
        get_all_feature();
        return () => {
        }
    }, [])
    const get_role_data= async()=>{
        let data = await GetAllFeatureDataOfRole()
        if(data){
            setdata(data)
        }
    }
    const get_all_feature= async()=>{
        let data = await GetAllFeatureData()
        console.log("ttt",data)
        if(data){
            setAllfeature(data)
        }
    }
    const on_load = async() => {
        var token = localStorage.getItem("Authorization")
        if(!token){
             router.push('/login2')
        }
        let featuredata = await GetFeatureData()
        let pathnow = router.pathname
        const isPathNotInFeatureKeys = !featuredata.some((obj) => obj.feature_key === pathnow);
        if (isPathNotInFeatureKeys) {
          router.push("/404")
        } 
        if(featuredata){
            setmenus(featuredata)
        }
        else{
            router.push('/404')
        }   
    };
    const ViewClick = () => {
        console.log(selectedItem)

    };
    const handleViewClick = (item) => {
        setSelectedItem(item);
        console.log(item)
        setViewModal(!ViewModal)

    };
    const handleEditClick = (item) => {
        //console.log(item)
        let datapermis=[]
        for (let i = 0; i < item.permission.length; i++) {
            //console.log(item.permission[i])
            if(item.permission[i].status_access !=0){
                let featureId = item.permission[i].feature_id
                datapermis.push(featureId)
            }
        }
        UpdateRole["role_name"] = item.role_name
        UpdateRole["role_id"] = item.role_id
        UpdateRole["feature"] = datapermis
        setUpdateRole({ ...UpdateRole })
        console.log(datapermis)
        setSelectedItem(item);
        setEditModal(!EditModal)
    };
    const CancleEdit = () => {
        setEditModal(!EditModal)
    }


    const handleDeleteClick = async (i) => {
        console.log(i)
        let delete_id = i
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to Delete this Role!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
            if (result.isConfirmed) {
                let conf_del = await DeleteRole(delete_id)
                if (conf_del) {
                    Swal.fire(
                        'Deleted!',
                        'Role has been deleted.',
                        'success'
                    )
                }
            }
            get_role_data();
        })
    }

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
    //const [selectedFeatures, setSelectedFeatures] = useState([]);
    const handleCheckboxChange = (featureId) => {
        console.log(featureId)
        if (UpdateRole.feature.includes(featureId)) {
            UpdateRole.feature = UpdateRole.feature.filter((id) => id !== featureId);
        } else {
            UpdateRole.feature = [...UpdateRole.feature, featureId];
        }
        setUpdateRole(UpdateRole);
    };

    const handleCheckboxChangeNewRole = (featureId) => {
        console.log(featureId)
        if (NewRole.feature.includes(featureId)) {
            NewRole.feature = NewRole.feature.filter((id) => id !== featureId);
        } else {
            NewRole.feature = [...NewRole.feature, featureId];
        }
        setNewRole(NewRole);
    };
    const handleChangeNewRoleName = (event) => {
        console.log(event.target.value)
        NewRole["role_name"] = event.target.value
        setNewRole({ ...NewRole })
    };

    const ConfirmEdit = (feature) => {
        Swal.fire({
            title: 'Do you want to Edit this Lock?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then( async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             let data = await CallUpdateRole(feature)
             if(data){
                    Swal.fire('Saved!', '', 'success')
                    setEditModal(!EditModal);
                    on_load();
                    get_role_data();
             }
            }
        })
        
    }
    const pageCount = Math.ceil(data.length / pageSize);
    const pageIndices = Array.from({ length: pageCount }, (_, index) => index);
    const handleChangeUpdateNameRole = (event)=>{
        console.log(event.target.value)
        UpdateRole["role_name"] = event.target.value
        setUpdateRole({ ...UpdateRole })
    }
    let startButtonIndex = pageIndex - 1;
    let endButtonIndex = pageIndex + 1;
    if (pageIndex === 0) {
        startButtonIndex = 0;
        endButtonIndex = Math.min(2, pageCount - 1);
    } else if (pageIndex === pageCount - 1) {
        startButtonIndex = Math.max(0, pageCount - 3);
        endButtonIndex = pageCount - 1;
    }
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = data.slice(startIndex, endIndex);
    const [AddModal, setAddModal] = useState(false);
    const add_click = () => {
        setAddModal(!AddModal);
    };
    const ConfirmAdd= async (data)=>{
        Swal.fire({
            title: 'Do you want to add this Role?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let NewRoleData = await InsertRole(data)
                if (NewRoleData) {
                    Swal.fire('Saved!', '', 'success')
                    setAddModal(!AddModal);
                    get_role_data();
                    get_all_feature();
                    setNewRole({role_name:"",feature:[]})
                }
            }
        })
    }
    return (
        <div class="h-screen flex flex-shrink-0 antialiased background_login2">
            <Sidebar2 menus={menus} />
            <div class="w-10/12 h-full flex ">
                <div class=" w-full flex  justify-center font-sans overflow-auto my-10">
                    <div class="w-full lg:w-5/6 flex flex-col">
                        <div class="py-8">
                            <div class="h-4 bg-blue-600  "></div>
                            <div class="px-1 py-5 bg-gray-100 font-bold text-3xl font-mono shadow-2xl rounded-b-lg">
                                การจัดการสิทธิ์ผู้ใช้งาน
                            </div>
                            <br></br>
                            <div class="my-2 flex sm:flex-row flex-col">
                                <div class="flex flex-row mb-1 sm:mb-0">
                                    <div class="relative w-24 ">
                                        <select
                                            value={pageSize}
                                            onChange={handlePageSizeChange}
                                            class="text-center h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                class="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="relative">
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                class="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="block relative">
                                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg
                                            viewBox="0 0 24 24"
                                            class="h-4 w-4 fill-current text-gray-500"
                                        >
                                            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                                        </svg>
                                    </span>
                                    <input
                                        value={searchValue}
                                        onChange={(e) => setsearchValue(e.target.value)}
                                        placeholder="Search"
                                        class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                    />
                                </div>
                                <div className="w-full flex justify-end">
                                    <button onClick={()=>add_click()} className="w-24 border rounded-lg bg-yellow-300">
                                        เพิ่ม
                                    </button>
                                </div>
                            </div>
                            <br></br>
                            <table className="table-auto w-full text-left">
                                <thead className="bg-blue-600">
                                    <tr className="text-white">
                                        <th className="px-4 py-2 w-1/3 text-center">#</th>
                                        <th className="px-4 py-2 w-2/3 text-center">ชื่อกลุ่มสิทธิ์เข้าใช้งาน</th>
                                        <th className="px-4 py-2 w-3/3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((item, index) => (
                                        <tr className="border-b bg-gray-50" key={item.role_id}>
                                            <td className="px-4 py-2 flex justify-center">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-4 py-2 text-center">{item.role_name}</td>
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
                                                    onClick={() => handleDeleteClick(item.role_id)}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
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
                                            className={`px-4 py-2 border rounded ${index === pageIndex ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' : 'text-blue-500 hover:text-blue-700'}`}
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
                        </div>
                    </div>
                </div>
            </div>
            {/* Add a modal or other view to display selected item */}
            {ViewModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-3/3">
                        <div className="flex flex-col flex-wrap w-[1000px]">
                            <div className='flex flex-row'>
                                <label className='text-2xl font-bold mb-2'> ชื่อสิทธิ์เข้าใช้งาน </label>
                                <label className='text-2xl ml-5 '>  {' ' + selectedItem.role_name}</label>
                            </div>
                            <div className='flex flex-row flex-wrap w-[1000px] mt-5'>
                                {selectedItem.permission.map(feature => (
                                    <div className="flex mb-6 w-1/4 h-full">
                                        <input
                                            type="checkbox"
                                            className="h-6 w-6 mr-4 bg-green-400"
                                            value={feature.feature_id}
                                            // onChange={() => handleCheckboxChange(feature.feature_id)}
                                            checked={feature.status_access === 1}
                                            disabled={true}
                                        />

                                        <label className="text-lg">
                                            {feature.feature_name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => handleViewClick()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {EditModal && (
                <div className=" bg-gray-500 bg-opacity-50 z-10 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col">
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-md w-3/3">
                                <div className="flex flex-col flex-wrap w-[1000px]">
                                    <div className='flex flex-row justify-center'>
                                        <label className='text-2xl font-bold mb-2'> ชื่อสิทธิ์เข้าใช้งาน </label>
                                        <input onChange={(e)=>handleChangeUpdateNameRole(e)} type="text" className=" text-2xl border rounded w-auto h-8 ml-3 mt-1  border-black flex justify-center text-center"  value={UpdateRole.role_name}/>
                                        {/* <label className='text-2xl ml-5 '>  {' ' + selectedItem.role_name}</label> */}
                                    </div>
                                    <div className='flex flex-row flex-wrap w-[1000px] mt-6'>
                                        {selectedItem.permission.map(feature => (
                                            <div className="flex mb-6 w-1/4 h-full">
                                                <input
                                                    type="checkbox"
                                                    className="h-6 w-6 mr-4 bg-green-400"
                                                    value={feature.feature_id}
                                                    onChange={() => handleCheckboxChange(feature.feature_id)}
                                                    defaultChecked={feature.status_access === 1}
                                                />
                                                <label className="text-lg">
                                                    {feature.feature_name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => ConfirmEdit(UpdateRole)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                                        onClick={() => CancleEdit()}
                                    >
                                        Cancle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
             {AddModal && (
                <div className=" bg-gray-500 bg-opacity-50 z-10 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col">
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-md w-3/3">
                                <div className="flex flex-col flex-wrap w-[1000px]">
                                    <div className='flex flex-row justify-center'>
                                        <label className='text-2xl font-bold mb-2'> ชื่อสิทธิ์เข้าใช้งาน </label>
                                        <input onChange={(e)=>handleChangeNewRoleName(e)} type="text" className=" text-2xl border rounded w-auto h-8 ml-3 mt-1  border-black flex justify-center text-center"  value={NewRole.role_name}/>
                                        {/* <label className='text-2xl ml-5 '>  {' ' + selectedItem.role_name}</label> */}
                                    </div>
                                    <div className='flex flex-row flex-wrap w-[1000px] mt-6'>
                                        {Allfeature.map(feature => (
                                            <div className="flex mb-6 w-1/4 h-full">
                                                <input
                                                    type="checkbox"
                                                    className="h-6 w-6 mr-4 bg-green-400"
                                                    value={feature.feature_id}
                                                    onChange={() => handleCheckboxChangeNewRole(feature.feature_id)}
                        
                                                />
                                                <label className="text-lg">
                                                    {feature.feature_name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => ConfirmAdd(NewRole)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                                        onClick={() => add_click()}
                                    >
                                        Cancle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>

    );
}

export default lock