import './HomePage.css';

import Landing from "../../../Componenets/Website/Landing/Landing";
import LatestSaleProduct from "../../../Componenets/Website/Product/SaleProduct/LatestSaleProduct";
import BeforeTopRated from '../../../Componenets/Website/BeforeTopRated/BeforeTopRated';
import TopRated from '../../../Componenets/Website/Product/TopRatedProduct/TopRated';
import LatestProduct from '../../../Componenets/Website/Product/LatestProduct/LatestProduct';

export default function HomePage() {

  return (

    <div  >
      <Landing />
       <LatestSaleProduct />
      <BeforeTopRated />

      <div   className='d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4 mt-5'>
         
       <TopRated />
       <LatestProduct />

      </div>


    </div>


  )
}


