import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'
import { USER } from '../../../Api/Api';
import Loading from '../../../Componenets/Loading/Loading';
import { Axios } from '../../../Api/Axios';
import Page403 from '../Errors/Page403';



export default function RequirAuth({allowedRole}) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
  Axios.get(`/${USER}`)
        .then((data) => setUser(data))
        .catch(() => navigate("/login", { replace: true }))
},[]); 


const cookie = Cookie();
const token = cookie.get("Bearer");

return token ? 
(
  user === "" ? (<Loading />)
  : 
  allowedRole.includes(user.data.role) ? 
  (<Outlet />)
  :
   <Page403 role={user.data.role}/>
   
  ):(
  <Navigate to={"/login"} replace={true} />
  );
}


