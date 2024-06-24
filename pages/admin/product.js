import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar2 from "@/components/Sidebar2";
import { GetFeatureData } from "../api/getfeature";
import { CallSearchProduct, CallUpdateProduct, DeleteProduct, GetPageNum, InsertProduct, SearchProduct } from "../api/product_api";
import { GetProduct } from "../api/product_api";
import ViewShowplan from "@/components/Viewplan";
import { url } from "@/config";
import { GetProduct_Group } from "../api/product_group_api";
import { GetByGroup } from "../api/product_sub_group_api";
import { GetZoneByFloor } from "../api/zone_api";
import { GetFloor } from "../api/floor_api";
import { GetLockByZone } from "../api/lock_api";
import { GetShelfByLock } from "../api/shelf_api";
import Changplan from "@/components/Changplan";
import Swal from "sweetalert2";
function lock() {
  const router = useRouter();
  const [menus, setmenus] = useState([{}]);
  const [entity, setentity] = useState(5);
  const [searchValue, setsearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [AddModal, setAddModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [ViewModal, setViewModal] = useState(false);
  const [data, setdata] = useState([]);
  const [pageCount, setpageCount] = useState(5);
  const [PageNum, setPageNum] = useState(1);
  const [pinX, setPinX] = useState(0);
  const [pinY, setPinY] = useState(0);
  const [showModalViewPosition, setshowModalViewPosition] = useState(false);
  const [RF, setRF] = useState(false)
  //const [pageIndices, setpageIndices] = useState(0)
  const [SearchProduct, setSearchProduct] = useState([])
  const [PageData, setPageData] = useState([])
  const [Notsearch, setNotsearch] = useState(true)
  const [UpdateProduct, setUpdateProduct] = useState({})
  ///////////////////////////////////////////////////////////////
  const [ProductGroupNewSelectValue, setProductGroupSelectValue] = useState('');
  const [ProductSubGroupNewSelectValue, setProductSubGroupNewSelectValue] = useState('');
  const [isProductSubGroupDisabled, setIsProductSubGroupDisabled] = useState(true);
  const [ProductGroup, setProductGroup] = useState([])
  const [ProductSubGroup, setProductSubGroup] = useState({})
  const [NewProduct, setNewProduct] = useState({})
  const [ChangPositionAdd, setChangPositionAdd] = useState(false)
  const [ChangPositionEdit, setChangPositionEdit] = useState(false)
  const [FloorImage, setFloorImage] = useState("")
  ///////////////////////////////////////////////////////////////////////////////
  const handleProductGroupNewChange = async (event) => {
    setProductGroupSelectValue(event.target.value);
    if (event.target.value === '') {
      setIsProductSubGroupDisabled(true);
      setProductSubGroupNewSelectValue('');
    } else {
      let pdsub = await GetByGroup(event.target.value)
      if (pdsub) {
        console.log(pdsub)
        setProductSubGroup(pdsub)
      }
      setIsProductSubGroupDisabled(false);
    }
  };

  const handleProductSubGroupNewChange = (event) => {
    if (EditModal == true) {
      setProductSubGroupNewSelectValue(event.target.value);
      handleChangUpdateProduct("product_group_id", event)
      setProductSubGroupNewSelectValue(event.target.value)
    }
    if (AddModal) {
      setProductSubGroupNewSelectValue(event.target.value);
      handleChangNewProduct("product_group_id", event)
    }
  };
  const [floorSelectValueNew, setFloorSelectValueNew] = useState('');
  const [zoneSelectValueNew, setZoneSelectValueNew] = useState('');
  const [lockSelectValueNew, setLockSelectValueNew] = useState('');
  const [shelfSelectValueNew, setShelfSelectValueNew] = useState('');
  const [isZoneSelectDisabledNew, setIsZoneSelectDisabledNew] = useState(true);
  const [isLockSelectDisabledNew, setIsLockSelectDisabledNew] = useState(true);
  const [Floors, setFloors] = useState([])
  const [isShelfSelectDisabledNew, setIsShelfSelectDisabledNew] = useState(true);
  const [zone, setzone] = useState([])
  const [Lock, setLock] = useState([])
  const [shelf, setshelf] = useState([])
  const [PdGroupUpdateIndex, setPdGroupUpdateIndex] = useState()
  const handleFloorChangeNew = async (event) => {
    setFloorSelectValueNew(event.target.value);
    if (event.target.value === '') {
      setIsZoneSelectDisabledNew(true);
      setIsLockSelectDisabledNew(true);
      setIsShelfSelectDisabledNew(true);
      setZoneSelectValueNew('');
      setLockSelectValueNew('');
      setShelfSelectValueNew('');
    } else {
      const floorIndex = Floors.findIndex((floor) => floor.floor_id == event.target.value);
      setFloorImage(Floors[floorIndex].floor_image)
      let data_zone = await GetZoneByFloor(event.target.value)
      console.log("zone", data_zone)
      if (data_zone) {
        setzone(data_zone)
      }
      else {
        setzone([])
      }
      setIsZoneSelectDisabledNew(false);
    }
  };

  const handleZoneChangeNew = async (event) => {
    setZoneSelectValueNew(event.target.value);
    if (event.target.value === '') {
      setIsLockSelectDisabledNew(true);
      setIsShelfSelectDisabledNew(true);
      setLockSelectValueNew('');
      setShelfSelectValueNew('');
    } else {
      let data = await GetLockByZone(event.target.value)
      console.log(data)
      if (data) {
        setLock(data)
      }
      setIsLockSelectDisabledNew(false);
    }
  };

  const handleLockChangeNew = async (event) => {
    setLockSelectValueNew(event.target.value);
    if (event.target.value === '') {
      setIsShelfSelectDisabledNew(true);
      setShelfSelectValueNew('');
    } else {
      let data_shelf = await GetShelfByLock(event.target.value)
      console.log(data_shelf)
      if (data_shelf) {
        setshelf(data_shelf)
      }
      setIsShelfSelectDisabledNew(false);
    }
  };

  const handleShelfChange = (event) => {
    setShelfSelectValueNew(event.target.value);
  };
  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    on_load();
    get_floor_data();
    get_pd_group_data();
    get_page_num();
    get_products(PageNum, pageSize);
    handlePageClick(0);
    console.log(router.pathname)
    //get_lock_data();
    return () => { };
  }, [pageSize]);

  const on_load = async () => {
    try{
    var token = localStorage.getItem("Authorization");
    if (!token) {
      router.push("/login2");
    }
    let featuredata = await GetFeatureData();
    let pathnow = router.pathname
    const isPathNotInFeatureKeys = !featuredata.some((obj) => obj.feature_key === pathnow);
    if (isPathNotInFeatureKeys) {
      router.push("/404")
    } 
    if (featuredata) {
      setmenus(featuredata);
    } else {
      router.push("/404");
    }}catch{
      router.push("/404");
    }
  };
  const get_floor_data = async () => {
    let floor_data = await GetFloor();
    if (floor_data) {
      setFloors(floor_data)
    }
  };
  const get_pd_group_data = async () => {
    let data_pd_group = await GetProduct_Group()
    if (data_pd_group) {
      console.log("PDGROUP", data_pd_group)
      setProductGroup(data_pd_group)
    }
  };

  const ToggleModalViewPosition = () => {
    setViewModal(!ViewModal);
    setshowModalViewPosition(!showModalViewPosition);
  };
  const get_page_num = async () => {
    let num = await GetPageNum(pageSize);
    let data = num.page;
    //console.log("test",num)
    //console.log(num)
    if (num) {
      setpageCount(num.page);
    }
  };
  const get_products = async (page, ent) => {
    let pd_data = await GetProduct({ page: page, entity: ent });
    if (pd_data) {
      console.log("data", pd_data);
      setdata(pd_data);
    }
  };
  const add_click = () => {
    setAddModal(!AddModal);
    setNewProduct({
      "product_name": "",
      "product_price": "",
      "product_location_x": 0,
      "product_location_y": 0,
      "product_picture": "",
      "product_description": "",
      "product_barcode": "",
      "shelf_id": "",
      "product_group_id": "",
      "product_position_picture": ""
    })
    setFloorSelectValueNew('')
  };
  const closeModal = () => {
    setViewModal(!ViewModal);
    setshowModalViewPosition(!showModalViewPosition);
  };
  const handleViewClick = (item) => {
    setSelectedItem(item);
    setViewModal(!ViewModal);
    const floorIndex = Floors.findIndex((floor) => floor.floor_id == item.floor_id);
    setFloorImage(Floors[floorIndex].floor_image)
    setPinX(item.product_location_x);
    setPinY(item.product_location_y);
  };
  const handleChangNewProduct = (val, event) => {
    if (val == "shelf_id") {
      setShelfSelectValueNew(event.target.value)
    }
    NewProduct[val] = event.target.value
    setNewProduct({ ...NewProduct })
  }


  const CancleView = () => {
    setSelectedItem({});
    setViewModal(!ViewModal);
    setPinX(0);
    setPinY(0);
  };
  const handleEditClick = (item) => {
    console.log("item", item)
    const PDGroup = ProductGroup.findIndex((pdgroup) => pdgroup.product_group_id === item.parent_product_group_id);
    setPdGroupUpdateIndex(PDGroup)
    GetPdSubGroup(item.parent_product_group_id)
    setIsProductSubGroupDisabled(false)
    setProductSubGroupNewSelectValue(item.product_sub_group_id)
    console.log("Here", PDGroup)
    setSelectedItem(item)
    get_zone_data(item.floor_id)
    get_lock_data(item.zone_id)
    get_shelf_data(item.lock_id)
    setLockSelectValueNew(item.lock_id)
    setZoneSelectValueNew(item.zone_id)
    setShelfSelectValueNew(item.shelf_id)
    setIsZoneSelectDisabledNew(false)
    setIsLockSelectDisabledNew(false);
    setIsShelfSelectDisabledNew(false);
    setPinX(item.product_location_x)
    setPinY(item.product_location_y)
    const floorIndex = Floors.findIndex((floor) => floor.floor_id == item.floor_id);
    setFloorImage(Floors[floorIndex].floor_image)
    setUpdateProduct({
      "product_id": item.product_id,
      "product_name": item.product_name,
      "product_price": item.product_price,
      "product_location_x": item.product_location_x,
      "product_location_y": item.product_location_y,
      "product_picture": item.product_picture,
      "product_description": item.product_description,
      "product_barcode": item.product_barcode,
      "shelf_id": item.shelf_id,
      "product_group_id": item.product_sub_group_id,
      "product_position_picture": item.product_position_picture
    }
    )
    setEditModal(!EditModal)
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
  };
  const get_lock_data = async (id) => {
    let data = await GetLockByZone(id)
    console.log(data)
    if (data) {
      setLock(data)
    }
  }
  const GetPdSubGroup = async (id) => {
    let pdsub = await GetByGroup(id)
    if (pdsub) {
      console.log("PDSUB", pdsub)
      setProductSubGroup(pdsub)
    }
  }
  const get_shelf_data = async (id) => {
    let data_shelf = await GetShelfByLock(id)
    console.log(data_shelf)
    if (data_shelf) {
      setshelf(data_shelf)
    }
  }
  const CancleEdit = () => {
    setEditModal(!EditModal)
    setFloorSelectValueNew('')
    setIsZoneSelectDisabledNew(true);
    setIsLockSelectDisabledNew(true);
    setIsShelfSelectDisabledNew(true);
    setZoneSelectValueNew('');
    setLockSelectValueNew('');
    setShelfSelectValueNew('');
    setIsProductSubGroupDisabled(true)
    setPinX(50)
    setPinY(50)
  };
  const handleChangUpdateProduct = (val, event) => {
    if (val == "shelf_id") {
      setShelfSelectValueNew(event.target.value)
    }
    UpdateProduct[val] = event.target.value
    setUpdateProduct({ ...UpdateProduct })
  }
  const ConfirmUpdate = (item) => {
    console.log(item)
    if (item.product_name == '' || item.product_price == '' || item.product_location_x == 0 || item.product_location_y == 0 || item.product_picture == ''
      || item.product_description == '' || item.product_barcode == '' || item.shelf_id == '' || item.product_group_id == '' || item.product_position_picture == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        timer: 3000
      })
    }
    else {

      Swal.fire({
        title: 'Do you want to add this Product?',
        showCancelButton: true,
        confirmButtonText: 'Save',
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let update_data = await CallUpdateProduct(item)
          if (update_data) {
            Swal.fire('Saved!', '', 'success')
            setEditModal(!EditModal);
            get_products(PageNum, pageSize);
            setUpdateProduct({
              "product_name": "",
              "product_price": "",
              "product_location_x": 0,
              "product_location_y": 0,
              "product_picture": "",
              "product_description": "",
              "product_barcode": "",
              "shelf_id": "",
              "product_group_id": "",
              "product_position_picture": ""
            })

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
    let delete_id = i.product_id
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to Delete this Product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let conf_del = await DeleteProduct(delete_id)
        if (conf_del) {
          Swal.fire(
            'Deleted!',
            'Product has been deleted.',
            'success'
          )
        }
      }
      get_products(PageNum, pageSize);
    })
  }


  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    get_page_num();
  };

  const handlePrevClick = () => {
    setPageIndex((prevPageIndex) => prevPageIndex - 1);
    let pagnumber = pageIndex;
    console.log("page", pagnumber);
    get_products(pagnumber, pageSize);
    setPageNum(pagnumber);
  };

  const handleNextClick = () => {
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
    console.log("Page", pageIndex + 2);
    let pagnumber = pageIndex + 2;
    get_products(pagnumber, pageSize);
    setPageNum(pagnumber);
  };

  const handlePageClick = (index) => {
    setPageIndex(index);
    console.log("Page", index + 1);
    let pagnumber = index + 1;
    get_products(pagnumber, pageSize);
    setPageNum(pagnumber);
  };
  const handleChangSearch = async (event) => {
    console.log("iiii", event.target.value)
    get_floor_data();
    setPageIndex(0)
    setsearchValue(event.target.value)
    if (event.target.value == '' || (event.target.value).length == 0) {
      setPageSize(5)
    }
    if (event.target.value.length >= 3) {
      let datasearch = await CallSearchProduct(event.target.value)
      if (datasearch) {
        console.log(datasearch)
        if (datasearch == [] || event.target.value == '') {
          setdata(data)
          get_page_num();
          setPageSize(5)
          get_products(PageNum, pageSize);
          handlePageClick(0);
          setNotsearch(true)
        }
        else {
          setdata(datasearch)
          setNotsearch(false)
        }
      }
    }
    else {
      setNotsearch(true)
      get_products(1, 5);
    }
  }
  const ConfirmAdd = async (item) => {
    console.log(item)
    if (item.product_name == '' || item.product_price == '' || item.product_location_x == 0 || item.product_location_y == 0 || item.product_picture == ''
      || item.product_description == '' || item.product_barcode == '' || item.shelf_id == '' || item.product_group_id == '' || item.product_position_picture == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        timer: 3000
      })
    }
    else {

      Swal.fire({
        title: 'Do you want to add this Product?',
        showCancelButton: true,
        confirmButtonText: 'Save',
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let insert_data = await InsertProduct(item)
          if (insert_data) {
            Swal.fire('Saved!', '', 'success')
            setAddModal(!AddModal);
            get_products(PageNum, pageSize);
            setNewProduct({
              "product_name": "",
              "product_price": "",
              "product_location_x": 0,
              "product_location_y": 0,
              "product_picture": "",
              "product_description": "",
              "product_barcode": "",
              "shelf_id": "",
              "product_group_id": "",
              "product_position_picture": ""
            })

          }
        }
      })
    }
  }
  const handleFileProductPostNewChange = async (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(url + '/upload/image/product', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data.filename);
    NewProduct["product_position_picture"] = data.filename
    setNewProduct({ ...NewProduct })
  };
  const handleFileProductNewChange = async (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(url + '/upload/image/product', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data.filename);
    NewProduct["product_picture"] = data.filename
    setNewProduct({ ...NewProduct })
  };

  const setPinNew = (x, y) => {
    console.log("X:", x, "Y:", y)
    setPinX(x)
    setPinY(y)
    NewProduct["product_location_x"] = x
    NewProduct["product_location_y"] = y
    setNewProduct({ ...NewProduct })
    setAddModal(!AddModal)
    setChangPositionAdd(!ChangPositionAdd)
  }
  const setPinUpdate = (x, y) => {
    console.log("X:", x, "Y:", y)
    setPinX(x)
    setPinY(y)
    UpdateProduct["product_location_x"] = x
    UpdateProduct["product_location_y"] = y
    setUpdateProduct({ ...UpdateProduct })
    setEditModal(!EditModal)
    setChangPositionEdit(!ChangPositionEdit)
  }
  const modalPosition = () => {
    setAddModal(!AddModal)
    setChangPositionAdd(!ChangPositionAdd)
    get_floor_data()
    get_pd_group_data()
  }
  const modalPositionEdit = () => {
    setEditModal(!EditModal)
    setChangPositionEdit(!ChangPositionEdit)
    get_floor_data()
    get_pd_group_data()
  }
  const handleFileProductPostUpdateChange = async (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(url + '/upload/image/product', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data.filename);
    UpdateProduct["product_position_picture"] = data.filename
    setUpdateProduct({ ...UpdateProduct })
  };
  const handleFileProductUpdateChange = async (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(url + '/upload/image/product', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data.filename);
    UpdateProduct["product_picture"] = data.filename
    setUpdateProduct({ ...UpdateProduct })
  };


  // const pageCount = Math.ceil(data.length / pageSize);
  const pageIndices = Array.from({ length: pageCount }, (_, index) => index);
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
  //const pageData = data.slice(startIndex, endIndex);
  return (
    <div class="h-screen flex flex-shrink-0 antialiased background_login2">
      {ChangPositionAdd && (
        <Changplan
          x={pinX}
          y={pinY}
          cancle={modalPosition}
          ImgPosition={NewProduct.product_position_picture}
          floorpicture={FloorImage}
          setpin={setPinNew}
        />
      )}
       {ChangPositionEdit && (
        <Changplan
          x={pinX}
          y={pinY}
          cancle={modalPositionEdit}
          ImgPosition={UpdateProduct.product_position_picture}
          floorpicture={FloorImage}
          setpin={setPinUpdate}
        />
      )}
      {AddModal && (
        <div className="fixed flex flex-row w-full h-full bg-gray-500 bg-opacity-50  items-center justify-center z-10">
          <div className="w-2/5">
            <div className="bg-white p-4 rounded-md flex flex-col"><div className="flex ">
              <div className="w-3/6 flex flex-col">
                <div className="w-full">
                  <div className="flex flex-row mt-6">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ชื่อสินค้า:
                    </h2>
                    <input type="text" className="border rounded border-black h-8 ml-1" value={NewProduct.product_name} onChange={(e) => handleChangNewProduct("product_name", e)} />
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ราคาสินค้า:
                    </h2>
                    <input type="text" className="border rounded border-black h-8 ml-1" value={NewProduct.product_price} onChange={(e) => handleChangNewProduct("product_price", e)} />
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      บาร์โค้ด:
                    </h2>
                    <input type="text" className="border rounded border-black h-8 ml-1" value={NewProduct.product_barcode} onChange={(e) => handleChangNewProduct("product_barcode", e)} />
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      กลุ่มสินค้า:
                    </h2>
                    <div>
                      <select className="border rounded border-black" value={ProductGroupNewSelectValue} onChange={handleProductGroupNewChange}>
                        <option value="">Select a product group</option>
                        {ProductGroup.map((pdgroup) => (
                          <option key={pdgroup.product_group_id} value={pdgroup.product_group_id}>
                            {pdgroup.product_group_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <h2 className="text-lg ml-3"></h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      กลุ่มสินค้าย่อย:
                    </h2>
                    <div>
                      <select
                        className={`border rounded border-black ${isProductSubGroupDisabled ? 'bg-gray-500' : ''}`}
                        value={ProductSubGroupNewSelectValue}
                        onChange={handleProductSubGroupNewChange}
                        disabled={isProductSubGroupDisabled}
                      >
                        <option value="">Select a product subgroup</option>
                        {!isProductSubGroupDisabled && ProductSubGroup.map((pdsubroup) => (
                          <option key={pdsubroup.product_group_id} value={pdsubroup.product_group_id}>
                            {pdsubroup.product_group_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h2 className="text-lg ml-3"></h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ชั้นของห้าง:
                    </h2>
                    <div>
                      <select className="border rounded border-black" value={floorSelectValueNew} onChange={handleFloorChangeNew}>
                        <option value="">Select Floor</option>
                        {Floors.map((floor) => (
                          <option key={floor.floor_id} value={floor.floor_id}>
                            {floor.floor_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      โซนสินค้า:
                    </h2>
                    <div>
                      <select className={`border rounded border-black ${isZoneSelectDisabledNew ? 'bg-gray-500' : ''}`}
                        value={zoneSelectValueNew}
                        onChange={handleZoneChangeNew}
                        disabled={isZoneSelectDisabledNew}
                      >
                        <option value="">Select Zone</option>
                        {zone.map((zone) => (
                          <option key={zone.zone_id} value={zone.zone_id}>
                            {zone.zone_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h2 className="text-lg ml-3"></h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ล็อคสินค้า:
                    </h2>
                    <div>
                      <select className={`border rounded border-black ${isLockSelectDisabledNew ? 'bg-gray-500' : ''}`}
                        value={lockSelectValueNew}
                        onChange={handleLockChangeNew}
                        disabled={isLockSelectDisabledNew}
                      >
                        <option value="">Select Lock</option>
                        {Lock.map((Lock) => (
                          <option key={Lock.lock_id} value={Lock.lock_id}>
                            {Lock.lock_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ชั้นวางสินค้า:
                    </h2>
                    <div>
                      <select className={`border rounded border-black ${isShelfSelectDisabledNew ? 'bg-gray-500' : ''}`}
                        value={shelfSelectValueNew}
                        onChange={(e) => handleChangNewProduct("shelf_id", e)}
                        disabled={isShelfSelectDisabledNew}
                      >
                        <option value="">Select Shelf</option>
                        {shelf.map((shelf) => (
                          <option key={shelf.shelf_id} value={shelf.shelf_id}>
                            {shelf.shelf_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/6 flex flex-col">
                <div className='flex flex-row items-start mt-2'>
                  <label className='text-lg '>รายละเอียดสินค้า:</label>
                  <textarea onChange={(e) => handleChangNewProduct("product_description", e)}
                    className=" border rounded border-black mt-0 w-64 h-10 pl-2"
                    value={NewProduct.product_description}
                    rows={2}
                    cols={10}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="file" className="block text-2xl font-medium text-gray-700">
                    อัพโหลดรูปภาพสินค้า
                  </label>
                  <div className="mt-1">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-2/3"
                      onChange={handleFileProductNewChange}
                    />
                  </div>
                  <label htmlFor="file" className="block text-2xl font-medium text-gray-700">
                    อัพโหลดรูปภาพที่ตั้งสินค้า
                  </label>
                  <div className="mt-1">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-2/3"
                      onChange={handleFileProductPostNewChange}
                    />
                  </div>
                  <button onClick={() => modalPosition()} className="rounded-md mt-10 w-32 h-12 bg-sky-500 text-white">กำหนดที่ตั้งสินค้า</button>
                </div>
              </div>
            </div>
              <div className="w-full flex ">
                <div className=" w-full ">
                  <div className="w-full">
                    <button onClick={() => ConfirmAdd(NewProduct)} className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                      Save
                    </button>
                  </div>
                  <div className="w-full">
                    <button
                      className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={add_click}
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
      {EditModal && (
        <div className="fixed flex flex-row w-full h-full bg-gray-500 bg-opacity-50  items-center justify-center z-10">
          <div className="w-2/5">
            <div className="bg-white p-4 rounded-md flex flex-col"><div className="flex ">
              <div className="w-3/6 flex flex-col">
                <div className="w-full">
                  <div className="flex flex-row mt-6">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ชื่อสินค้า:
                    </h2>
                    <input type="text" className="border rounded border-black h-8 ml-1" value={UpdateProduct.product_name} onChange={(e) => handleChangUpdateProduct("product_name", e)} />
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ราคาสินค้า:
                    </h2>
                    <input type="text" className="border rounded border-black h-8 ml-1" value={UpdateProduct.product_price} onChange={(e) => handleChangUpdateProduct("product_price", e)} />
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      บาร์โค้ด:
                    </h2>
                    <input type="text" className="border rounded border-black h-8 ml-1" value={UpdateProduct.product_barcode} onChange={(e) => handleChangUpdateProduct("product_barcode", e)} />
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      กลุ่มสินค้า:
                    </h2>
                    <div>
                      <select className="border rounded border-black" onChange={handleProductGroupNewChange}>
                        {ProductGroup.length > 0 && ProductGroup.map((pdgroup) => (
                          <option selected={pdgroup.product_group_id === selectedItem.parent_product_group_id} key={pdgroup.product_group_id} value={pdgroup.product_group_id}>
                            {pdgroup.product_group_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <h2 className="text-lg ml-3"></h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      กลุ่มสินค้าย่อย:
                    </h2>
                    <div>
                      <select
                        className={`border rounded border-black ${isProductSubGroupDisabled ? 'bg-gray-500' : ''}`}
                        onChange={handleProductSubGroupNewChange}
                        disabled={isProductSubGroupDisabled}
                        value={ProductSubGroupNewSelectValue}
                      >
                        {ProductSubGroup.length > 0 && ProductSubGroup.map((pdsubroup) => (
                          <option selected={pdsubroup.product_group_id === selectedItem.product_sub_group_id} key={pdsubroup.product_group_id} value={pdsubroup.product_group_id}>
                            {pdsubroup.product_group_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h2 className="text-lg ml-3"></h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ชั้นของห้าง:
                    </h2>
                    <div>
                      <select className="border rounded border-black" onChange={handleFloorChangeNew}>
                        <option value="">Select Floor</option>
                        {Floors.map((floor) => (
                          <option selected={selectedItem.floor_id === floor.floor_id} key={floor.floor_id} value={floor.floor_id}>
                            {floor.floor_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      โซนสินค้า:
                    </h2>
                    <div>
                      <select className={`border rounded border-black ${isZoneSelectDisabledNew ? 'bg-gray-500' : ''}`}
                        onChange={handleZoneChangeNew}
                        disabled={isZoneSelectDisabledNew}
                        value={zoneSelectValueNew}
                      >
                        <option value="">Select Zone</option>
                        {zone.map((zone) => (
                          <option selected={zone.zone_id === selectedItem.zone_id} key={zone.zone_id} value={zone.zone_id}>
                            {zone.zone_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h2 className="text-lg ml-3"></h2>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ล็อคสินค้า:
                    </h2>
                    <div>
                      <select className={`border rounded border-black ${isLockSelectDisabledNew ? 'bg-gray-500' : ''}`}
                        value={lockSelectValueNew}
                        onChange={handleLockChangeNew}
                        disabled={isLockSelectDisabledNew}
                      >
                        <option value="">Select Lock</option>
                        {Lock.map((Lock) => (
                          <option selected={Lock.lock_id === selectedItem.lock_id} key={Lock.lock_id} value={Lock.lock_id}>
                            {Lock.lock_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <h2 className=" text-lg font-bold mb-2 flex flex-row">
                      ชั้นวางสินค้า:
                    </h2>
                    <div>
                      <select className={`border rounded border-black ${isShelfSelectDisabledNew ? 'bg-gray-500' : ''}`}
                        value={shelfSelectValueNew}
                        onChange={(e) => handleChangUpdateProduct("shelf_id", e)}
                        disabled={isShelfSelectDisabledNew}
                      >
                        <option value="">Select Shelf</option>
                        {shelf.map((shelf) => (
                          <option selected={shelf.shelf_id == selectedItem.shelf_id} key={shelf.shelf_id} value={shelf.shelf_id}>
                            {shelf.shelf_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/6 flex flex-col">
                <div className='flex flex-row items-start mt-2'>
                  <label className='text-lg '>รายละเอียดสินค้า:</label>
                  <textarea onChange={(e) => handleChangUpdateProduct("product_description", e)}
                    className=" border rounded border-black mt-0 w-64 h-10 pl-2"
                    value={UpdateProduct.product_description}
                    rows={2}
                    cols={10}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="file" className="block text-2xl font-medium text-gray-700">
                    อัพโหลดรูปภาพสินค้า
                  </label>
                  <div className="mt-1">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={handleFileProductUpdateChange}
                    />
                  </div>
                  <label htmlFor="file" className="block text-2xl font-medium text-gray-700">
                    อัพโหลดรูปภาพที่ตั้งสินค้า
                  </label>
                  <div className="mt-1">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={handleFileProductPostUpdateChange}
                    />
                  </div>
                  <button onClick={() => modalPositionEdit()} className="rounded-md mt-10 w-32 h-12 bg-sky-500 text-white">กำหนดที่ตั้งสินค้า</button>
                </div>
              </div>
            </div>
              <div className="w-full flex ">
                <div className=" w-full ">
                  <div className="w-full">
                    <button onClick={() => ConfirmUpdate(UpdateProduct)} className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                      Save
                    </button>
                  </div>
                  <div className="w-full">
                    <button
                      className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={CancleEdit}
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
      <Sidebar2 className="h-screenC" menus={menus} />
      <div class="w-10/12 h-full flex ">
        {showModalViewPosition && (
          <ViewShowplan
            x={pinX}
            y={pinY}
            onClose={closeModal}
            ImgPosition={selectedItem.product_position_picture}
            floorpicture={FloorImage}
          />
        )}
        <div class=" w-full flex  justify-center font-sans  my-10 overflow-auto">
          <div class="w-full lg:w-5/6 flex flex-col">
            <div class="py-1">
              <div class="h-4 bg-blue-600  "></div>
              <div class="px-1 py-5 bg-gray-100 font-bold text-3xl font-mono shadow-2xl rounded-b-lg">
                การจัดการสินค้า
              </div>
              <br></br>
              <div class="my-2 flex sm:flex-row flex-col">
                <div class="flex flex-row mb-1 sm:mb-0">
                  <div class="relative w-24 ">
                    {/* <button onClick={()=>handleChangPage()}>uyor</button> */}
                    <select
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      class="text-center h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
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
                    onChange={(e) => handleChangSearch(e)}
                    placeholder="Search"
                    class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
                <div className="w-full flex justify-end">
                  <button
                    onClick={add_click}
                    className="w-24 border rounded-lg bg-yellow-300"
                  >
                    เพิ่ม
                  </button>
                </div>
              </div>
              <br></br>
            
                
                  <table className="table-auto w-full text-left">
                    <thead className="bg-blue-600">
                      <tr className="text-white">
                        <th className="px-4 py-2 w-1/3 text-center">#</th>
                        <th className="px-4 py-2 w-2/3 text-center">
                          ชื่อสินค้า
                        </th>
                        <th className="px-4 py-2 w-3/3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody >
                      {data.length > 0 && data.map((item, index) => (
                        <tr className="border-b bg-gray-50" key={index}>
                          <td className="px-4 py-2 flex justify-center">
                            {startIndex + index + 1}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {item.product_name}
                          </td>
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
             
                {Notsearch && (<div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
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
                    {pageIndices
                      .slice(startButtonIndex, endButtonIndex + 1)
                      .map((index) => (
                        <button
                          key={index}
                          onClick={() => handlePageClick(index)}
                          className={`px-4 py-2 border rounded ${index === pageIndex
                            ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            : "text-blue-500 hover:text-blue-700"
                            }`}
                        >
                          {index + 1}
                        </button>
                      ))}
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
                )}
              
            </div>
          </div>
        </div>
      </div>
      {/* Add a modal or other view to display selected item */}
      {ViewModal && (
        <div className="fixed flex flex-row w-full h-full bg-gray-500 bg-opacity-50  items-center justify-center">
          <div className="w-1/3">
            <div className="bg-white p-4 rounded-md flex flex-row">
              <div className="w-3/6 flex flex-col">
                <div className="flex flex-row mt-6">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    ชื่อสินค้า:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.product_name}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    ราคาสินค้า:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.product_price}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    บาร์โค้ด:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.product_barcode}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    กลุ่มสินค้าย่อย:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.product_sub_group_name}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    กลุ่มสินค้า:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.parent_product_group_name}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    ชั้นวางสินค้า:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.shelf_name}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    ล็อคสินค้า:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.lock_name}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    โซนสินค้า:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.zone_name}
                  </h2>
                </div>
                <div className="flex flex-row">
                  <h2 className=" text-lg font-bold mb-2 flex flex-row">
                    ชื่อชั้นของห้าง:
                  </h2>
                  <h2 className="text-lg ml-3">
                    {" " + selectedItem.floor_name}
                  </h2>
                </div>
                <div></div>
              </div>
              <div className="flex flex-col w-3/6 items-center mt-6 mr-5">
                <button>
                  <img
                    onClick={() => ToggleModalViewPosition()}
                    className=""
                    src={url + "/image/product/" + selectedItem.product_picture}
                    style={{ width: 500, height: 300 }}
                  />
                </button>
                <div className="w-full flex justify-end items-end">
                  <button
                    onClick={() => CancleView()}
                    className="bg-blue-500 hover:bg-blue-700 text-white mt-10  font-bold py-2 px-4 rounded "
                  >
                    Close
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

export default lock;
