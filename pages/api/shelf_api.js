import axios from 'axios'
import { url } from '@/config';

export function GetShelf() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/get/shelf',
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
export function InsertShelf(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'POST',
    url: url + '/admin/insert/shelf',
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
export function CallUpdateShelf(dataupdate) {
  console.log("55",dataupdate)
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'PUT',
    url: url + '/admin/update/shelf',
    data:dataupdate,
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

export function DeleteShelf(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'DELETE',
    url: url + '/admin/delete/shelf/'+data,
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

export function GetShelfByLock(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'GET',
    url: url + '/admin/get/shelf_by_lock_id/'+data,
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      console.log(response.data[0])
      if (response.data[0].Status == 'Fail'){
          //console.log(response.data)
          return false
      }
      console.log(response.data)
      return response.data;
    })
    .catch(error => {
      return { error: "error" };
    });
}