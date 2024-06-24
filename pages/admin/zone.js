import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar2 from "@/components/Sidebar2";
import { GetFeatureData } from '../api/getfeature';
import { DeleteZone, GetZone, InsertZone } from '../api/zone_api';
import { GetFloor } from "../api/floor_api";
import { UpdateZone } from '../api/zone_api';
import Swal from 'sweetalert2';
function zone() {
    const router = useRouter();
    const [menus, setmenus] = useState([{}])
    // const [entity, setentity] = useState(5);
    const [searchValue, setsearchValue] = useState("");
    const [data, setdata] = useState([])
    const [AddModal, setAddModal] = useState(false);
    const [NewZone, setNewZone] = useState({ "floor_name": "", "zone_name": "" })
    const [floors, setFloors] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [UpdateData, setUpdateData] = useState({"zone_id":"","zone_name":"","floor_name":""})
    const [EditModal, setEditModal] = useState(false)
    const [floorIndex, setfloorIndex] = useState(0)
    const [RF, setRF] = useState(false)
    const handleChangZone = (name, e) => {
        NewZone[name] = e.target.value
        NewZone["floor_name"] = selectedFloor
        setNewZone({ ...NewZone })
    }
    useEffect(() => {
        on_load();
        get_zone_data();
        get_floor_data();
        return () => {
        }
    }, [RF])

    const on_load = async () => {
        var token = localStorage.getItem("Authorization")
        if (!token) {
            router.push('/login2')
        }
        let featuredata = await GetFeatureData()
        let pathnow = router.pathname
        const isPathNotInFeatureKeys = !featuredata.some((obj) => obj.feature_key === pathnow);
        if (isPathNotInFeatureKeys) {
          router.push("/404")
        } 
        if (featuredata) {
            setmenus(featuredata)
        }
        else {
            router.push('/404')
        }
    };
    const get_zone_data = async () => {
        let data_zone = await GetZone()
        if (data_zone) {
            setdata(data_zone)
        }
    };
    const get_floor_data = async () => {
        let floor_data = await GetFloor();
        if (floor_data) {
            setFloors(floor_data)
        }
    };
    const handleFloorChange = (event) => {
        setSelectedFloor(event.target.value);
        NewZone["floor_name"] = event.target.value
        setNewZone({ ...NewZone })
        console.log(NewZone)
    };
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [ViewModal, setViewModal] = useState(false);
    const handleViewClick = (item) => {
        setSelectedItem(item);
        setViewModal(!ViewModal)

    };
    const handleEditClick = (item) => {
        setSelectedItem(item);
        setEditModal(!EditModal)
        const floorIndex = floors.findIndex((floor) => floor.floor_name === item.floor_name);
        setfloorIndex(floorIndex)
        setUpdateData(item)
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        on_delete(item)
    };
    const on_delete = (i) => {
        console.log(i)
        let delete_id = i.zone_id
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
            let conf_del = await DeleteZone(delete_id)
            if (conf_del) {
              Swal.fire(
                'Deleted!',
                'Your Zone has been deleted.',
                'success'
              )
              
            }
          }
          setRF(!RF)
        })
      }
    const handleChangUpdateFloorSelect = (data)=>{
        console.log(data)
        UpdateData["floor_name"] = data
        setUpdateData({ ...UpdateData})
        console.log(UpdateData)
    }
    const handleChangUpdateZone = (e)=>{
        UpdateData["zone_name"] = e.target.value
        setUpdateData({ ...UpdateData})
        console.log(UpdateData)
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
    const add_click = () => {
        setSelectedFloor(null);
        setAddModal(!AddModal);
    };
    const confirm_insert = (new_data) => {
        console.log(new_data)
        if (new_data.floor_name == null || new_data.floor_name == "Select a floor") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pls Select Floor',
            })
        }
        else {
            Swal.fire({
                title: 'Do you want to add this Floor?',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let newzone = await InsertZone(new_data)
                    if (newzone) {
                        Swal.fire('Saved!', '', 'success')
                        setAddModal(!AddModal);
                        setRF(!RF)
                        setNewZone({ "floor_name": "", "zone_name": "" })
                    }
                }
            })
        }
    }
    const cancle_edit = () => {
        setEditModal(!EditModal);
    }
    const confirm_update = (update_data) => {
        console.log(update_data)
        Swal.fire({
          title: 'Do you want to Edit this Zone?',
          showCancelButton: true,
          confirmButtonText: 'Save',
        }).then( async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            let confirm_update = await UpdateZone(update_data)
            if (confirm_update) {
              Swal.fire('Saved!', '', 'success')
              setEditModal(!EditModal);
              setRF(!RF)

            }
          }
        })
      }
      const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(pageSize);
    const [pageCount, setPageCount] = useState(1);
    const [pageIndices, setPageIndices] = useState([]);
    const [startButtonIndex, setStartButtonIndex] = useState(0);
    const [endButtonIndex, setEndButtonIndex] = useState(2);
    const [pageData, setPageData] = useState([]);
    const [PageSlide, setPageSlide] = useState([])
    useEffect(() => {
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;
        const pageData = data.slice(startIndex, endIndex);
        setStartIndex(startIndex);
        setEndIndex(endIndex);
        setPageData(pageData);
        const pageCount = Math.ceil(data.length / pageSize);
        const pageIndices = Array.from({ length: pageCount }, (_, index) => index);
        setPageCount(pageCount);
        setPageIndices(pageIndices);
        let startButtonIndex = pageIndex - 1;
        let endButtonIndex = pageIndex + 1;
        if (pageIndex === 0) {
            startButtonIndex = 0;
            endButtonIndex = Math.min(2, pageCount - 1);
        } else if (pageIndex === pageCount - 1) {
            startButtonIndex = Math.max(0, pageCount - 3);
            endButtonIndex = pageCount - 1;
        }
        setStartButtonIndex(startButtonIndex);
        setEndButtonIndex(endButtonIndex);
        const pagedata = data.slice(startIndex, endIndex);
        setPageData(pagedata);
        let slide = pageIndices.slice(startButtonIndex, endButtonIndex + 1)
        setPageSlide(slide)
    }, [data, pageSize, pageIndex]);
    const search = async (e) => {
        setsearchValue(e.target.value)
        let check = [];
        let search = [];
        let event = e.target.value.toUpperCase();
        let data_zone = await GetZone()
        console.log(data)
        check = data_zone
        if (data_zone) {
            var matches = check.filter(function (x) {
                return x.zone_name?.toUpperCase().includes(event) || x.floor_name?.toUpperCase().includes(event)
            });
            search = matches
        }
        if (e.target.value != "") {
            setdata(search)
            handlePageClick(0)
        }
        else {
            setdata(check)
            handlePageClick(0)
        }

    }
    // const pageCount = Math.ceil(data.length / pageSize);
    // const pageIndices = Array.from({ length: pageCount }, (_, index) => index);

    // let startButtonIndex = pageIndex - 1;
    // let endButtonIndex = pageIndex + 1;
    // if (pageIndex === 0) {
    //     startButtonIndex = 0;
    //     endButtonIndex = Math.min(2, pageCount - 1);
    // } else if (pageIndex === pageCount - 1) {
    //     startButtonIndex = Math.max(0, pageCount - 3);
    //     endButtonIndex = pageCount - 1;
    // }
    // const startIndex = pageIndex * pageSize;
    // const endIndex = startIndex + pageSize;
    // const pageData = data.slice(startIndex, endIndex);
    return (
        <div class="h-screen flex flex-shrink-0 antialiased background_login2">
            {AddModal && (
                <div className=" fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-row  ">
                                <label className="mr-3 ">ชั้นของห้าง:</label>
                                <select className=" border rounded border-black " onChange={handleFloorChange} value={selectedFloor}>
                                    <option value={null}>Select a floor</option>
                                    {floors.map((floor) => (
                                        <option key={floor.floor_id} value={floor.floor_name}>
                                            {floor.floor_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[7px]">ชื่อของโซน:</label>
                                <input onChange={(e) => handleChangZone("zone_name", e)} type="text" className=" border rounded border-black mt-2" />
                            </div>
                        </div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={() => confirm_insert(NewZone)}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={add_click}
                        >
                            Cancle
                        </button>
                    </div>
                </div>
            )}
            {EditModal && (
                <div className=" fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-row  ">
                                <label className="mr-3 ">ชั้นของห้าง:</label>
                                <select className=" border rounded border-black " onChange={e=>{
                                        const selectedValue = e.target.value;
                                        handleChangUpdateFloorSelect(selectedValue);
                                    }} 
                                value={selectedFloor}>
                                    <option >Select a floor</option>
                                    {floors.map((floor,i) => (
                                        <option  selected={i === floorIndex} key={floor.floor_id} value={floor.floor_name}>
                                            {floor.floor_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[7px]">ชื่อของโซน:</label>
                                <input onChange={(e) => handleChangUpdateZone(e)} type="text" className=" border rounded border-black mt-2" value={UpdateData.zone_name}/>
                            </div>
                        </div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={() => confirm_update(UpdateData)}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={cancle_edit}>
                            Cancle
                        </button>
                    </div>
                </div>
            )}
            
            <Sidebar2 menus={menus} />
            <div class="w-10/12 h-full flex ">
                <div class=" w-full flex  justify-center font-sans overflow-auto my-10">
                    <div class="w-full lg:w-5/6 flex flex-col">
                        <div class="py-8">
                            <div class="h-4 bg-blue-600  "></div>
                            <div class="px-1 py-5 bg-gray-100 font-bold text-3xl font-mono shadow-2xl rounded-b-lg">
                                การจัดการโซนสินค้า
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
                                        onChange={(e) => search(e)}
                                        placeholder="Search"
                                        class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                    />
                                </div>
                                <div className="w-full flex justify-end">
                                    <button onClick={add_click} className="w-24 border rounded-lg bg-yellow-300">
                                        เพิ่ม
                                    </button>
                                </div>
                            </div>
                            <br></br>
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
                                    {PageSlide.map((index) => (
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
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-lg font-bold mb-2">
                            ชั้งของห้าง: {" " + selectedItem.floor_name}
                        </h2>
                        <h2 className="text-lg font-bold mb-2">
                            ชื่อโซน: {" " + selectedItem.zone_name}
                        </h2>
                        <button
                            onClick={() => handleViewClick()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default zone