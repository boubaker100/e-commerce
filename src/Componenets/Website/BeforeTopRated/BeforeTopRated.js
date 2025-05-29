import React from 'react'
import './BeforeTopRated.css';
import { Link } from 'react-router-dom';

const BeforeTopRated = () => {
    return (
        <>
            <div className='my-5 pc'>
                <div style={{ left: '70%',top:'30%' }} className='position-absolute text-white text-center mt-5  ' >
                    <h1 >Laptops</h1>
                    <p className='text-center  text-white'>Acer , Dell , HP ,toshiba , Lenovo ..ext</p>
                    <Link to='/shop'
                        className="btn btn-primary py-3 text-white font-weight-bold  px-4  mt-3"
                    >Shop Now</Link>
                </div>


            </div>
        </>
    )
}

export default BeforeTopRated
