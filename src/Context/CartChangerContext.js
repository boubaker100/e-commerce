import  { createContext } from 'react'
import { useState } from 'react'; 
export const  Cart = createContext("");

export default function CartChanger({children}){
   const [IsChange,setIsChange] =useState(false);
   return <Cart.Provider value={{IsChange,setIsChange}}>{children}</Cart.Provider>;

}