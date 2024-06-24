import axios from 'axios'
import { url } from '@/config';

export function GetLock() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/get/lock',
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
export function InsertLock(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'POST',
    url: url + '/admin/insert/lock',
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

export function CallUpdateLock(dataupdate) {
  console.log("55",dataupdate)
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'PUT',
    url: url + '/admin/update/lock',
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
export function DeleteLock(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'DELETE',
    url: url + '/admin/delete/lock/'+data,
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

export function GetLockByZone(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'GET',
    url: url + '/admin/get/lock_by_zone_id/'+data,
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
