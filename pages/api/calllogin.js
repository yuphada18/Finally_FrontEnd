// import axios from 'axios'
import axios from 'axios'
import { url } from '@/config';
export function callApiLogin(formData) {

    return axios({
      method: 'POST',
      url: url + '/login',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
}

export function CallRegisTer(formData) {
  return axios({
    method: 'POST',
    url: url + '/register',
    data: formData,
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return { error: "error" };
    });
}

export function Logout() {
  var token = localStorage.getItem("Authorization")
 
  return axios({
    method: 'POST',
    url: url + '/logout',
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

// export const callApiLogin = (form) => {
//   return axios.post(url+"/login", form)
//     .then(response => response.data)
//     .catch(error => ({ error: "error" }))
// }