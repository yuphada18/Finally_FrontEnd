import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar2 from "@/components/Sidebar2";
import { GetFeatureData } from '../api/getfeature';
import { DeleteAdvert, GetAdvert, InsertAdvert, UpdateAdvert } from '../api/advert_api';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { url } from '@/config';
import { CallSearchProduct } from '../api/product_api';
function lock() {
    const router = useRouter();
    const [menus, setmenus] = useState([{}])
    const [entity, setentity] = useState(5);
    const [searchValue, setsearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [ViewModal, setViewModal] = useState(false);
    const [data, setdata] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(pageSize);
    const [pageCount, setPageCount] = useState(1);
    const [pageIndices, setPageIndices] = useState([]);
    const [startButtonIndex, setStartButtonIndex] = useState(0);
    const [endButtonIndex, setEndButtonIndex] = useState(2);
    const [pageData, setPageData] = useState([]);
    const [PageSlide, setPageSlide] = useState([])
    const [AddModal, setAddModal] = useState(false);
    const [RF, setRF] = useState(true)
    ///////////////////////////////////////////////////////////////////////////////
    const [EditModal, setEditModal] = useState(false)
    const [selectedOptionsEdit, setSelectedOptionsEdit] = useState([
        { value: "none", label: "Empty" },
    ]);
    const [selectedOptions, setSelectedOptions] = useState([
        { value: "none", label: "Empty" },
    ]);
    const [options, setoptions] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const [fileName, setfileName] = useState('')
    const [AdvertUpdate, setAdvertUpdate] = useState({
        "advert_id": "",
        "advert_name": "",
        "advert_description": "",
        "advert_start_date": "",
        "advert_end_date": "",
        "products": []
    })
    const [AdvertNew, setAdvertNew] = useState({
        "advert_name": "",
        "advert_description": "",
        "advert_start_date": "",
        "advert_end_date": "",
        "products": []
    })
    const handlechangStartdate = (date) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toISOString().substring(0, 10);
        setStartDate(date)
        AdvertUpdate["advert_start_date"] = formattedDate
        setAdvertUpdate({ ...AdvertUpdate })
    }
    const handlechangEnddate = (date) => {
        console.log(date)
        const dateObject = new Date(date);
        const formattedDate = dateObject.toISOString().substring(0, 10);
        setEndDate(date)
        AdvertUpdate["advert_end_date"] = formattedDate
        setAdvertUpdate({ ...AdvertUpdate })
    }
    const handleUpdateAdvert = (val, event) => {
        AdvertUpdate[val] = event.target.value
        setAdvertUpdate({ ...AdvertUpdate })
    };
    const handleFileEditChange = async (event) => {
        let file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(url + '/upload/image/advert', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log(data.filename);
        AdvertUpdate["advert_picture"] = data.filename
        setAdvertUpdate({ ...AdvertUpdate })
    };
    const handleTypeSelectEdit = (index, selectedOption) => {
        console.log("Selected Option:", selectedOption.valuevalue);
        const newSelectedOptions = [...selectedOptionsEdit];
        newSelectedOptions[index] = selectedOption;
        setSelectedOptionsEdit(newSelectedOptions);
        const newProductIds = [...AdvertUpdate.products];
        newProductIds[index] = { product_id: selectedOption.valuevalue }
        setAdvertUpdate({ ...AdvertUpdate, products: newProductIds });
        console.log("Updated selected options:", newSelectedOptions);
    };
    const redate = ()=>{
        setStartDate(new Date())
        setEndDate(new Date())
    }
    const handleInputChange = (inputValue) => {
        if (inputValue.length > 2) {
            GetSearch(inputValue)
        }
        else {
            setoptions([])
        }
    };
    const add_click = () => {
        setAddModal(!AddModal);
    };

    const GetSearch = async (search) => {
        let searchproduct = await CallSearchProduct(search)
        if (searchproduct) {
            console.log(searchproduct)
            const optionsdata = searchproduct.map((item) => ({
                valuevalue: item.product_id,
                label: item.product_name
            }));
            setoptions(optionsdata)
        }
    }
    const handleDeleteSelectEdit = (index) => {
        const newSelectedOptions = [...selectedOptionsEdit];
        newSelectedOptions.splice(index, 1);
        setSelectedOptionsEdit(newSelectedOptions);
        const newProductIds = [...AdvertUpdate.products];
        newProductIds.splice(index, 1);
        setAdvertUpdate({ ...AdvertUpdate, products: newProductIds });

    };
    const handleAddSelectEdit = () => {
        setSelectedOptionsEdit([...selectedOptionsEdit, { value: "none", label: "Empty" }]);
    };
    const handleConfirmEdit = async () => {
        console.log(AdvertUpdate)
        Swal.fire({
            title: 'Do you want to Edit this Floor?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let confirm_edit = await UpdateAdvert(AdvertUpdate)
                console.log(confirm_edit)
                if (confirm_edit) {
                    Swal.fire('Saved!', '', 'success')
                    GetAdvertData();
                    redate()
                    setEditModal(!EditModal);
                }
                else{
                    Swal.fire('Error!', '', 'fail')

                }
            }
        })
      
    }
    const cancleEdit = () => {
        setAdvertUpdate({})
        setEditModal(!EditModal)
    }
    ////***////ADDMODAL///// */


    const handlechangStartdateNew = (date) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toISOString().substring(0, 10);
        setStartDate(date)
        AdvertNew["advert_start_date"] = formattedDate
        setAdvertNew({ ...AdvertNew })
    }

    const handlechangEnddateNew = (date) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toISOString().substring(0, 10);
        setEndDate(date)
        AdvertNew["advert_end_date"] = formattedDate
        setAdvertNew({ ...AdvertNew })
    }
    const handleNewAdvert = (val, event) => {
        AdvertNew[val] = event.target.value
        setAdvertNew({ ...AdvertNew })
    };
    const handleFileNewChange = async (event) => {
        let file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(url + '/upload/image/promotion', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log(data.filename);
        AdvertNew["advert_picture"] = data.filename
        setAdvertNew({ ...AdvertNew })
    };
    const handleClickNew = (item) => {
        console.log("Item", item);
        let lenproduct = item.products.length
        if(lenproduct==0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณาใส่รายการสินค้าในโฆษณา',
                timer: 3000
            })
            return
        }
        if(item.advert_name==''||item.advert_description==''||item.advert_picture==''
        || item.advert_start_date==''||item.advert_end_date==''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณาใส่ข้อมูลให้ครบถ้วน',
                timer: 3000
            })
            return
        }
        console.log("testtttttttt")
        Swal.fire({
            title: 'Do you want to add this Advert?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let newpromotion = await InsertAdvert(item)
                if (newpromotion) {
                    Swal.fire('Saved!', '', 'success')
                    setAddModal(!AddModal);
                    GetAdvertData();
                    setAdvertNew({
                        "advert_name": "",
                        "advert_description": "",
                        "advert_start_date": "",
                        "advert_end_date": "",
                        "products": []
                    })
                    setSelectedOptions([
                        { value: "none", label: "Empty" },
                    ])
                    redate()
                }
            }
        })
        
      };
    
      const cancleAdd = () => {
        setAdvertNew({})
        setAddModal(!AddModal)
        setSelectedItem([
            { value: "none", label: "Empty" },
          ])
    }
    const handleAddSelect = () => {
        setSelectedOptions([...selectedOptions, { value: "none", label: "Empty" }]);
      };
      const handleDeleteSelect = (index) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions.splice(index, 1);
        setSelectedOptions(newSelectedOptions);


        const newProductIds = [...AdvertNew.products];
        newProductIds.splice(index, 1);
        setAdvertNew({ ...AdvertNew, products: newProductIds });

      };
      const handleTypeSelect = (index, selectedOption) => {
        console.log("Selected Option:", selectedOption.valuevalue);
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = selectedOption;
        setSelectedOptions(newSelectedOptions);
        const newProductIds = [...AdvertNew.products];
        newProductIds[index] = { product_id: selectedOption.valuevalue }
        setAdvertNew({ ...AdvertNew, products: newProductIds });
      };
     
    //////////////////////////////////////////////////////////////////////////////

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

    useEffect(() => {
        on_load();
        GetAdvertData()
        //get_lock_data();
        return () => {
        }
    }, [])
    useEffect(() => {
        GetAdvertData()
    
    }, [RF])
    
    const GetAdvertData = async () => {
        let advertData = await GetAdvert()
        if (advertData) {
            console.log(advertData)
            setdata(advertData)
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
    const search = async (e) => {
        setsearchValue(e.target.value)
        let check = [];
        let search = [];
        let event = e.target.value.toUpperCase();
        let advert = await GetAdvert()
        check = advert
        if (advert) {
            var matches = check.filter(function (x) {
                return x.advert_name?.toUpperCase().includes(event)
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
    const handleViewClick = (item) => {
        setSelectedItem(item);
        setViewModal(!ViewModal)

    };
    const handleEditClick = (item) => {
        setSelectedItem(item);
        console.log(item)
        const val = []
        let pdpm = []
        for (let x = 0; x < item.products.length; x++) {
            val.push({ value: item.products[x].product_id, label: item.products[x].product_name })
            pdpm.push({ "product_id": item.products[x].product_id })
        }
        console.log(val)
        setStartDate(new Date(item.advert_start_date))
        setEndDate(new Date(item.advert_end_date))
        const updateitem = {
            "advert_id": item.advert_id,
            "advert_name": item.advert_name,
            "advert_description": item.advert_description,
            "advert_picture": item.advert_picture,
            "advert_start_date": item.advert_start_date,
            "advert_end_date": item.advert_end_date,
            "products": pdpm
        }
        setAdvertUpdate(updateitem)
        setSelectedOptionsEdit(val)
        setEditModal(!EditModal)
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        on_delete(item)
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
        handlePageClick(0)
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
    const on_delete = (i) => {
        console.log(i)
        let delete_id = i.advert_id
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to Delete this Advert!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
            if (result.isConfirmed) {
                let conf_del = await DeleteAdvert(delete_id)
                if (conf_del) {
                    Swal.fire(
                        'Deleted!',
                        'Advert has been deleted.',
                        'success'
                    )
                }
            }
            setRF(!RF)
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
                                การจัดการโฆษณา
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
                                        onChange={(e) =>search(e)}
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
                                        <th className="px-4 py-2 w-2/3 text-center">ชื่อโฆษณา</th>
                                        <th className="px-4 py-2 w-3/3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((item, index) => (
                                        <tr className="border-b bg-gray-50" key={item.advert_id}>
                                            <td className="px-4 py-2 flex justify-center">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-4 py-2 text-center">{item.advert_name}</td>
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
                            ชื่อโฆษณา: {" " + selectedItem.advert_name}
                        </h2>
                        <h2 className="text-lg font-bold mb-2">
                            รายละเอียดโฆษณา: {" " + selectedItem.advert_description}
                        </h2>
                        <h2 className="text-lg font-bold mb-2">
                            วันที่เริ่มโฆษณา: {" " + selectedItem.advert_start_date}
                        </h2>
                        <h2 className="text-lg font-bold mb-2">
                            วันที่สิ้นสุดโฆษณา: {" " + selectedItem.advert_end_date}
                        </h2>
                        {selectedItem.products.map((item, index) => (
                            <h2 className="text-lg font-bold mb-2">
                                สินค้าที่ร่วมรายการ {index + 1}: {" " + item.product_name}
                            </h2>
                        ))}

                        {/* <h2 className="text-lg font-bold mb-2">
                            ชื่อโซน: {" "+selectedItem.zone_name}
                        </h2>
                        <h2 className="text-lg font-bold mb-2">
                            ชื่อล็อค: {" "+selectedItem.lock_name} 
                        </h2> */}
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
                <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 overflow-y-auto">
                    <div className="w-4/12 h-auto mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg overflow-y-auto">
                        <div className='flex flex-row'>
                            <div className='flex flex-col items-center'>
                                <label className='text-lg'>วันที่เริ่มโฆษณา</label>
                                <DatePicker className='flex text-center'
                                    selected={startDate}
                                    onChange={date => handlechangStartdate(date)}
                                />
                            </div>
                            <div className='ml-10 flex flex-col items-center'>
                                <label className='text-lg'>วันที่สิ้นสุดโฆษณา</label>
                                <DatePicker className='flex text-center'
                                    selected={EndDate}

                                    onChange={date => handlechangEnddate(date)}
                                />
                            </div>
                        </div>
                        <div className='w-full h-auto'>
                            <div className='flex flex-row items-start mt-2 h-5'>
                                <label className='text-lg w-28'>ชื่อโฆษณา:</label>
                                <input onChange={(e) => handleUpdateAdvert("advert_name", e)} type="text" className=" border rounded border-black mt-0  w-64 pl-2" value={AdvertUpdate.advert_name} />
                            </div>
                            <div className='flex flex-row items-start mt-2'>
                                <label className='text-lg '>รายละเอียดโฆษณา:</label>
                                <textarea onChange={(e) => handleUpdateAdvert("advert_description", e)}
                                    className=" border rounded border-black mt-0 w-64 h-10 pl-2"
                                    value={AdvertUpdate.advert_description}
                                    rows={2}
                                    cols={10}
                                />
                            </div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                Choose a file
                            </label>
                            <div className="mt-1">
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={handleFileEditChange}
                                />
                            </div>
                        </div>
                        {selectedOptionsEdit.map((selectedOption, index) => (
                            <div className="flex flex-row " key={index}>
                                <Select className="w-2/3 my-2"
                                    options={options}
                                    onChange={(e) => handleTypeSelectEdit(index, e)}
                                    value={selectedOption}
                                    onInputChange={handleInputChange}
                                    label="Single select"
                                />
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  h-9 w-20 rounded my-2 ml-2"
                                    onClick={() => handleDeleteSelectEdit(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                            onClick={handleAddSelectEdit}
                        >
                            Add Product
                        </button>
                        <button onClick={() => handleConfirmEdit()}
                            className="bg-green-500 hover:bg-green-700 text-whitefont-bold py-2 px-4 rounded my-2"
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2"
                            onClick={() => cancleEdit()}
                        >
                            Canclel
                        </button>
                    </div>
                </div>
            )}
            {AddModal && (
                <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 overflow-y-auto">
                    <div className="w-4/12 h-auto mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg overflow-y-auto">
                        <div className='flex flex-row'>
                            <div className='flex flex-col items-center'>
                                <label className='text-lg'>วันที่เริ่มโฆษณา</label>
                                <DatePicker className='flex text-center'
                                    selected={startDate}
                                    onChange={date => handlechangStartdateNew(date)}
                                />
                            </div>
                            <div className='ml-10 flex flex-col items-center'>
                                <label className='text-lg'>วันที่สิ้นสุดโฆษณา</label>
                                <DatePicker className='flex text-center'
                                    selected={EndDate}
                                    onChange={date => handlechangEnddateNew(date)}
                                />
                            </div>
                        </div>
                        <div className='w-full h-auto'>
                            <div className='flex flex-row items-start mt-2 h-5'>
                                <label className='text-lg w-28'>ชื่อโฆษณา:</label>
                                <input onChange={(e) => handleNewAdvert("advert_name", e)} type="text" className=" border rounded border-black mt-0  w-64 pl-2" value={AdvertNew.advert_name} />
                            </div>
                            <div className='flex flex-row items-start mt-2'>
                                <label className='text-lg '>รายละเอียดโฆษณา:</label>
                                <textarea onChange={(e) => handleNewAdvert("advert_description", e)}
                                    className=" border rounded border-black mt-0 w-64 h-10 pl-2"
                                    value={AdvertNew.advert_description}
                                    rows={2}
                                    cols={10}
                                />
                            </div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                Choose a file
                            </label>
                            <div className="mt-1">
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={handleFileNewChange}
                                />
                            </div>
                        </div>
                        {selectedOptions.map((selectedOption, index) => (
                            <div className="flex flex-row " key={index}>
                                <Select className="w-2/3 my-2"
                                    options={options}
                                    onChange={(e) => handleTypeSelect(index, e)}
                                    value={selectedOption}
                                    onInputChange={handleInputChange}
                                    label="Single select"
                                />
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  h-9 w-20 rounded my-2 ml-2"
                                    onClick={() => handleDeleteSelect(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                            onClick={handleAddSelect}
                        >
                            Add Product
                        </button>
                        <button onClick={() => handleClickNew(AdvertNew)}
                            className="bg-green-500 hover:bg-green-700 text-whitefont-bold py-2 px-4 rounded my-2"
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2"
                            onClick={() => cancleAdd()}
                        >
                            Canclel
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default lock