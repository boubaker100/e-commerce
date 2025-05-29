import  { useContext } from 'react'
import TopBar from '../../Componenets/Dashboard/TopBar'
import SideBar from '../../Componenets/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'
import './dashboard.css';
import { Menu } from '../../Context/MenuContext';
 export default function Dashboard() {
  const { IsOpen } = useContext(Menu);

  return (
    <div   className={IsOpen ? 'sidebar-open' : 'sidebar-closed'} >
      <TopBar />
       
      <div   className='dashboard d-flex align-center gap-1 w-100  ' >
       <SideBar />
        
        <div className='main-content dashboard d-flex align-center gap-1 w-100 '> 
          <Outlet />
        </div>
        
       
      </div>

    </div>
  );
}

