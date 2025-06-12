import React from 'react'
import { Latest } from '../../../../Api/Api';
import { Axios } from '../../../../Api/Axios';
import SkeletonFunction from '../../../../helpers/SkeletonFunction';
import Product from '../SaleProduct/CardProduct';

export default function LatestProduct() {
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([])
    console.log(products);

    React.useEffect(() => {
        Axios.get(`/${Latest}`).then((res) => {
            setProducts(res.data)
            
        }).finally(() => {
            setLoading(false); 
        })
    }, [])

    const productsShow = products.map((product) => (
        <Product key={product.id}
            title={product.title}
            description={product.description}
            image={product.images?.[0]?.image
            ? product.images[0].image
            : 'https://picsum.photos/seed/7/640/480'}         
            sale={product.sale}
            price={product.price}
            discount={product.discount}
            rating={product.rating}
            id={product.id}
        />
    ));

    return (
        <div className='row bg-light d-flex justify-content-space-between flex-wrap gap-2  '>
            <h1 className='fw-bold text-center py-3'>Latest Products</h1>
            <div className='d-flex flex-wrap gap-2 row'>
                {loading ? (
                    <div className='d-flex justify-content-center align-items-center flex-wrap gap-2'>
                        {SkeletonFunction({ width: "300px", height: "400px", array: Array(3).fill(null) })}
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
