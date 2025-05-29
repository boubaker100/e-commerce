import NavBar from '../../Componenets/Website/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function Website() {
  return (
    <div>     
     <NavBar/>
     <Outlet/>
     
    </div>
  )
}


