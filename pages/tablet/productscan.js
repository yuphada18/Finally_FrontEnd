import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, FaCog, FaSadCry } from "react-icons/fa";
import ViewShowplan from "@/components/Viewplan";
import { Product_Barcode } from "../api/prodct_scan_api";
import { url } from "@/config";
import Quagga from 'quagga';
import { useRouter } from "next/router";
import { PerMisCheck } from "../api/barcode_login";
import Swal from "sweetalert2";
import QRCodeScanner from '@/components/Scanqrcode';
import { BrowserBarcodeReader, NotFoundException } from '@zxing/library';
// import BarcodeScanner from '@/components/Scanbarcode';
import BarcodeScanner from "../testbarcode";
import { callApiLogin } from "../api/calllogin";
import { RandomGetAdvert } from "../api/advert_api";

function productscan() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const [startModal, setstartModal] = useState(true);
  const [scanModal, setscanModal] = useState(false);
  const [pinX, setPinX] = useState(50);
  const [pinY, setPinY] = useState(50);
  // const [showModalViewPosition, setshowModalViewPosition] = useState(false);
  const [ScanProduct, setScanProduct] = useState({})
  const [showModalViewPlan, setshowModalViewPlan] = useState(false);
  const [AdminStatus, setAdminStatus] = useState(true)
  const [count, setCount] = useState(0);
  const router = useRouter();
  const [isNotMac, setisNotMac] = useState(false)
  const [ModalAdvert, setModalAdvert] = useState(false)
  const [setInputMac, setInputMacsetInputMac] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tablet_macid') || '';
    }
    return '';
  });
  const [showModalMacEdit, setShowModalMacEdit] = useState(false);
  const inputRefEditMac = useRef(null);
  const [BarcodeLast, setBarcodeLast] = useState('')
  const [ImageAdvert, setImageAdvert] = useState("")
  ////////////////////////////////////////////////////////////
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);
  const codeReader = new BrowserBarcodeReader();
  const [showModal, setshowModal] = useState(false)
  const [FloorImage, setFloorImage] = useState()
  //////////////////////////////////////////////////////////
  useEffect(() => {
    let timeoutId;
    if (scanning && videoRef.current) {
      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
        if (result) {
          console.log(result.text)
          test(result.text)
          setshowModal(false)
          setScanning(false);
          timeoutId = setTimeout(() => {
            codeReader.reset();
            codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
              if (error && !(error instanceof NotFoundException)) {
                console.error(error);
              }
            });
          }, 500);
        } else if (error && !(error instanceof NotFoundException)) {
          console.error(error);
        }
      });
    } else {
      codeReader.reset();
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      codeReader.reset();
      clearTimeout(timeoutId);
    };
  }, [scanning]);
  const handleStartScan = () => {
    setshowModal(true)
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 } } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setScanning(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleStopScan = () => {
    setshowModal(false)
    setScanning(false);
  };
  const RandomAdver = async()=>{
    let advertrandom = await RandomGetAdvert()
    if(advertrandom){
      setImageAdvert(advertrandom.advert_picture)
      console.log(advertrandom)
    }
  }
  //////////////////////////////////////////////////////////
  useEffect(() => {
    let mac_id = localStorage.getItem('tablet_macid');
    localStorage.setItem('lastbarcode', '');
    if (mac_id === undefined || mac_id === null) {
      console.log("Noooooooooooooo")
      setisNotMac(true)
    }
    else {
      handleSlideEnd()
    }
    return () => {

    }
  }, [showModalMacEdit])

  const handleSlideEnd = (index) => {
    setCount(0)
    console.log("Slide ended at index:", index);
    if (!showModalMacEdit) {
      inputRef.current.focus();
    }
    else {
      inputRefEditMac.current.focus()
    }
  };

  const handleSlideEnd2 = (index) => {
    setCount(0)
    console.log("Slide ended at index:", index);
    if (!showModalMacEdit) {
      inputRef.current.focus();
    }
    else {
      inputRefEditMac.current.focus()
    }
  };

  const handleSaveMacClick = () => {
    setCount(0)
    localStorage.setItem('tablet_macid', setInputMac);
    setShowModalMacEdit(false);
    Swal.fire({
      icon: 'success',
      title: 'Tablet MAC ID saved successfully!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(count)
      if (count == 60) {
        RandomAdver()
        setModalAdvert(true)
      }
      if (count == 1800) {
        LogOut()
      }
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count]);
  ////////////////////////////////////////////////////////VIdeo////////////////////////////////////
  useEffect(() => {
    on_load();
    CheckPermisEdit();
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const on_load = () => {
    let user = localStorage.getItem("user_id")
    if (!user) {
      router.push('/tablet')
    }
  }
  const CheckPermisEdit = async () => {
    let status = await PerMisCheck()
    console.log("Status", status)
    if (status) {
      setAdminStatus(true)
    }
    else {
      setAdminStatus(false)
    }

  }
  const inputRef = useRef();
  const closeModal = () => {
    setshowModalViewPlan(!showModalViewPlan);
  };
  const ToggleModalViewPosition = () => {
    console.log(ScanProduct.data)
    setshowModalViewPlan(!showModalViewPlan);
  };


  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const LogOut = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem('refresh_status')
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'LogOut Success',
      showConfirmButton: false,
      timer: 1500
    })

    router.push("/tablet")
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div style={{ margin: "0px 0px -210px 0px", zIndex: 1 }}>
        <ul> {dots} </ul>
      </div>
    ),
    afterChange: (index) => {
      setCurrentSlide2(index);
      handleSlideEnd2(index);
    },
  };
  const nameImage2 = (i) => {
    console.log(images2[i])
  }
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows:false,
    appendDots: (dots) => <div style={{ bottom: -10 }}>{dots}</div>,
    afterChange: (index) => {
      setCurrentSlide(index);
      handleSlideEnd(index);
    },
   
  };
  const images = [
    "/image/slide1.png",
    "/image/slide1.png",
    "/image/slide1.png",
    "/image/slide1.png",
    "/image/slide1.png",
    "/image/slide1.png",
    "/image/slide1.png",
  ];
  const images2 = [
    "/image/slide2.png",
    "/image/slide2.png",
    "/image/slide2.png",
    "/image/slide2.png",
    "/image/slide2.png",
    "/image/slide2.png",
    "/image/slide2.png",
  ];
  const [inputValue, setInputValue] = useState("");
  const [lastScan, setLastScan] = useState("");
  let lastdatascan = "";
