import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Css/Component/LoadingIcon.css';
import './Css/Component/Loading.css';
import './Css/Component/Alert.css';
import './Css/Component/Google.css';
import './Css/Component/button.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pages/Auth/Auth.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowsContext from'./Context/WndowsContext';
import CartChanger from './Context/CartChangerContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode> 
   <WindowsContext>
     <MenuContext>
      <CartChanger>
       <Router>
        <App />
       </Router>
       </CartChanger>
      </MenuContext>
    </WindowsContext>
  </React.StrictMode>
);

 
