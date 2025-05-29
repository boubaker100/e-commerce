import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CAT, Category } from "../../../Api/Api";
import Loading from "../../../Componenets/Loading/Loading";
import LoadingIcon from "../../../Componenets/Loading/LodingIcon";
import { useRef } from "react";
export default function AddCategories() {

    const [loading, setLoading] = useState(false);

  
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");

    //focus on input useref
    const inputRef = useRef(null);
    React.useEffect(() => {
        inputRef.current.focus();
    }, []);
    // image upload function
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);


    async function HandelSubmit(e) {


        e.preventDefault();
        setLoading(true);
        try {
            const res = await Axios.post(`${Category}/add`, form);
            window.location.href = "/dashboard/categories";

        } catch (err) {

            console.log(err)
            setLoading(false);
        }


    }

    return (
        <>
            {loading && <Loading />}
           
           
            <Form  className="bg-white  border r w-100 p-3 " onSubmit={HandelSubmit}>
           
                <Form.Label className="text-capitalize mb-3 "><h1>Add Category Page</h1></Form.Label>
               
                <Form.Group className="mb-3  "
                    controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                        placeholder="title..."
                        value={title}
                        required
                        ref={inputRef}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleImageChange}
                        required
                    />
                </Form.Group>

               



                <button disabled={
                    title.length > 1 ?
                        false : true}
                        
                        className="btn btn-primary ">Save</button>
            </Form>
        </>

    );
}

