import React, { useState } from "react";
import Select from "react-select";
import { CallSearchProduct } from "./api/product_api";


function ExampleModal() {
  const [selectedOptions, setSelectedOptions] = useState([
    { value: "none", label: "Empty" },
  ]);
  const mydata = [
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 10,
        "product_sub_group_name": "เสื้อแขนสั้น",
        "product_id": 4,
        "product_name": "เสื้อครอปแขนสั้นคอปก",
        "product_price": 150,
        "product_location_x": 50,
        "product_location_y": 86,
        "product_picture": "เสื้อครอปแขนสั้นคอปก.jpg",
        "product_description": "เสื้อครอปแขนสั้นคอปก",
        "product_barcode": "665544887788",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อครอปแขนสั้นคอปก_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 10,
        "product_sub_group_name": "เสื้อแขนสั้น",
        "product_id": 5,
        "product_name": "เสื้อครอปเชิ๊ต y2k",
        "product_price": 169,
        "product_location_x": 50,
        "product_location_y": 86,
        "product_picture": "เสื้อครอปเชิ๊ตy2k.jpg",
        "product_description": "เสื้อครอปเชิ๊ตy2k",
        "product_barcode": "996644336655",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อครอปเชิ๊ตy2k_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 10,
        "product_sub_group_name": "เสื้อแขนสั้น",
        "product_id": 6,
        "product_name": "เสื้อครอปโอเวอร์ไซส์",
        "product_price": 200,
        "product_location_x": 50,
        "product_location_y": 86,
        "product_picture": "เสื้อครอปโอเวอร์ไซส์.png",
        "product_description": "เสื้อครอปโอเวอร์ไซส์",
        "product_barcode": "555333888999",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อครอปโอเวอร์ไซส์_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 10,
        "product_sub_group_name": "เสื้อแขนสั้น",
        "product_id": 304,
        "product_name": "เสื้อยืดพิมพ์ลาย",
        "product_price": 180,
        "product_location_x": 60,
        "product_location_y": 40,
        "product_picture": "เสื้อยืดพิมพ์ลาย.png",
        "product_description": "เสื้อยืดพิมพ์ลาย",
        "product_barcode": "302687945211",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อยืดพิมพ์ลาย_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 10,
        "product_sub_group_name": "เสื้อแขนสั้น",
        "product_id": 305,
        "product_name": "เสื้อผ้าโปร่งลายแมว",
        "product_price": 180,
        "product_location_x": 60,
        "product_location_y": 40,
        "product_picture": "เสื้อผ้าโปร่งลายแมว.png",
        "product_description": "เสื้อผ้าโปร่งลายแมว",
        "product_barcode": "542369870000",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อผ้าโปร่งลายแมว_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 10,
        "product_sub_group_name": "เสื้อแขนสั้น",
        "product_id": 306,
        "product_name": "เสื้อยืด พิมพ์ ดาว",
        "product_price": 160,
        "product_location_x": 60,
        "product_location_y": 40,
        "product_picture": "เสื้อยืดพิมพ์ดาว.png",
        "product_description": "เสื้อยืด พิมพ์ ดาว",
        "product_barcode": "554411998800",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อยืดพิมพ์ดาว_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 5,
        "product_sub_group_name": "เสื้อแขนยาว",
        "product_id": 315,
        "product_name": "เสื้อแขนยาวไหล่ตก",
        "product_price": 189,
        "product_location_x": 40,
        "product_location_y": 60,
        "product_picture": "เสื้อแขนยาวไหล่ตก.png",
        "product_description": "เสื้อแขนยาวไหล่ตก",
        "product_barcode": "019253200507",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อแขนยาวไหล่ตก_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 5,
        "product_sub_group_name": "เสื้อแขนยาว",
        "product_id": 316,
        "product_name": "เสื้อแขนยาวลายม้า",
        "product_price": 220,
        "product_location_x": 40,
        "product_location_y": 76,
        "product_picture": "เสื้อแขนยาวลายม้า.png",
        "product_description": "เสื้อแขนยาวลายม้า",
        "product_barcode": "134542515348",
        "shelf_name": "shelf 2",
        "lock_name": "Lock 2 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อแขนยาวลายม้า.post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 46,
        "product_sub_group_name": "เสื้อกล้าม",
        "product_id": 322,
        "product_name": "เสื้อกล้าม พลัสไซซ์ ขอบหยัก",
        "product_price": 150,
        "product_location_x": 60,
        "product_location_y": 86,
        "product_picture": "เสื้อกล้ามพลัสไซซ์ขอบหยัก.png",
        "product_description": "เสื้อกล้าม พลัสไซซ์ ขอบหยัก",
        "product_barcode": "220808320226",
        "shelf_name": "shelf 1",
        "lock_name": "Lock 3 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อกล้ามพลัสไซซ์ขอบหยัก_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 46,
        "product_sub_group_name": "เสื้อกล้าม",
        "product_id": 323,
        "product_name": "เสื้อกล้าม พลัสไซซ์ ผ้าถัก",
        "product_price": 120,
        "product_location_x": 60,
        "product_location_y": 86,
        "product_picture": "เสื้อกล้ามพลัสไซซ์ผ้าถัก.png",
        "product_description": "เสื้อกล้าม พลัสไซซ์ ผ้าถัก",
        "product_barcode": "072105195851",
        "shelf_name": "shelf 1",
        "lock_name": "Lock 3 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อกล้ามพลัสไซซ์ผ้าถัก_post.jpg"
    },
    {
        "parent_product_group_id": 4,
        "parent_product_group_name": "เสื้อผ้า",
        "product_sub_group_id": 46,
        "product_sub_group_name": "เสื้อกล้าม",
        "product_id": 324,
        "product_name": "เสื้อกล้ามพลัส ขอบลูกไม้",
        "product_price": 120,
        "product_location_x": 60,
        "product_location_y": 86,
        "product_picture": "เสื้อกล้ามพลัสขอบลูกไม้.png",
        "product_description": "เสื้อกล้ามพลัส ขอบลูกไม้",
        "product_barcode": "124966276210",
        "shelf_name": "shelf 1",
        "lock_name": "Lock 3 ZAF1",
        "zone_name": "Zone AF1",
        "floor_name": "floor 1",
        "product_position_picture": "เสื้อกล้ามพลัสขอบลูกไม้_post.jpg"
    }
]

  const [options, setoptions] = useState([])
  const [showModal, setShowModal] = useState(false);
  const handleInputChange =   (inputValue) => {
    if(inputValue.length>2){
      GetSearch(inputValue)
    }
    else{
      setoptions([])
    }
  
  };

  const GetSearch = async(search)=>{
    let searchproduct = await CallSearchProduct(search)
      if(searchproduct){
        console.log(searchproduct)
        const optionsdata = searchproduct.map((item) => ({
          valuevalue: item.product_id,
          label: item.product_name
        }));
        setoptions(optionsdata)
      }
  }
  const handleAddSelect = () => {
    setSelectedOptions([...selectedOptions, { value: "none", label: "Empty" }]);
  };

  const handleDeleteSelect = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);
  };

  const handleTypeSelect = (index, selectedOption) => {
    console.log("Selected Option:", selectedOption);
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = selectedOption;
    setSelectedOptions(newSelectedOptions);
    console.log("Updated selected options:", newSelectedOptions);
  };

  const handleClick = () => {
    console.log("Selected Options:", selectedOptions);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
        onClick={() => setShowModal(!showModal)}
      >
        Toggle Modal
      </button>
      {showModal && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75">
          <div className="w-1/3 h-auto mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
            {selectedOptions.map((selectedOption, index) => (
              <div className="flex flex-row" key={index}>
                <Select className="w-1/2 my-2"
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
              Add Select
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-whitefont-bold py-2 px-4 rounded my-2"
              onClick={handleClick}
            >
              Log Values
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2"
              onClick={() => setShowModal(false)}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExampleModal;
