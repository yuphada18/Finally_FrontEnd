import axios from 'axios'
import { url } from '@/config';

export function GetPromotion() {
    var token = localStorage.getItem("Authorization")
   
    return axios({
      method: 'GET',
      url: url + '/admin/get/promotions',
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


export function UpdatePromotion(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'PUT',
    url: url + '/admin/update/promotion',
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


export function InsertPromotion(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'POST',
    url: url + '/admin/insert/promotion',
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

export function DeletePromotion(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'DELETE',
    url: url + '/admin/delete/promotion/'+data,
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