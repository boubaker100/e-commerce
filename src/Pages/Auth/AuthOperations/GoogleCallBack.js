import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { baseURL, GOOGLE_CALL_BACK } from '../../../Api/Api'
import { useLocation } from 'react-router-dom'
import Cookie from 'cookie-universal'

export default function GoogleCallBack(){

 const location = useLocation();
 const cookie = Cookie();
 useEffect(() => {
    async function GoogleCall() {
        try {
            const res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
            );
            console.log(res);
            const token = res.data.access_token
            cookie.set('Bearer',token)
            } catch (err) {
            console.log(err)
        
        }
        
    }

    GoogleCall();

    }, []);

 return ( 
    <div>
      <h1>test</h1>
    </div>
  )
}

 