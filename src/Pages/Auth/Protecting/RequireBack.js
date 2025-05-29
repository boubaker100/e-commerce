import React from 'react'
import cookie from 'cookie-universal'
 import { Outlet } from'react-router-dom'
  export default function RequireBack(){
   
     const cookies = cookie();
    const token = cookies.get('Bearer');
    return !token ?   <Outlet/> 
   :  window.history.back()  ;

}


