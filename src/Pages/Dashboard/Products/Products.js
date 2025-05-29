import { useEffect, useState } from 'react'
import { Product, PROD } from '../../../Api/Api'
import { Link } from 'react-router-dom'
import { Axios } from '../../../Api/Axios'
import TableShow from '../../../Componenets/Dashboard/Table'

export default function Products() {
  const [Products, setProducts] = useState([]);
  let [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState()
 

  useEffect(() => {

    
    setLoading(true)
    Axios.get(`/${PROD}?limit=${limit}&page=${page}`)
      .then((res) => {
        
        setProducts(res.data.data)
        setTotalData(res.data.total)

      })

      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })



  }, [limit, page]);

  const header = [

    {
      key: "images",
      name: "images"
    },
    {
      key: "title",
      name: "Title"
    },
    {
      key: "price",
      name: "Price"
    },
    {
      key: "description",
      name: "Description"
    },

    {
      key: "rating",
      name: "Rating"
    },
    {
       key: "created_at",
       name: "Created"
    },  
    {
       key: "updated_at",
       name: "Updated"
    },

  ];

  async function HandelDelete(id) {

    try {
      const res = await Axios.delete(`${Product}/${id}`);

      setProducts((prev) => prev.filter((user) => user.id !== id));
      console.log(res.data.data)
      alert('Product deleted successfully')
      // eslint-disable-next-line
    } catch (error) {
      console.log(error)
      alert('Failed to delete Product')
    }

  }

  return (

    <div className='bg-white border w-100 p-3'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1>Product Page</h1>
        <Link to={'/dashboard/product/add'}
          className='btn btn-primary'>
          Add Products
        </Link>
      </div>
      <TableShow 
        header={header}
        data={Products}
        delete={HandelDelete}
        showDelete={true}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        totalData={totalData}
        loading={loading}
        search="title"
        searchLink={Product}
        
      />

    </div>


  )
}
