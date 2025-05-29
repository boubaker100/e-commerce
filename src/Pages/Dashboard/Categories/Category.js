/*************  ✨ Codeium Command ⭐  *************/
import React, { useEffect, useState } from "react";
import { Form, Toast } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import Loading from "../../../Componenets/Loading/Loading";
import {useNavigate, useParams} from "react-router-dom";
import { CAT, Category } from "../../../Api/Api";

export default function UpdateCategory(){
    const [category, setCategory] = useState({});
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   
    const {id} = useParams();
    

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await Axios.get(`${Category}/${id}`);
                setTitle(res.data.title);
                setImage(res.data.image);
                setLoading(false);
                setDisabled(false);
                

            } catch (error) {
                setLoading(false);
                console.log(error);
    
        }})();
    }, [id, navigate]);

    if (loading) {
        return <Loading/>;
    }

    const handleUpdate = async (e) => {
        try {
        
            e.preventDefault();
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", image);

            await Axios.post(`${Category}/edit/${id}`, formData);
            setLoading(false);
            navigate("/dashboard/categories");
         } catch (error) {
            console.log(error);
            setLoading(false);
          }  
      
  
    };
    return (
        <div >
            <h1>Category {category.title}</h1>
            <hr/>
            <Form   onSubmit={handleUpdate}
              className=" bg-white mx-2 w-100 p-3 ">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                     onChange={(e) => setTitle(e.target.value)}
                     type="text"
                     value={title}  
                     placeholder="Enter title"
                     required
                     
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                     type="file" 
                     onChange={(e) => setImage(e.target.files[0])} 
                     placeholder="Upload Image"
                     disabled={disabled}
                     

                     required
 
                        
                    /> 
                
                 </Form.Group>
                <button  
            className="btn btn-primary">Update Category</button>

             </Form>
        </div>
    )
} 

/******  4a451490-30c5-40c4-a907-ca8b4c738287  *******/
    