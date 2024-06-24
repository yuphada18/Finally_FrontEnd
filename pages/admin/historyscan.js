import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar2 from "@/components/Sidebar2";
import { GetFeatureData } from '../api/getfeature';
import { CallSearchProduct } from '../api/product_api';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetHistoryData } from '../api/history_api';
import Swal from 'sweetalert2';
function lock() {
    const router = useRouter();
    const [menus, setmenus] = useState([{}])
    const [entity, setentity] = useState(5);
    const [searchValue, setsearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageSize, setPageSize] = useState(20);
    const [pageIndex, setPageIndex] = useState(0);
    const [ViewModal, setViewModal] = useState(false);
    const [SDate, setSDate] = useState(new Date());
    const [data, setdata] = useState([
        {
            "data_scan_id": 1,
            "data_scan_time": "2022-03-01 09:30:00",
            "product_id": 1,
            "tablet_id": 1,
            "user_id": 1,
            "product_name": "Product A"
        },
        {
            "data_scan_id": 2,
            "data_scan_time": "2022-03-01 12:45:00",
            "product_id": 1,
            "tablet_id": 2,
            "user_id": 1,
            "product_name": "Product A"
        },
        {
            "data_scan_id": 3,
            "data_scan_time": "2022-03-01 15:20:00",
            "product_id": 1,
            "tablet_id": 3,
            "user_id": 2,
            "product_name": "Product A"
        }
    ]
    )
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(pageSize);
    const [pageCount, setPageCount] = useState(1);
    const [pageIndices, setPageIndices] = useState([]);
    const [startButtonIndex, setStartButtonIndex] = useState(0);
    const [endButtonIndex, setEndButtonIndex] = useState(2);
    const [pageData, setPageData] = useState([]);
    const [PageSlide, setPageSlide] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([
        { value: "none", label: "Empty" },
    ]);
    const [DateStr, setDateStr] = useState("")
    const [options, setoptions] = useState([])
    const [PdId, setPdId] = useState()
    useEffect(() => {
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;
        const pageData = data.length > 0 && data.slice(startIndex, endIndex);
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
        //get_lock_data();
        return () => {
        }
    }, [])
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
    const handlePrevClick = () => {
        setPageIndex((prevPageIndex) => prevPageIndex - 1);
    };

    const handleNextClick = () => {
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
    };

    const handlePageClick = (index) => {
        setPageIndex(index);
    };
    const handleTypeSelect = (selectedOption) => {
        console.log("Selected Option:", selectedOption.valuevalue);
        setPdId(selectedOption.valuevalue)

    };
    const handleInputChange = (inputValue) => {
        if (inputValue.length > 2) {
            GetSearch(inputValue)
        }
        else {
            setoptions([])
        }
    };
    const handlechangStartdateNew = (date) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toISOString().substring(0, 10);
        console.log(formattedDate)
        setSDate(date)
        setDateStr(formattedDate)
    }

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
    const GetHistory = async () => {
        if (DateStr == "" || PdId == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                timer: 3000
            })
        }
        else {
            let data = await GetHistoryData(PdId, DateStr)
            if (data) {
                if (data.length < 1) {
                    alert("ไม่พบข้อมูลการแสกนในวันนั้น")
                    setSelectedOptions({ value: "none", label: "Empty" })
                    return
                }
                setdata(data)
                setSelectedOptions({ value: "none", label: "Empty" })
            }
        }
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
                                ประวัติการแสกนสินค้า
                            </div>
                            <br></br>
                            <div class="my-2 flex sm:flex-row flex-col">
                                <div class="flex flex-row mb-1 sm:mb-0">
                                    <div class="relative w-24 ">
                                        <DatePicker className='flex text-center h-9 border rounded-lg text-2xl '
                                            selected={SDate}
                                            onChange={date => handlechangStartdateNew(date)}
                                        />
                                    </div>

                                </div>

                                <div className="w-full h-10 flex justify-end">
                                    <Select className="w-1/3 h-10"
                                        options={options}
                                        onChange={(e) => handleTypeSelect(e)}
                                        onInputChange={handleInputChange}
                                        label="Single select"
                                    />
                                    <button onClick={() => GetHistory()} className="w-24 border rounded-lg bg-yellow-300">
                                        ค้นหา
                                    </button>
                                </div>
                            </div>
                            <br></br>
                            <table className="table-auto w-full text-left">
                                <thead className="bg-blue-600">
                                    <tr className="text-white">
                                        <th className="px-4 py-2 w-1/4 text-center">#</th>
                                        <th className="px-4 py-2 w-2/4 text-center">ชื่อกลุ่มสินค้า</th>
                                        <th className="px-4 py-2 w-4/4 text-center">เวลาแสกนสินค้า</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((item, index) => (
                                        <tr className="border-b bg-gray-50" key={item.data_scan_id}>
                                            <td className="px-4 py-2 flex justify-center">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-4 py-2 text-center">{item.product_name}</td>
                                            <td className="px-4 py-2 text-center">{item.data_scan_time}</td>
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
        </div>

    );
}

export default lock