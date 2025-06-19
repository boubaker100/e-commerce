import React from 'react';
import { TopRatedProduct } from '../../../../Api/Api';
import { Axios } from '../../../../Api/Axios';
import SkeletonFunction from '../../../../helpers/SkeletonFunction';
 import { Button, Card } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function TopRated() {
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);
   
    React.useEffect(() => {
        Axios.get(`/${TopRatedProduct}`)
            .then((res) => {
                setProducts(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
    console.log(products);

    const productsShow = (
        <Card className="mx-5 d-flex flex-column gap-2 p-3" style={{ width: '500px' }}>
            <h3 className="bg-primary py-3 text-white fw-bold mb-3 text-center"> Top Rated</h3>
            {products.map((product) => (
             <NavLink to={`/products/${product.id}`}>
                    <div
                        key={product.id}
                        className="d-flex  align-items-center border rounded p-4 gap-3"
                        style={{ background: '#f9f9f9' }}
                    > <img                        
                        src={product.images && product.images.length > 0 ? product.images[0].image : 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=No+Image'}
                        alt={product.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />

                        <div className="flex-grow-1 d-flex flex-column align-items-center align-items-md-start ">
                            <h5 className="mb-1 text-primary">{product.title.slice(0, 13)}</h5>
                            <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                                {product.description.slice(0, 80)}
                            </p>
                            <div className="mb-1">
                                <span className="text-warning">{renderStars(product.rating)}</span>
                            </div>
                            <div>
                                <span className=" text-primary" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                                    {product.price - product.discount}$
                                </span>
                                <span style={{ textDecoration: 'left', color: '#999' }}>
                                    {product.price} $
                                </span>
                            </div>
                        </div>
                        <div className=" mt-2 mt-md-0">
                            <Button style={{ width: "70px", height: "30px" }} variant="success" size="sm">Buy Now</Button>
                        </div>
                    </div>
                </NavLink>
            ))}

        </Card>
    );

    return (
        <div className="col-md-4.5 mt-4 px-2 d-flex justify-content-start">
            {loading ? (
                <div className="d-flex justify-content-center
                 align-items-center flex-wrap  mt-5">
                    {SkeletonFunction({ width: '400px', height: '200px', array: products })}
                </div>
            ) : products.length === 0 ? (
                <h1 className="fw-bold my-3 text-center">لا توجد منتجات</h1>
            ) : (
                productsShow
            )}
        </div>
    );
}
