 import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL, REGISTER } from '../../../Api/Api';
import Loading from '../../../Componenets/Loading/Loading';  
import Cookie from 'cookie-universal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function Register(){
     
      const [err,seteErr]=useState("");
      const [form,setForm]=useState({
  
      name:"",
      email:"",
      password:"",
     });
     //Loading 
     const [loading,setLoading] = useState(false);
     //navigate 
     const navigate = useNavigate();
     // focus on input useref
       const focus = useRef("");
       useEffect(() => {
         focus.current.focus();
       }, []);
     

     // cookies
     const cookie = Cookie();
      //Handle form change
     
     function handleFormChange(e){
      setForm({...form,[e.target.name]:e.target.value});
     
     }
     // handle submit
async function handleSubmit(e){
  e.preventDefault();
  setLoading(true);
 try {
   const res=  await axios.post(`${baseURL}/${REGISTER}`,form);
   setLoading(false);

   const token = res.data.token;
   cookie.set('Bearer',token);
   navigate("/",{replace:true});
   

   console.log(res)
   
 } catch (err) {

  if(err.response.status === 422){
    seteErr("Email is already been token")
    setLoading(false);



  }else{
    seteErr("enternal server ERR");
 
  }
  
 }


}
     //Render Data
     
     
       return (
    <> 
    {loading && <Loading/> }
    <div className='container'>
     
     <div className='row' style={{height:"100vh"}}>
     <Form  className='form' onSubmit={handleSubmit}>
     <div className='form-custom'>
     <h1>LOGIN</h1>
   
   
     <Form.Group     
        className="mb-3" 
        controlId="exampleForm.ControlInput1"
      >

       <Form.Label className='label'>Name</Form.Label>
       <Form.Control
       value={form.name}
       onChange ={handleFormChange }
       type="text"
       name="name"
       placeholder="Enter Name" />
     
     </Form.Group>


      <Form.Group     
        className="mb-3" 
        controlId="exampleForm.ControlInput1"
      >

     <Form.Label className='label' >Email address</Form.Label>
 
       <Form.Control
       value={form.email}
       onChange ={handleFormChange }
       type="email"
       name="email"
       placeholder="name@example.com"
       ref={focus}
        />
       
     </Form.Group>

     

      <Form.Group  className="mb-3" 
       controlId="exampleForm.ControlInput1"  

       >   
        <Form.Label className='label'>Password</Form.Label>
       <Form.Control
         value={form.password}
         onChange={handleFormChange }
         minLength="6" 
         required
         type="password" 
         name='password'
         placeholder="Password" /> 
      
 
       
      </Form.Group>

     
    
      <button className='btn btn-primary' type='submit'>Login</button>
     <div  className='google-btn' >
       <a href="http://127.0.0.1:8000/login-google">
       <div className='google-icon-wrapper'>
         <img  
         className='google-icon'
         src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg'
         alt='Sign in with google'
         />
         </div>
        
         <p className='btn-text'>
           <b>Sign in with google</b>
         </p>
      
       </a>
     </div>


      {err !== "" && <span className='error'>{err}</span>  } 
      </div>
     
      </Form>
      </div>
      </div>
           
       </>
    
      
  );
}


