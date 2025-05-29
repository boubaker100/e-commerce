import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CAT, Product } from "../../../Api/Api";
import Loading from "../../../Componenets/Loading/Loading";
import LoadingIcon from "../../../Componenets/Loading/LodingIcon";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import '../dashboard.css';
import { Button } from "react-bootstrap";


export default function AddProduct() {

    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sent, setSent] = useState(false);
      const [save, setSave] = useState(false);
    const [id, setId] = useState();
    console.log(image);





    const nav = useNavigate();


    const [FormState, setFormState] = useState({

        title: "",
        description: "",
        category: "Select Category",
        About: "",
        price: "",
        discount: "",
        stock: "",


    });

    const dumyForm = {

        title: "dumy",
        description: "dumy",
        category: null,
        About: "About",
        price: 222,
        discount: 0,
        stock: 0,

        
    };

    //get all categories
    useEffect(() => {
        Axios.get(CAT).then((res) => {
            setCategories(res.data);
        })
    }, []);


    //useref

    const inputRef = useRef(null);
    const OpenImage = useRef(null);
    const deleteImagebyID = useRef([]);
    const progress = useRef([]);
    const j = useRef(-1);



    // image upload function
    function handleUploadImage() {
        OpenImage.current.click();
    };

    //fucus 
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // get All Categories 

    useEffect(() => {

        Axios.get(`/${CAT}`)
            .then((res) => {
                setCategories(res.data)
                console.log(res)
            })
            .catch((err) => console.log(err))

    }, []);

    const categoriesShow = categories.map((item, key) =>
        <option key={key} value={item.id}>{item.title}</option>
    );



    // handel submit form 
    const HandelSubmitForm = async () => {
        try {
            const res = await Axios.post(`${Product}/add`, dumyForm);
            setId(res.data.id)
            console.log(res.data.id)

        } catch (err) {
            console.log(err)

        }
    }
    // HandelEdit
    async function HandelEdit(e) {

        e.preventDefault();


        setSave(true);
        try {
            const res = await Axios.post(`${Product}/edit/${id}`, FormState);
            nav("/dashboard/products");

        } catch (err) {
            console.log(err)

        }
    }
    //handle form change

    const handleChange = (e) => {
        setFormState({ ...FormState, [e.target.name]: e.target.value });
        setSent(true);
        if (sent === false)
            HandelSubmitForm();
    }
    // handle image change
    async function handeleImageChange(e) {

        setImage((prev) => [...prev, ...e.target.files]);
        const ImageAsFile = e.target.files;
        const data = new FormData();
        for (let i = 0; i < ImageAsFile.length; i++) {
            j.current++;

            data.append('image', ImageAsFile[i]);
            data.append('product_id', id);

            try {

                const res = await Axios.post("product-img/add", data, {

                    onUploadProgress: (ProgressEvent) => {

                        const { loaded, total } = ProgressEvent;
                        const percent = ((loaded * 100) / total);
                        console.log(progress.current[j.current])
                        if (percent % 10 === 0) {
                            progress.current[j.current].style.width = `${percent}%`;
                        }

                    },

                    // GET ID OF SINGLE IMAGE

                },

                );

                deleteImagebyID.current[j.current] = res.data.id;
                console.log(deleteImagebyID.current[j.current]);

            } catch (error) {


                console.log(error)
            }
        }
    }

    async function handeleDeleteImage(id, img) {
        try {
            setLoading(true);
            console.log("handeleDeleteImage id " + deleteImagebyID.current[id]);

            const res = await Axios.delete(`product-img/${deleteImagebyID.current[id]}`)
            setImage((prev) => prev.filter((imgs) => imgs !== img));
            deleteImagebyID.current = deleteImagebyID.current.filter((imgs) => imgs !== deleteImagebyID.current[id]);
            --j.current;
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)

        }




    }
    const ShowImages = image.map((img, key) =>

        <div className="border p-2 mb-2" key={key}>

            <div className="create-progress mb-2 ">
                <span ref={(e) => (progress.current[key] = e)}
                    className=" progress-bar"
                >
                </span>
            </div>
            <div>


                <div >                  
                        <img src={URL.createObjectURL(img)} alt="" width={"170px"} height={"140px"} />
                </div>
                <p>{(img.size / 1024) < 900 ? (img.size / 1024).toFixed(2) + "KB" :
                    (img.size / 1024 / 1024).toFixed(2) + "MB"}</p>

                <Button style={{
                    width: "60px", height: "30px",
                    fontSize: "small", padding: "5px"

                }}
                    variant="danger"
                    onClick={() => handeleDeleteImage(key, img)}

                >Delete</Button>

            </div>



        </div>

    )




    return (

        <>

            {loading && <Loading />}
            <Form className="bg-white border shadow  w-100 p-3" onSubmit={HandelEdit}>

                {/* create form group to category */}

       <Form.Label className="text-capitalize mb-3 "><h1>Add Product Page</h1></Form.Label>

                <Form.Group className="mb-3" controlId="category" >
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        type="text"
                        value={FormState.category}
                        required
                        name="category"
                        onChange={handleChange}
                        ref={inputRef}


                    >
                        <option selected disabled >Select Category</option>
                        {categoriesShow}

                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3  " controlId=" title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                        placeholder="title..."
                        value={FormState.title}
                        required
                        name="title"
                        onChange={handleChange}
                        disabled={!sent}


                    />
                </Form.Group>

                {/* create form group to description */}

                <Form.Group className="mb-3 custom-form-group" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        placeholder="description..."
                        value={FormState.description}
                        name="description"
                        onChange={handleChange}
                        disabled={!sent}

                    />

                </Form.Group>



                {/* create form group to about */}
                <Form.Group className="mb-3 custom-form-group" controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        placeholder="About..."
                        value={FormState.About}
                        name="About"
                        onChange={handleChange}
                        disabled={!sent}
                    />

                </Form.Group>
                {/* create form group to price */}
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="price..."
                        value={FormState.price}
                        name="price"
                        onChange={handleChange}
                        disabled={!sent}


                    />
                </Form.Group>

                {/* create form group to discount */}
                <Form.Group className="mb-3" controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="number"
                        placeholder="discount..."
                        value={FormState.discount}
                        name="discount"
                        onChange={handleChange}
                        disabled={!sent}
                        required

                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="stock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control 
                         
                        type="number"
                        placeholder="stock..."
                        value={FormState.stock}
                        name="stock"
                        onChange={handleChange}
                        disabled={!sent}

                    />
                </Form.Group>

                {/* create form group to images */}

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        ref={OpenImage}
                        hidden
                        type="file"
                        multiple
                        onChange={handeleImageChange}
                        disabled={!sent}
                    />
                </Form.Group>
                <div>
                    <div
                        onClick={handleUploadImage}
                        className=" 
                d-flex justify-content-center align-items-center flex-column mb-3"
                        style={{ border: !sent ? "3px dashed gray" : "3px dashed #528ac1", cursor: "pointer" }}
                    >

                        <img src={require("../../../Assets/UploadImage.png")}
                            width={"100px"}
                            style={{ filter: !sent ? "grayscale(100%)" : "none" }}
                        />

                        <p style={{ color: !sent ? "gray" : "#528ac1 ", fontWeight: "bold" }}>Upload Image Her</p>



                    </div>



                </div>


                {loading && (
                    <tr>
                        <td colSpan="4" className="text-center">
                            <Loading />
                        </td>
                    </tr>
                )}
                <div
                    style={{ flexWrap: "wrap" }}
                    className="gap-2 d-flex mb-3 w-100">{ShowImages}</div>


                {save ? (<LoadingIcon />) : (<button disabled={

                    FormState.title.length > 1 ?
                        false : true}

                    className="btn btn-primary ">Save</button>)}
            </Form>
        </>

    );
}


