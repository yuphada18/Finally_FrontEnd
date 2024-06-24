import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar2 from "@/components/Sidebar2";
import { GetFeatureData } from '../api/getfeature';
import { CallUpdateShelf, DeleteShelf, GetShelf, InsertShelf } from '../api/shelf_api';
import { GetFloor } from '../api/floor_api';
import { GetZoneByFloor } from '../api/zone_api';
import { GetLockByZone } from '../api/lock_api';
import Swal from 'sweetalert2';
function shelf() {
    const router = useRouter();
    const [menus, setmenus] = useState([{}])
    const [entity, setentity] = useState(5);
    const [searchValue, setsearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [ViewModal, setViewModal] = useState(false);
    const [data, setdata] = useState([])
    const [AddModal, setAddModal] = useState(false);
    const [floors, setFloors] = useState([]);
    const [NewShelf, setNewShelf] = useState({ shelf_name: "", lock_id: "" })
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [select1, setSelect1] = useState('');
    const [select2, setSelect2] = useState('');
    const [zone, setzone] = useState([]);
    const [Lock, setLock] = useState([])
    const [FloorId, setFloorId] = useState('')
    const [ZoneId, setZoneId] = useState('')
    const [LockId, setLockId] = useState('')
    const [EditModal, setEditModal] = useState(false)
    const [FloorIndex, setFloorIndex] = useState(0)
    const [Floorname, setFloorname] = useState('')
    const [UpdateShelf, setUpdateShelf] = useState({ shelf_name: "", lock_id: "", shelf_id: "" })
    const [StatusRF, setStatusRF] = useState(false)
    useEffect(() => {
        on_load();
        get_shelf_data()
        get_floor_data();
        handlePageClick(0);
        return () => {
        }
    }, [pageSize])
    useEffect(() => {
        get_shelf_data();

        return () => {
        }
    }, [StatusRF])
    const handleFloorChange = (event) => {
        setFloorId(event.target.value);
        console.log(event.target.value)
        if (event.target.value != '') {
            get_zone_data(event.target.value)
            setLockId("");
            setZoneId("");
        }
        else {
            setzone([])
            setLockId("");
            setZoneId("");
        }
        setLockId("");
        setZoneId("");

    };
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
        let data_shelf = await GetShelf()
        console.log(data)
        check = data_shelf
        if (data_shelf) {
            var matches = check.filter(function (x) {
                return x.shelf_name?.toUpperCase().includes(event) || x.zone_name?.toUpperCase().includes(event) || x.lock_name?.toUpperCase().includes(event)|| x.floor_name?.toUpperCase().includes(event)
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
    const handleFloorChangeUpdate = (event) => {
        setFloorId(event.target.value);
        console.log(event.target.value)
        UpdateShelf["shelf_name"] = selectedItem.shelf_name
        UpdateShelf["lock_id"] = ''
        if (event.target.value != '') {
            get_zone_data(event.target.value)
            setLockId("");
            setZoneId("");
        }
        else {
            setzone([])
            setLockId("");
            setZoneId("");
        }
        setLockId("");
        setZoneId("");

    };

    const get_floor_data = async () => {
        let floor_data = await GetFloor();
        if (floor_data) {
            setFloors(floor_data)
        }
    };
    const get_zone_data = async (id) => {
        let data_zone = await GetZoneByFloor(id)
        console.log("zone", data_zone)
        if (data_zone) {
            setzone(data_zone)
        }
        else {
            setzone([])
        }
        setSelect2('');
    };
    const get_lock_data = async (id) => {

        let data = await GetLockByZone(id)
        console.log(data)
        if (data) {
            setLock(data)
        }
    }
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
    const get_shelf_data = async () => {
        let data_shelf = await GetShelf()
        if (data_shelf) {
            setdata(data_shelf)
        }
    };
    const ViewClick = () => {
        console.log(selectedItem)

    };
    const handleViewClick = (item) => {
        setSelectedItem(item);
        setViewModal(!ViewModal)

    };
    const handleEditClick = (item) => {
        console.log("Item", item)
        const floorIndex = floors.findIndex((floor) => floor.floor_name === item.floor_name);
        setSelectedItem(item);
        setFloorId(item.floor_id)
        setFloorname(item.floor_name)
        setFloorIndex(floorIndex)
        get_zone_data(floors[floorIndex].floor_id)
        get_lock_data(item.zone_id)
        setZoneId(item.zone_id)
        UpdateShelf["shelf_name"] = item.shelf_name
        UpdateShelf["lock_id"] = item.lock_id
        UpdateShelf["shelf_id"] = item.shelf_id
        setUpdateShelf({ ...UpdateShelf })
        setEditModal(!EditModal)

    };
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
        //setSelectedFloor(null);
        setFloorId('');
        setZoneId('');
        setAddModal(!AddModal);
    };
    const handleSelect2Change = (event) => {
        setZoneId(event.target.value);
        get_lock_data(event.target.value)
    };
    const handleSelect3Change = (event) => {
        console.log(event.target.value)
        setLockId(event.target.value);
        NewShelf["lock_id"] = event.target.value
        setNewShelf({ ...NewShelf })
    };
    const handleChangNewShelf = (event) => {
        NewShelf["shelf_name"] = event.target.value
        setNewShelf({ ...NewShelf })
    }
    const confirm_insert = async (shelfdata) => {
        if (shelfdata.shelf_name == '' || shelfdata.lock_id == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                timer: 3000
            })
        }
        else {
            Swal.fire({
                title: 'Do you want to add this Lock?',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let updateshelfdata = await InsertShelf(shelfdata)
                    if (updateshelfdata) {
                        Swal.fire('Saved!', '', 'success')
                        setAddModal(!AddModal);
                        get_shelf_data()
                        setUpdateShelf({ shelf_name: "", lock_id: "", shelf_id: "" })
                    }
                }
            })

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

    const cancleEdit = () => {
        setEditModal(!EditModal)
    }
    const handleEditShelf = (val, event) => {
        if (val === "lock_id") {
            UpdateShelf[val] = parseInt(event.target.value, 10)
        }
        else {
            UpdateShelf[val] = event.target.value
        }
        setUpdateShelf({ ...UpdateShelf })
    }
    const handleEditShelfName = (event) => {
        UpdateShelf["shelf_name"] = event.target.value
        setUpdateShelf({ ...UpdateShelf })
    }
    const ConFirmEdit = (shelfdata) => {
        console.log(shelfdata)
        if (ZoneId == "") {
            console.log("None")
        }
        if (shelfdata.shelf_name == '' || shelfdata.lock_id == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                timer: 3000
            })
        }
        else {
            Swal.fire({
                title: 'Do you want to add this Lock?',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let newshelf = await CallUpdateShelf(shelfdata)
                    if (newshelf) {
                        Swal.fire('Saved!', '', 'success')
                        setEditModal(!EditModal);
                        get_shelf_data()
                        setNewShelf({ shelf_name: "", lock_id: "" })
                    }
                }
            })

        }
    }
    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        on_delete(item)
    };

    const on_delete = (i) => {
        console.log(i)
        let delete_id = i.shelf_id
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to Delete this Shelf!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let conf_del = await DeleteShelf(delete_id)
                if (conf_del) {
                    Swal.fire(
                        'Deleted!',
                        'Your Shelf has been deleted.',
                        'success'
                    )
                }
            }
            setStatusRF(!StatusRF)
        })
    }
    return (
        <div class="h-screen flex flex-shrink-0 antialiased background_login2">
            {AddModal && (
                <div className=" bg-gray-500 bg-opacity-50 z-10 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-row  ">
                                <label className="mr-3 ">ชั้นของห้าง:</label>
                                <select className=" border rounded border-black " onChange={handleFloorChange} value={FloorId}>
                                    <option value="">Select a floor</option>
                                    {floors.map((floor) => (
                                        <option key={floor.floor_id} value={floor.floor_id}>
                                            {floor.floor_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[8px]">ชื่อของโซน:</label>
                                <select
                                    className={`border rounded border-black mt-[8px] ${FloorId !== "" ? "" : "bg-gray-500"}`}
                                    value={ZoneId}
                                    onChange={handleSelect2Change}
                                    disabled={!FloorId}
                                >
                                    <option value="">Select an option</option>
                                    {zone.map((zone) => (
                                        <option key={zone.zone_id} value={zone.zone_id}>
                                            {zone.zone_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[8px]">ชื่อของล็อค:</label>
                                <select
                                    className={`border rounded border-black mt-[8px] ${ZoneId !== "" ? "" : "bg-gray-500"
                                        }`}
                                    value={LockId}
                                    onChange={handleSelect3Change}
                                    disabled={!ZoneId}
                                >
                                    <option value="">Select an option</option>
                                    {Lock.length > 0 && Lock.map((lock) => (
                                        <option key={lock.lock_id} value={lock.lock_id}>
                                            {lock.lock_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[7px]">ชื่อของชั้นวางสินค้า:</label>
                                <input onChange={(e) => handleChangNewShelf(e)} type="text" className=" border rounded border-black mt-2" />
                            </div>
                        </div>
                        <button onClick={() => confirm_insert(NewShelf)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
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
                <div className=" bg-gray-500 bg-opacity-50 z-10 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-row  ">
                                <label className="mr-3 ">ชั้นของห้าง:</label>
                                <select className=" border rounded border-black " onChange={handleFloorChangeUpdate}>
                                    {floors.map((floor, i) => (
                                        <option selected={i === FloorIndex} key={floor.floor_id} value={floor.floor_id}>
                                            {floor.floor_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[8px]">ชื่อของโซน:</label>
                                <select
                                    className={`border rounded border-black mt-[8px] ${FloorId !== "" ? "" : "bg-gray-500"
                                        }`}
                                    // value={UpdateShelf.zone_id}
                                    onChange={handleSelect2Change}
                                >
                                    <option value="">Select an option</option>
                                    {zone.map((zones) => (
                                        <option selected={selectedItem.zone_name === zones.zone_name} key={zones.zone_id} value={zones.zone_id}>
                                            {zones.zone_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[8px]">ชื่อของล็อค:</label>
                                <select
                                    className={`border rounded border-black mt-[8px] ${ZoneId !== "" ? "" : "bg-gray-500"
                                        }`}
                                    onChange={(e) => handleEditShelf("lock_id", e)}
                                    disabled={!ZoneId}
                                    value={UpdateShelf.lock_id}
                                >
                                    {<option value="">Select an option</option>}
                                    {Lock.length > 0 && Lock.map((lock) => (
                                        <option key={lock.lock_id} value={lock.lock_id}>
                                            {lock.lock_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row justify-center">
                                <label className="mr-3 mt-[7px]">ชื่อของชั้นวางสินค้า:</label>
                                <input onChange={(e) => handleEditShelf("shelf_name", e)} type="text" className=" border rounded border-black mt-2" value={UpdateShelf.shelf_name} />
                            </div>
                        </div>
                        <button onClick={() => ConFirmEdit(UpdateShelf)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={() => cancleEdit()}
                        >
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
                                การจัดการชั้นวางสินค้า
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
                                    <button onClick={() => add_click()} className="w-24 border rounded-lg bg-yellow-300">
                                        เพิ่ม
                                    </button>
                                </div>
                            </div>
                            <br></br>
                            <table className="table-auto w-full text-left">
                                <thead className="bg-blue-600">
                                    <tr className="text-white">
                                        <th className="px-4 py-2 w-1/12 text-center">#</th>
                                        <th className="px-4 py-2 w-2/12 text-center">Shelf Name</th>
                                        <th className="px-4 py-2 w-2/12 text-center">Lock Name</th>
                                        <th className="px-4 py-2 w-2/12 text-center">Zone Name</th>
                                        <th className="px-4 py-2 w-2/12 text-center">Floor Name</th>
                                        <th className="px-4 py-2 w-1/12 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((item, index) => (
                                        <tr className="border-b bg-gray-50" key={item.shelf_id}>
                                            <td className="px-4 py-2 flex justify-center">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-4 py-2 text-center">{item.shelf_name}</td>
                                            <td className="px-4 py-2 text-center">{item.lock_name}</td>
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
                        <h2 className="text-lg font-bold mb-2">
                            ชื่อล็อค: {" " + selectedItem.lock_name}
                        </h2>
                        <h2 className="text-lg font-bold mb-2">
                            ชื่อเชลฟ์: {" " + selectedItem.shelf_name}
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

export default shelf