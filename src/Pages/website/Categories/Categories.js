import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Axios } from '../../../Api/Axios';
import { CAT } from '../../../Api/Api';
import NavBar from '../../../Componenets/Website/NavBar/NavBar';
import FunctionSlice from '../../../helpers/FunctionSlice';
import Skeleton from 'react-loading-skeleton';
import SkeletonFunction from '../../../helpers/SkeletonFunction';

export default function WebsiteCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((res) => {
                setCategories(res.data);
                console.log(res.data);
            }).finally(() => {
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const categoriesShow = categories.map((item, index) => {
        return (


            <div key={index} className='col-lg-1 col-md-6 col-12 bg-transparent border-0' >
                <div className=' m-1 gap-2 h-100 col-2 py-3 rounded d-flex align-items-center justify-content-center'>
                    <img width={50} src={item.image} alt="Logo" />
                    <p className='text-center'>
                        {FunctionSlice(item.title, 8)}
                    </p>
                </div>
            </div>

        );
    });

    return (
        <>

            <nav className="bg-secondary py-5 d-flex align-items-center justify-content-center">
                <Container>

                    {loading ? (
                        <div className='d-flex justify-content-center align-items-center flex-wrap gap-4 col-12'>
                           {SkeletonFunction({ width: 50, height: 50, array: categoriesShow})}
                        </div>
                    ) : (
                        <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 col-12">
                            {categoriesShow}
                        </div>
                    )}
                </Container>
            </nav>
        </>
    );
}


