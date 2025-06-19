import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL, LOGIN, R_ADMIN  } from '../../../Api/Api';
import Loading from '../../../Componenets/Loading/Loading';  
import Cookie from 'cookie-universal';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';
 
  
export default function Login(){
 
   
    const [err,seteErr]=useState("");
    const [form,setForm]=useState({
  
      email:"",
      password:"", 

     });
     //Loading 
     const [loading,setLoading] = useState(false);

     //cookies
     const cookie = Cookie();
     //Handle form change

      // focus on input useref

    const focus = useRef("");
     useEffect(() => { focus.current.focus(); }, []);


     
     function handleFormChange(e){
      setForm({...form,[e.target.name]:e.target.value});
     
     }
     // handle submit
async function handleSubmit(e){
  e.preventDefault();
  setLoading(true);
 try {
  const res= await axios.post(`${baseURL}/${LOGIN}`,form);
   setLoading(false);
   const token = res.data.token;
   const role = res.data.user.role;
   const go = role === `${R_ADMIN}` ? "users" : "writer";
   cookie.set('Bearer',token);
   window.location.href = `dashboard/${go}`;
   
 


  } catch (err) {

  if(err.response.status === 401){
    seteErr("Wrong Email Or Password")
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
      <Form  className='form ' onSubmit={handleSubmit}>
     <div className='form-custom'>
      <h1>LOGIN</h1>
    
       <Form.Group     
         className="mb-3" 
         controlId="exampleForm.ControlInput1"
       >

        <Form.Label>Email address</Form.Label>
        <Form.Control
        value={form.email}
        onChange ={handleFormChange }
        type="email"
        name="email"
        ref={focus}
        required
        placeholder="name@example.com" 
        />
        
      
        
      </Form.Group>

      

       <Form.Group  className="mb-3" 
        controlId="exampleForm.ControlInput1"
        >
        <Form.Label >Password</Form.Label>
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
        <a href={`https://e-commece-back-end-vwjl.onrender.com/login-google`}>
        <div className='google-icon-wrapper'>
          <img  
          className='google-icon'
          src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg'
          alt='Sign in with google'
          />
          </div>
         
          <p className='btn-text '>
            <b>Sign in with google</b>
          </p>
       
        
        
        </a>
      </div>


       {err != "" && <span className='error'>{err}</span>  } 
       </div>
      
         </Form>
         </div>
       </div>
      </>
    
      
  );
}


 




  

 

