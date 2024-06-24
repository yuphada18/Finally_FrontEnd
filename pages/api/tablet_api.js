import { url } from "@/config";
import axios from "axios";

export function GetTablet() {
    var token = localStorage.getItem("Authorization")
   
    return axios({
      method: 'GET',
      url: url + '/admin/get/tablet_data',
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        if (response.data[0].Status == 'Fail'){
            console.log(response.data)
            return false
        }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
}

export function UpdateTabletData(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'PUT',
      url: url + '/admin/update/tablet',
      data:data,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        console.log("Update",response.data)
        return response.data;
      })
      .catch(error => {
        return false;
      });
  }

  export function InsertTablet(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'POST',
      url: url + '/admin/insert/tablet',
      data:data,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        if (response.data[0].Status == 'Fail'){
            console.log(response.data)
            return false
        }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
  }

  export function DeleteTablet(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'DELETE',
      url: url + '/admin/delete/tablet/'+data,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        console.log(response.data)
        if (response.data[0].Status == 'Fail'){
            console.log(response.data)
            return false
        }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
  }