import axios from 'axios'
import { url } from '@/config';

export function GetAdvert() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/get/adverts',
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

export function RandomGetAdvert() {
  return axios({
    method: 'GET',
    url: url + '/advert/random',
  })
    .then(response => {
   
      return response.data;
    })
    .catch(error => {
      return { error: "error" };
    });
}


export function UpdateAdvert(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'PUT',
    url: url + '/admin/update/advert',
    data:data,
    headers: {
      Authorization: token
    }
  })
    .then(response => {
   
      return response.data;
    })
    .catch(error => {
      return false;
    });
}
export function InsertAdvert(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'POST',
    url: url + '/admin/insert/advert',
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

export function DeleteAdvert(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'DELETE',
      url: url + '/admin/delete/advert/'+data,
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