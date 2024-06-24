import axios from 'axios'
import { url } from '@/config';

export function GetProduct_Group() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/get/product_group',
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

export function InsertPd_Group(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'POST',
      url: url + '/admin/insert/product_group',
      data:data,
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

  export function UpdatePd_Group(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'PUT',
      url: url + '/admin/update/product_group',
      data:data,
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

  export function DeletePd_Group(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'DELETE',
      url: url + '/admin/delete/product_group/'+data,
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