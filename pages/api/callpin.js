import axios from 'axios'
import { url } from '@/config';
export function callapi_pos_pin() {
    // console.log(JSON.stringify(form))
    return (
        axios({
            "method":"GET",
            url: url+"/",
        }) .then((response) => {
              console.log(response.data)
              return response.data;
          })
          .catch((error) => {
            // console.log(error)
            return { error: "error" };
          }) 
    
    )
}