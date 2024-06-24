import { url } from "@/config";
import axios from "axios";

export function Product_Barcode(data) {
    var mac_id = localStorage.getItem("tablet_macid")
    var user_id = localStorage.getItem("user_id")

    return axios({
      method: 'Get',
      url: url + '/product_by_barcode/'+data+'/'+user_id+'/'+mac_id,
      data:data,
    })
      .then(response => {
        //console.log(response.data)
        let res = response.data
        if(res.status === 'success'){
            return res
        }
        if(res.status === 'fail'){
          console.log('fail')
           return false
        }
      })
      .catch(error => {
        return false
        // if (error.response && error.response.status === 404) {
        //   console.log("errorrrrrrrrrrrrrrrrrrrrrr")
        //   return { error: "404 Not Found" };
        // } else {
        //   return { error: "error" };
        // }
      });
  }