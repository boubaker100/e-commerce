import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import Product from "../Product/SaleProduct/CardProduct";
export default function Landing() {
  return (
    <div >
      <div className="mb-3  hand  bg-light" >
        <Container>
          <div className=" d-flex flex-column align-items-center justify-content-center vh-100 ">
            <h1 className="font-weight-bold  " style={{ fontFamily: "fantasy" }}>Welcome to Our Website</h1>
            <Link to='/shop'
              className="btn btn-primary py-3 text-white font-weight-bold  px-4  mt-3"
            >Shop Now</Link>
          </div>
        </Container>

      </div>


    </div>


  )
}