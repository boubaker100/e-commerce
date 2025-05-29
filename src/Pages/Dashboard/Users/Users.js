

import React, { useEffect, useState } from 'react'
import { USER, USERS } from '../../../Api/Api'
import { Link } from 'react-router-dom'
import { Axios } from '../../../Api/Axios'
import TableShow from '../../../Componenets/Dashboard/Table'
import Loading from '../../../Componenets/Loading/Loading'
export default function Users() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState()
  

  const [page, setPage] = useState(1);



  useEffect(() => {
    
    Axios.get(`${USER}`)
      .then((data) => {
        setCurrentUser(data.data)
        console.log(data)
      })
      .catch(err => console.log(err))




  }, []);


  useEffect(() => {

    setLoading(true)
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data)
        setTotalData(data.data.total)
        console.log(data.data)
      })
      .catch((err) => console.log(err)).finally(() => {
        setLoading(false)
      }
      )



  }, [limit, page]);

  if (loading) { return <Loading />; }


  async function HandelDelete(id) {

    try {
      const res = await Axios.delete(`/${USER}/${id}`)

      setUsers((prev) => (prev.filter((user) => user.id !== id)))
      console.log(res)





      // eslint-disable-next-line
    } catch (error) {
      console.log(error)
      alert('Failed to delete user')
    }

  }



  const header = [


    {
      key: "name",
      name: "Name",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
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


  return (

    <div  className='bg-white w-100 p-3 '>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1>Users Page</h1>
        <Link to={'/dashboard/user/add'}
          className='btn btn-primary'>
          Add User
        </Link>
      </div>

      <TableShow
      
        header={header} data={users}
        currentUser={currentUser}
        delete={HandelDelete}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        totalData={totalData}
        search="name"
        searchLink={USER}
        



      />
    </div>


  )
}


