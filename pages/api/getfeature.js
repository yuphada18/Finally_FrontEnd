import axios from 'axios'
import { url } from '@/config';
import { useRouter } from 'next/router';
export function GetFeatureData() {
    var token = localStorage.getItem("Authorization")
    return axios({
      method: 'GET',
      url: url + '/admin/feature',
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        if (response.data[0].Status == 'Fail'){
            console.log(response.data)
            return []
        }
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
}
