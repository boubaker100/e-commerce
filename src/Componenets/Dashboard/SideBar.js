import React, { useContext } from 'react'
import './bars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Menu } from '../../Context/MenuContext';
import { WindowsSize } from '../../Context/WndowsContext';
import { USER } from '../../Api/Api';
import { useEffect, useState } from 'react';
import { Axios } from '../../Api/Axios';
import { links } from './NavLink';

export default function SideBar() {

  const [user, setUser] = useState([]);
  const menu = useContext(Menu);
  const WndowsContext = useContext(WindowsSize)
  const IsOpen = menu.IsOpen;
  const windowsSize = WndowsContext.windowsSize;

  useEffect(() => {

    Axios
      .get(`/${USER}`)
      .then((data) => {
        setUser(data.data);
        console.log(data.data);
      })
      .then(() => console.log(user.role))
      .catch((err) => console.log(err))


  }, []);


  return (
    <div
     
      className=' side-bar px-2 d-flex flex-column align-items-center4 gap-3  '
      style={{
        left: windowsSize < "768" ? (IsOpen ? 0 : "0%") : 0,
        width: IsOpen ? '270px' : 'fit-content',

        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',


      }}

    >

      {links.map((link, index) =>

        link.role.includes(user.role) &&
        <NavLink to={link.link}
        end
          key={index}

          role={link.role}

          className={'d-flex align-items-center gap-2 side-bar-link  '}>
          <FontAwesomeIcon style={{
            padding: IsOpen ? "10px 10px 10px 15px" : "0px 0px",









          }}
            icon={link.icon}
          />

          <p className='m-0 '
            style={{
              display: IsOpen ? 'block' : 'none',

              whiteSpace: 'nowrap',

            }}
          >{link.name}</p>
        </NavLink>


      )}





    </div>
  )
}
