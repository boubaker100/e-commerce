import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Axios } from '../../../Api/Axios';
import { CAT } from '../../../Api/Api';
import FunctionSlice from '../../../helpers/FunctionSlice';
import SkeletonFunction from '../../../helpers/SkeletonFunction';
import Modal from 'react-bootstrap/Modal';
import { Cart } from '../../../Context/CartChangerContext';
import { Container, Form, Button, Dropdown, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import QuantityCounter from '../Btns/QuantityCounter';
import userImg from "../../../Assets/user.png";
export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { IsChange } = useContext(Cart);
  console.log(product);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((res) => {

        setCategories(res.data.slice(-8));
        console.log(res.data.slice(-8));

      }).finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);
  const handelDelete = (id) => {
    const filterProduct = product.filter((item) => item.id !== id);
    console.log(filterProduct);
    setProduct(filterProduct);
    localStorage.setItem("products", JSON.stringify(filterProduct));

  }



  const categoriesShow = categories.map((category) => (

    <Link to={`/categories/${category.id}`}
      className="text-decoration-none fw-bold text-black">
      <div>
        {category.title}
      </div>
    </Link>
  ));

  useEffect(() => {
    const filterProduct = JSON.parse(localStorage.getItem("products"));
    setProduct(filterProduct);

  }, [IsChange]);

const changeQuantity= (id,btn)=>{
    const filterProduct = JSON.parse(localStorage.getItem("products"));
    const findProduct = filterProduct.find((item) => item.id === id);
    findProduct.quantity = btn;
    localStorage.setItem("products", JSON.stringify(filterProduct));
  };

  const productCartShow = product?.map((product, key) => (


    <div key={key} className="border mt-2 gap-1 d-flex">
        <div>
        <img className='m-1 border' width={140} height={100} src={product.images[0].image} alt="" />
          <div className='flex-column '>
             <QuantityCounter changeQuantity={changeQuantity} id={product.id} quantity={product.quantity || 1} setQuantity={setQuantity} />
          </div>
          </div>
      <div className=" d-flex  gap-1">
        <div className="d-flex flex-column ">


          <div className='text-muted ' >
            <p className='fw-bold '>{product.title}</p>
            <p className='text-muted mb-0'>{product.description}</p>
          </div>
        <div className=" d-flex  gap-5">
          <div className='d-flex gap-3 '>

            <p className=' text-muted text-decoration-line-through'>{product.price}$</p>

            <p className='fw-bold text-primary'>{product.discount}$</p>

          </div>
      
          </div>
        </div>
        <div>
          <div  onClick={() => (handelDelete(product.id))}
            className="position-absolute  bg-danger text-white rounded-circle 
          d-flex justufy-content-center align-items-center "style={{right:"18px", cursor: "pointer",width:"20px",  height: "20px" }} >
            <FontAwesomeIcon width={"20px"}  icon={faXmark} />
          </div>

        </div>
      </div>
    </div>



  ))


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productCartShow}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>




      <nav className="py-3 bg-light">
       
          <div className="d-flex flex-wrap align-items-center justify-content-between mx-5">

            {/* الشعار */}
            <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
              <Link to="/">
                <img width={100} src={require("../../../Assets/HomeLogo.png")} alt="Logo" />
              </Link>
            </div>

            {/* مربع البحث */}
            <div className="col-12 col-md-6 mb-3 mb-md-0 d-flex justify-content-center">
              <Form className="d-flex w-100" style={{ maxWidth: "500px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-1"
                  style={{
                    boxShadow: "none",
                    borderRadius: "0px",
                    height: "55px"
                  }}
                />
                <Button
                  type="submit"
                  className="border-0"
                  style={{
                    borderRadius: "0px",
                    height: "55px"
                  }}
                >
                  Search
                </Button>
              </Form>
            </div>

            {/* أيقونات المستخدم والسلة */}
            <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end gap-3">
              {/* سلة التسوق */}
              <div onClick={handleShow} style={{ cursor: "pointer" }}>
                <img width={40} src={require("../../../Assets/shopping-cart.png")} alt="Cart" />
              </div>

              {/* أيقونة المستخدم */}



             
       <Dropdown>
      <Dropdown.Toggle style={{ cursor: "pointer" }} as="div" arrow={false} variant="" id="dropdown-basic">
     <img width={40} src={userImg} alt="Cart" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
  
        <Dropdown.Item href="/login">Login</Dropdown.Item>
        <Dropdown.Item href="/register">Register</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
              



            </div>

          </div>
     
      </nav>

      {loading ? (
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-5">
          {SkeletonFunction({ width: "100px", height: "30px", array: categoriesShow })}
        </div>
      ) : (
        <nav className="navbar navbar-light bg-light mt-3">
          <div className=" container-fluid d-flex flex-wrap align-items-center  gap-3">


            <div className="  d-flex flex-wrap align-items-center gap-5">
              {categoriesShow}
            </div>


            <div className="  d-flex btn  p-0">
              <Link className="fw-bold bg-primary text-decoration-none m-0 text-white p-2"
                to="/categories">
                Show All categories
              </Link>
            </div>
          </div>
        </nav>
      )}

    </>

  );

}