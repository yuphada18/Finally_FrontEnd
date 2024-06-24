
import axios from 'axios'
import { url } from '@/config';

export function GetPageNum(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/get/page/num/'+data,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        console.log("page",response.data)
        // if (response.data[0].Status == 'Fail'){
        //     console.log(response.data)
        //     return false
        // }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
  }

  export function GetProduct(data) {
    var token = localStorage.getItem("Authorization")
    let page = data.page
    let entity = data.entity
    return axios({
      method: 'GET',
      url: url + '/admin/get/products/'+page+'/'+entity,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        //console.log("page",response.data)
        // if (response.data[0].Status == 'Fail'){
        //     console.log(response.data)
        //     return false
        // }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
  }
  
  export function CallSearchProduct(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/search/products/'+data,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        //console.log("page",response.data)
        // if (response.data[0].Status == 'Fail'){
        //     console.log(response.data)
        //     return false
        // }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
  }

  export function InsertProduct(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'POST',
      url: url + '/admin/insert/product',
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

  export function CallUpdateProduct(dataupdate) {
    console.log("55",dataupdate)
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'PUT',
      url: url + '/admin/update/product',
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


  export function DeleteProduct(data) {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'DELETE',
      url: url + '/admin/delete/product/'+data,
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