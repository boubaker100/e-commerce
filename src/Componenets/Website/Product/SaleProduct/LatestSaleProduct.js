import React from 'react'
import { LatestSale } from '../../../../Api/Api';
import { Axios } from '../../../../Api/Axios';
import Product from './CardProduct';
import SkeletonFunction from '../../../../helpers/SkeletonFunction';

export default function LatestSaleProduct() {

    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([])
    console.log(products);

    React.useEffect(() => {

        Axios.get(`/${LatestSale}`).then((res) => {

            setProducts(res.data)

        }).finally(() => {
            setLoading(false);
        })


    }, [])
    const productsShow = products.map((product) =>

        <Product key={product.id}
            title={product.title}
            description={product.description}
            image={product.images[0].image}
            sale={product.sale}
            price={product.price}
            discount={product.discount}
            rating={product.rating}
            id={product.id}

        />
    );

    return (
        <div className=' bg-light  d-flex justify-content-space-between flex-wrap  gap-2 row '>
            <h1 className=' fw-bold py-5 text-center'>Latest Sale Products</h1>
            <div className=' d-flex  flex-wrap gap-2 row '>
                {loading ? (
                    <div className='d-flex justify-content-center
                     align-items-center flex-wrap gap-2  '>
                        {SkeletonFunction({ width: "300px", height: "400px", array: products })}
                    </div>
                ) : products.length === 0 ? (
                    <h1 className='fw-bold my-3'>No Products</h1>
                ) : (
                    productsShow
                )}
            </div>



        </div>
    )
}

