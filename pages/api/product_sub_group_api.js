import axios from 'axios'
import { url } from '@/config';
import { data } from 'autoprefixer';

export function GetProduct_Sub_Group() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/get/product_subgroup',
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

export function InsertProduct_Sub_Group(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'POST',
      url: url + '/admin/insert/product_sub_group',
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

export function UpdateProduct_Sub_Group(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'PUT',
    url: url + '/admin/update/product_subgroup',
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

export function GetByGroup(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'GET',
    url: url + '/product_group/parent/'+data,
    headers: {
      Authorization: token
    }
  })
    .then(response => {
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