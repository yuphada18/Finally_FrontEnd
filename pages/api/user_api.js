import axios from 'axios'
import { url } from '@/config';

export function GetUser() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/get/users',
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


export function CallUpdateUser(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'PUT',
      url: url + '/admin/update/user',
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

export function InsertUser(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'POST',
      url: url + '/admin/insert/user',
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

  export function CallDeleteUser(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'DELETE',
      url: url + '/admin/delete/user/'+data,
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