let barcodeTimeoutId = null;

const test = async (data) => {
  // let lastdata = localStorage.getItem('lastbarcode');
  // if (data === lastdata) {
  //   console.log("ซ้ำ")
  //   return;
  // }
  let mac_id = localStorage.getItem("tablet_macid");
  localStorage.setItem('lastbarcode',data);
  setCount(0);

  if (mac_id === undefined || mac_id === null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This Tablet Not Register Contact Admin",
    });
    return;
  }

  if (barcodeTimeoutId) {
    clearTimeout(barcodeTimeoutId);
  }

  barcodeTimeoutId = setTimeout(async () => {
    let pd_data = await Product_Barcode(data);
    if (pd_data) {
      console.log(pd_data)
      setscanModal(true);
      setstartModal(false);
      setScanProduct(pd_data);
      setPinX(pd_data.data.product_location_x);
      setPinY(pd_data.data.product_location_y);
      setFloorImage(pd_data.data.floor_image)
      setInputValue("");
    }
  }, 1000);
};
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      test(inputValue);
    }
  };
  const changModal = () => {
    setstartModal(!startModal);
    setscanModal(!scanModal);
  };
  ///////////////////////////////////////////QRCODEMODAL////////////////////////////////
  const [showModalQRCode, setShowModalQRCode] = useState(false);
  const handleCloseModalQRCode = () => {
    setShowModalQRCode(false);
  };
  const handleQRCodeDetected = (data) => {
    console.log('QR code detected:', data);
    test(data)
    // Do something with the detected QR code data
  };
  ////////////////////////////////////////////BarcodeModal/////////////////////////////
  const [detectedBarcode, setDetectedBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Barcode, setBarcode] = useState("")
  const handleStartClick = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "user", // use front camera for mobile devices
          },
        },
        decoder: {
          readers: ["code_128_reader"], // list of active readers
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Quagga initialization finished.");
        Quagga.start();
        setIsScanning(true);
      }
    );
  };

  const handleStopClick = () => {
    Quagga.stop();
    setIsScanning(false);
  };
  let lastScannedBarcode = ""
  Quagga.onDetected((data) => {
    let lastdata = localStorage.getItem('lastbarcode');
    if (data.codeResult.code === lastdata) {
      console.log("ซ้ำ")
      setIsScanning(false);
      Quagga.offDetected()
      Quagga.stop();
      console.log(data.codeResult.code)
      setBarcode(data.codeResult.code)
      setLastScan(data.codeResult.code);
      return;
  }
      localStorage.setItem('lastbarcode',data.codeResult.code);
      setIsScanning(false);
      Quagga.offDetected()
      Quagga.stop();
      console.log(data.codeResult.code)
      setBarcode(data.codeResult.code)
      test(data.codeResult.code)
      setLastScan(data.codeResult.code);
  });
  return (
    <div
      className="w-full h-screen  bg-gray-100 overflow-y-hidden"
      onClick={() => handleSlideEnd()}
    >
      {ModalAdvert && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 z-10">
          <div className="w-full h-full m-auto  bg-white p-10 bg-opacity-0  flex justify-center items-center">
            <img
              src={url+"/image/advert/"+ImageAdvert}
              alt="Advertisement"
              className="w-11/12 h-5/6"
            />
            <div className="fixed top-4 right-10"> <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setModalAdvert(false)}
            >

              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button></div>

          </div>
        </div>
      )}
      {showModalMacEdit && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Enter Tablet MAC ID</h2>
                <input type="text" value={setInputMac} onChange={e => setInputMacsetInputMac(e.target.value)} className="border border-gray-300 p-2 rounded-md w-full" ref={inputRefEditMac} autoFocus />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSaveMacClick} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button onClick={() => setShowModalMacEdit(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalViewPlan && (
        <ViewShowplan
          x={pinX}
          y={pinY}
          onClose={closeModal}
          ImgPosition={ScanProduct.data.product_position_picture}
          floorpicture={"/image/floor/"+FloorImage}
        />
      )}
      <div className="flex flex-row w-full h-5/6">
      <div className={` fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-gray-900 bg-opacity-75 ${!isScanning ? 'hidden' : ''}`}>
                <div className="bg-gray-100 p-12  shadow-lg w-1/4 h-4/12 border-2 border-sky-600 rounded-3xl md:w-1/3 h-[450px]">
                    <label className=" text-gray-700 font-medium text-2xl mb-4 flex justify-center">
                        Scan Your Barcode
                    </label>
                    <div className="flex justify-center mx-auto max-w-[230px] h-64 mt-4 border-2 border-sky-600 rounded-3xl md:h-52">
                        <div id="interactive"
                            className="viewport max-w-[230px] h-64 mt-6 md:w-52">
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-red-500 hover:bg-red-700 w-full h-full text-white font-bold py-2 px-4 rounded-lg mr-2"
                            onClick={handleStopClick}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        <div>
          <QRCodeScanner showModal={showModalQRCode} onCloseModal={handleCloseModalQRCode} onQRCodeDetected={handleQRCodeDetected} />
          {/* <BarcodeScanner showModal={showModalBarcode} onBarcodeDetected={handleBarcodeDetected} /> */}
        </div>
        {startModal && (
          <div className="w-1/2 h-full">
            <div className="h-full w-full">
              <div className="h-full w-full flex items-center flex-col">
                <div class=" bg-sky-500 mt-10 h-10 w-5/6 p-4 rounded-t-[2rem] "></div>
                <div class="mt-0 h-full w-5/6 p-4 bg-gray-50 shadow-md ">
                  <div className="w-full flex justify-center">
                    <label className="mt-5 text-2xl">Scan</label>
                  </div>
                  <div className="w-full h-full">
                    <div className="w-full h-3/4 mt-5 flex justify-center">
                      <div
                        className="flex items-center justify-center mt-0 h-full w-5/6 p-4 border-2 border-sky-500 shadow-md rounded-lg"
                        style={{ overflow: "hidden" }}
                      >
                        <img src="/image/waitscan.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {scanModal && (
          <div className="w-1/2 h-full">
            <div className="h-full w-full">
              <div className="h-full md:h-10/12 w-full flex items-center flex-col">
                <div class=" bg-sky-500 mt-10 h-10 w-5/6 p-4 rounded-t-[2rem] "></div>
                <div class="mt-0 h-full md:h-8/12 w-5/6 p-4 bg-gray-50 shadow-md flex flex-col ">
                  <div className="w-full flex justify-center">
                    <label className="mt-5 text-2xl">Scan</label>
                  </div>
                  <div className="w-full h-6/12">
                    <div className="">
                      <div className="w-full h-full mt-5 flex justify-center">
                        <div
                          className="flex items-center justify-center mt-0 h-full md:h-2/3 w-5/6 border-2 border-sky-500 shadow-md rounded-lg"
                          style={{ overflow: "hidden" }}
                        >
                          <img
                            src={url + '/image/product/' + ScanProduct.data.product_picture}
                            style={{ width: "300px", height: "300px" }}
                          />
                        </div>
                      </div>
                      <div className="w-full h-48 flex justify-start  mt-4 flex-col">
                        <div className="w-full flex flex-row">
                          <label className="font-bold text-3xl md:text-xl ml-2">
                            ประเภทสินค้า :
                          </label>
                          <label className="text-3xl md:text-xl ml-2">{ScanProduct.data.product_sub_group_name}</label>
                        </div>
                        <div className="w-full flex flex-row mt-2">
                          <label className="font-bold text-3xl md:text-xl ml-2">
                            ชื่อสินค้า :
                          </label>
                          <label className="text-3xl md:text-xl ml-2">{ScanProduct.data.product_name}</label>
                        </div>
                        <div className="w-full flex flex-row mt-2 md:text-xl">
                          <label className="font-bold text-3xl md:text-xl ml-2">
                            ราคาสินค้า :
                          </label>
                          <label className="text-3x md:text-xll ml-2">{ScanProduct.data.product_price}฿</label>
                        </div>
                        <div className="w-full h-auto flex justify-center   mt-4">
                          <div className="w-2/3 h-2/5 flex flex-row justify-center">
                            ฺ
                            <button
                              onClick={() => ToggleModalViewPosition()}
                              className="bg-gray-300 rounded-lg font-bold text-xl w-1/3 md:w-full h-12 "
                            >
                              ที่ตั้งสินค้า
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-1/2 h-full">

          <div className="h-full w-full flex items-center flex-col">
            <div className="bg-sky-500 mt-10 h-10 w-5/6 p-4 rounded-t-[2rem]"></div>
            <div className="mt-0 h-full w-5/6 p-4 bg-gray-50 shadow-md">
              <div className="w-full flex justify-center">
                <label className="mt-5 text-2xl">สินค้าแนะนำ</label>
              </div>
              <div className="w-full h-auto">
                <div className="w-full h-3/4 mt-8 flex justify-center">
                  <div
                    className="mt-0 h-6/6 w-5/6 p-4 border-2 border-sky-500 shadow-md rounded-lg"
                    style={{ overflow: "hidden" }}
                  >
                    <Slider {...settings} className="w-full h-1/3 flex">
                      {images.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            className ="w-[650px] md:w[300] h-[320px] md:h-[200px] "
                         />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="w-full h-56 md:h-48 mt-2 flex flex-row border-2 border-sky-600">
                <Slider {...settings2} className="w-full h-4/6 md:h-2/6 mt-10 md:mt-4 ">
                  {images2.map((image, index) => (
                    <div key={index} className="w-1/3 h-4/6 px-2 ml-6  ">
                      <img onClick={() => nameImage2(index)}
                        className="border-2 w-[200px] md:w-[150px] h-[130px] md:h-[150px] border-sky-500 rounded-lg"
                        src={image}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto mt-6 flex flex-col items-center">
        <div class="box-content h-10 w-1/3 md:w-2/3 p-4 border-4 ... flex flex-row items-center justify-center mt-4">
          <div className="w-1/2 flex justify-center">
            <button onClick={() => setShowModalQRCode(true)} className="w-44 text-white rounded-md font-bold h-14 bg-sky-500  ">
              ScanQRCode
            </button>
          </div>
          <div className="w-1/2 flex justify-center">
            <button onClick={() => LogOut()} className="w-44 text-white rounded-md font-bold h-14 bg-red-500  ">
              Logout
            </button>
          </div>
          <div className="w-1/2 flex justify-center">
            <button onClick={() => handleStartClick()} className="w-44 text-white rounded-md font-bold h-14 bg-sky-500   ">
              ScanBarcode
            </button>
          </div>
        </div>
        <div>
          {" "}
          <input
            class="focus:outline-none focus:border-gray-100 text-gray-100   bg-gray-100"
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {AdminStatus && (
            <div className="fixed bottom-4 right-4">
              <FaCog onClick={() => setShowModalMacEdit(true)} className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 w-10 h-10" />
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default productscan;
