import React, { useContext, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { CART, Product } from '../../../Api/Api';
import { Axios } from '../../../Api/Axios';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import SkeletonFunction from '../../../helpers/SkeletonFunction';
import { Cart } from '../../../Context/CartChangerContext';
import QuantityCounter from '../../../Componenets/Website/Btns/QuantityCounter';
const SingleProduct = () => {
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState([])
    const [image, setImage] = useState([]);
    const [error, setError] = useState("");
    const [loadingcart, setLoadingcart] = useState(false);
    const [quantity, setQuantity] = useState(5);
    const { id } = useParams();
    const { setIsChange } = useContext(Cart);



    React.useEffect(() => {
        Axios.get(`/${Product}/${id}`).then((res) => {
            console.log(res.data);
            setImage(res.data[0].Images.map((img) => { return { original: img.image, thumbnail: img.image } }));
            setProducts(res.data[0]);

        }).finally(() => {
            setLoading(false);// يجب أن تكون false وليس true
        })
    }, [])

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        const stars = Array.from({ length: fullStars }, (_, i) => (
            <FaStar key={`full-${i}`} color="#ffc107" />
        ));
        stars.push(
            ...Array.from({ length: emptyStars }, (_, i) => (
                <FaRegStar key={`empty-${i}`} color="#ccc" />
            ))
        );
        return stars;
    };
const checkStock = async () => {
  try {
    setLoadingcart(true);

    const getItems = JSON.parse(localStorage.getItem("products")) || [];
    const existingItem = getItems.find(item => item.id == id);
    const productQuantity = existingItem ? existingItem.quantity : 0;

    await Axios.post(`${CART}/check`, {
      product_id: products.id,
      count: quantity + productQuantity,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    setLoadingcart(false);
  }
};

const handelSave = async () => {
  const check = await checkStock();
  if (check) {
    const getItems = JSON.parse(localStorage.getItem("products")) || [];
    const existingIndex = getItems.findIndex(item => item.id == id);

    if (existingIndex !== -1) {
      getItems[existingIndex].quantity += quantity;
    } else {
      getItems.push({ ...products, quantity });
    }

    localStorage.setItem('products', JSON.stringify(getItems));
    setIsChange(prev => !prev);
  }
};

    return (

        <Container className='mt-5 mb-5'>
            <div className='d-flex  flex-wrap gap-3'>
                {loading ? (SkeletonFunction({ width: "300px", height: "400px", array: Array(1).fill(null) })) :

                    <div className='col-md-5 col-lg-4 '>
                        <ImageGallery items={image} />
                    </div>}
                <div className='col-md-6 col-lg-6'>

                    <div className='ms-3 '>
                        {loading ? (SkeletonFunction({ width: "400px", height: "50px", array: Array(3).fill(null) })) :
                            <div > <h1 className='fw-bold'>{products.title}</h1>
                                <p className='text-muted'>{products.description}</p>
                                <h3 className='text-muted'>{products.About}</h3>
                            </div>}
                        <div className='border-top mt-3 pt-3  ' >
                        </div>
                        {loading ? (SkeletonFunction({ width: "100px", height: "50px", array: Array(3).fill(null) })) : <div>
                           {products.stock === 1 && <div className="mb-2" >
                            <p className='text-success'>There is only 1 Left</p>
                             </div>}
                            <div className='d-flex justify-content-between gap-5'>

                                <div className='d-flex flex-column gap-2'>
                                    <span className="text-warning">{renderStars(products.rating)}</span>
                                    <div className='d-flex gap-5 align-items-center '>
                                        <div className="d-flex gap-3 ">
                                            <span className= ' text-secondary text-decoration-line-through'>{products.price}$</span>
                                            <span className='fw-bold text-success'> {products.discount}$</span>
                                        </div>
                                        <div>
                                            <span className='' ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className=' d-flex gap-1 align-items-center justify-content-between'>
                                  <div >
                                    <QuantityCounter setQuantity={(data) => setQuantity(data)} />
                                  </div>  
                                  {loadingcart ? ("Loading..."

                                    ) : (
                                       
                                        <img style={{ cursor: "pointer" }}
                                            onClick={handelSave}  width={30}
                                            src={require("../../../Assets/shopping-cart.png")} alt="Logo"
                                        />
                                       
                                        )}
                                </div>
                            </div>

                        </div>}
                    </div>


                </div>
            </div>

        </Container >

    )
}

export default SingleProduct
