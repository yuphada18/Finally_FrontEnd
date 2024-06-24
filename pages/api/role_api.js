import axios from 'axios'
import { url } from '@/config';

export function CallUpdateRole(data) {
    var token = localStorage.getItem("Authorization")
   
    return axios({
      method: 'PUT',
      url: url + '/admin/update/role',
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



export function GetAllFeatureData() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/feature_permission',
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        //console.log("MEE",response.data)
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

export function GetAllFeatureDataOfRole() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/roles',
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

export function InsertRole(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'POST',
      url: url + '/admin/insert/role',
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

  export function GetAllRole() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/getall/roles',
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

export function DeleteRole(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'DELETE',
    url: url + '/admin/delete/role/'+data,
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