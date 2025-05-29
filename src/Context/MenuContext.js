import React, { createContext } from 'react'
import { useState } from 'react'; 
export const  Menu = createContext("");

export default function MenuContext({children}){
   
    const [IsOpen,setIsOpen] =useState(false);
    return <Menu.Provider value={{IsOpen,setIsOpen}}>{children}</Menu.Provider>;
  
}

 