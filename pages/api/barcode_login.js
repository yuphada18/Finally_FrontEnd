import { url } from "@/config";
import axios from "axios";

export function Barcode_Login(data) {
    return axios({
      method: 'POST',
      url: url + '/check_barcode',
      data:data,
    })
      .then(response => {
        console.log(response.data)
        let res = response.data
        if(res.status == 'success'){
            localStorage.setItem("user_id",res.user_id)
            return 'success'
        }
        if(res.status == 'fail'){
            if(res.detail=='Barcode has expired'){
                return 'Barcode has expired'
            }
            else{
                return 'Barcode not found'
            }
        }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
  }

  export function GenBarcode() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/generate_barcode',
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        //console.log(response.data)
        let res = response.data
        //console.log(res)
        return res
      })
      .catch(error => {
        console.log(response.data)
        let res = response.data
        console.log(res)
        return { error: error };
      });
} 
export function PerMisCheck() {
  var user_id = localStorage.getItem("user_id")
  return axios({
    method: 'GET',
    url: url + '/check_tablet_permission/'+user_id,
  })
    .then(response => {
      let res = response.data
      console.log("Check",res)
      if(res.status_admin==true){
        return true
      }
      if(res.status_admin==false){
        return false
      }
    })
    .catch(error => {
      console.log(response.data)
      let res = response.data
      console.log(res)
      return { error: error };
    });
} 