import axios from 'axios'
import { url } from '@/config';

export function GetFloor() {
    var token = localStorage.getItem("Authorization")
   
    return axios({
      method: 'GET',
      url: url + '/admin/get/floor',
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

export function InsertFloor(data) {
  var token = localStorage.getItem("Authorization")
 
  return axios({
    method: 'POST',
    url: url + '/admin/insert/floor',
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

export function UpdateFloor(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'PUT',
    url: url + '/admin/update/floor/',
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

export function DeleteFloor(data) {
  var token = localStorage.getItem("Authorization")
  return axios({
    method: 'DELETE',
    url: url + '/admin/delete/floor/'+data,
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
export function UploadFLoorImage(data) {
  var token = localStorage.getItem("Authorization");
  const formData = new FormData();
  formData.append("file", data);
  console.log(data)
  return axios({
    method: "POST",
    url: url + "/upload/image/floor",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token
    }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error(error.response);
      return { error: error.response.data.message || "error" };
    });
}



// axios.post(`${url}/upload/image/floor`, formData)
// .then((response) => {
//   console.log(response);
// })
// .catch((error) => {
//   console.error(error);
// });
