import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Componenets/Loading/Loading";
import {useNavigate } from "react-router-dom";

export default function User() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(true);
    const[loading, setLoading] = useState(false); 
    const [role,setRole]  =useState("");


    const nav = useNavigate();
    
    const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

    useEffect(()=>{ 
    
        setLoading(true);
 
        Axios.get(`${USER}/${id}`)
        
       .then((res) => {  
                     
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role); 
        setLoading(false);
        
        
    }).then(() => setDisabled(false)  ) 
    .catch(() => nav('/dashboard/users/page/404',{replace:true}) );

},[]);



async function HandelSubmit(e){
     
      e.preventDefault();
      setLoading(true);
     try {
    const res= await Axios.post(`${USER}/edit/${id}`, {name , email, role});
    window.location.href = "/dashboard/users";
    }catch (err) {
    
        console.log(err)
        setLoading(false);
     } 
     

 }
    return (
     <Form className="bg-white mx-2 w-100 p-3" onSubmit={HandelSubmit}>
        {loading && <Loading/> }
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           
            <Form.Label>Name:</Form.Label>
            <Form.Control
             type="text" 
             value={name}
             required
             onChange={(e) => setName(e.target.value)}
             placeholder="Enter your Name" 
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email:</Form.Label>
            <Form.Control
             type="text" 
             value={email}
             required
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Enter your Email" />
        </Form.Group>  


       <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Role</Form.Label>
                        
         <Form.Select
          value={role}
          onChange={(e) => setRole(e.target.value)}>
        
          <option disabled value={""} selected >Select Role</option>
          <option value="1995">Admin</option>
          <option value="1996">Writer</option> 
          <option value="2001">User</option>
         
          </Form.Select> 
         </Form.Group>
        <button disabled={disabled} className="btn btn-primary " >Save</button>
     </Form>
    );
}
