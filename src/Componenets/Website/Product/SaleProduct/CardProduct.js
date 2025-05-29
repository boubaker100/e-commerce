import Card from 'react-bootstrap/Card';

import { Button, NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Product(props) {


    const roundStars = Math.round(props.rating);
    const stars = Math.min(roundStars, 5);
    const showGoldStars = Array.from({ length: stars }).map((_, index) => (
        <FontAwesomeIcon key={index} style={{ color: 'gold' }}
            icon={solidStar} />
    ));
    const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
        <FontAwesomeIcon key={index} icon={regularStar} />
    ));

    return (


        <Card style={{ width: '18rem' }}>

            <NavLink as={Link} to={`/product/${props.id}`} className=' text-decoration-none text-black'>

                <Card.Body>
                    <Card.Title className='fw-bold text-truncate'
                    >{props.title}</Card.Title>
                    <span style={{ width: 60, height: 60, borderRadius: 50, }}
                        className="tw-bold position-relative text-center d-flex justify-content-center align-items-center  badge rounded-pill bg-danger">
                        Sale!
                    </span>
                    <Card.Img style={{ width: 170, height: 170 }}
                        className='img-fluid rounded mx-auto d-block' src={props.image} />
                    <Card.Text>
                        {props.description}
                    </Card.Text>

                </Card.Body>
                <Card.Body className='d-flex justify-content-between align-items-center'>



                    <Button variant="primary">Buy Now</Button>
                    <div >

                        {showGoldStars}
                        {showEmptyStars}
                        <div className='d-flex flex gap-4'>
                            <span  className=' text-decoration-line-through text-secondary fw-bold'>{props.price}$</span>
                            <span className='text-success fw-bold'>{props.discount}$</span>
                       </div>
                    </div>

                </Card.Body>


            </NavLink>
        </Card>


    )

}


