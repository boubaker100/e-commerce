
import { useEffect, useState } from 'react'
import { CAT, Category } from '../../../Api/Api'
import { Link } from 'react-router-dom'
import { Axios } from '../../../Api/Axios'
import TableShow from '../../../Componenets/Dashboard/Table'

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState();


  useEffect(() => {

    setLoading(true)
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCategories(res.data.data)
        console.log(res)
        setTotalData(res.data.total)

      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })



  }, [limit, page]);

  const header = [
    {
      key: "title",
      name: "Title"
    },
    {
      key: "image",
      name: "image"
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
      const res = await Axios.delete(`${Category}/${id}`);

      setCategories((prev) => prev.filter((user) => user.id !== id));
      
      // eslint-disable-next-line
    } catch (error) {
      console.log(error)
      alert('Failed to delete Category')
    }

  }







  return (

    <div className='bg-white w-100 p-3'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1>Categories Page</h1>
        <Link to={'/dashboard/categories/add'} className='btn btn-primary'>Add Categories</Link>
      </div>


      <TableShow header={header}
        data={Categories}
        delete={HandelDelete}
        showDelete={true}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        totalData={totalData}
        loading={loading}
        search="title"
        searchLink={Category}
        setTotalData={setTotalData} // تمرير setTotalData




      />
    </div>


  )
}


