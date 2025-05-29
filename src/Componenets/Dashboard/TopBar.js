import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Menu } from '../../Context/MenuContext';
import { Axios } from '../../Api/Axios';
import { LOGOUT, USER } from '../../Api/Api'; 
import Dropdown from'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Navigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
 export default function TopBar(){

    const cookie = Cookie()

    const menu =  useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const [userName, setUserName] = useState('');
  useEffect(() => {
     Axios.get(`${USER}`)
    .then((res) => setUserName(res.data.name))
    .catch(() => Navigate('/login', {replace: true}))
 
 }, [])
 
 async function handelLogout() {
   try {
  const res=  await Axios.get(`/${LOGOUT}`)
  
    cookie.remove('Bearer')
    window.location.pathname = '/login';
    console.log(res)

   } catch (err) {
    console.log(err)
    
   } 
    
}

  return (
    
    <div className='top-bar d-flex align-items-center justify-content-between px-3 py-2 '>
     <div className='d-flex align-items-center gap-4 '>
        <img src='https://cdn.brandfetch.io/idAIayvcLJ/w/304/h/304/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B' alt='logo' width={"40px"} height={"40px"} />
        <h3>E-Commerce</h3>
       
       <FontAwesomeIcon onClick={() => setIsOpen((prev) => !prev )}
        cursor={"pointer"} icon={faBars} />
      </div> 


      <DropdownButton id="dropdown-basic-button" title={userName}>
      <Dropdown.Item onClick={handelLogout}>Logout</Dropdown.Item> 
    </DropdownButton>
  
 

         </div>
    
     
  )
}