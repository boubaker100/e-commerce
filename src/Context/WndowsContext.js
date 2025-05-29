import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export const WindowsSize = createContext(null);

export default function WndowsContext ({children}) {
 
 const[windowsSize,setWindowsSize]=useState(window.innerWidth);
 useEffect(()=> {

 function setWindowsWidth(){
  
    setWindowsSize(window.innerWidth);

 } 
 
 window.addEventListener("resize",setWindowsWidth)
//  CCleanUP Function
 return ()=>{
   window.removeEventListener("resize",setWindowsWidth);
 };

  },[]);

 return(
     <WindowsSize.Provider
      value={{windowsSize,setWindowsSize}}>
      {children}
      </WindowsSize.Provider>
 );
}


