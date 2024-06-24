import axios from 'axios'
import { url } from '@/config';

export function GetHistoryData(pd_id,datedata) {
    var token = localStorage.getItem("Authorization")
   
    return axios({
      method: 'GET',
      url: url + '/getdatascans/'+pd_id+'/'+datedata,
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return { error: "error" };
      });
}
