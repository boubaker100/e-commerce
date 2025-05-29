import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/website/HomePage/HomePage';
import Login from './Pages/Auth/AuthOperations/Login';
import Register from './Pages/Auth/AuthOperations/Register';
import User from './Pages/Dashboard/Users/User';
import Users from './Pages/Dashboard/Users/Users';
import GoogleCallBack from './Pages/Auth/AuthOperations/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequirAuth from './Pages/Auth/Protecting/RequirAuth';
import AddUser from './Pages/Dashboard/Users/AddUser';
import Page403 from './Pages/Auth/Errors/Page403';
import Writer from './Pages/Dashboard/Writer';
import Page404 from './Pages/Auth/Errors/Page404';
import RequireBack from './Pages/Auth/Protecting/RequireBack';
import Categories from './Pages/Dashboard/Categories/Categories';
import AddCategories from './Pages/Dashboard/Categories/AddCategory';
import UpdateCategory from './Pages/Dashboard/Categories/Category';
import Products from './Pages/Dashboard/Products/Products';
import AddProduct from './Pages/Dashboard/Products/AddProduct';
import UpdateProduct from './Pages/Dashboard/Products/Product';
import WebsiteCategories from './Pages/website/Categories/Categories';
import Website from './Pages/website/Website';
import SingleProduct from './Pages/website/SingleProduct/SingleProduct';

function App() {
  return (
    <div className="App">
      <Routes>
      {/**  NavBar **/}
        <Route element={<Website/>} >
          <Route path='/categories' element={<WebsiteCategories />} />
          <Route path='/product/:id' element={<SingleProduct />} />    
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack />} />

        <Route path="/*" element={<Page404 />} />
        { /* Protected Routs */}

        <Route element={<RequirAuth allowedRole={["1995", "1996"]} />}>
          <Route path='dashboard' element={<Dashboard />}>
            <Route element={<RequirAuth allowedRole='1995' />}>
              <Route path='403' element={<Page403 />} />
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<User />} />
              <Route path='user/add' element={<AddUser />} />

            </Route>

            <Route element={<RequirAuth allowedRole={["1995", "1999"]} />}>
            // Categories
              <Route path='categories' element={<Categories />} />
              <Route path='categories/:id' element={<UpdateCategory />} />
              <Route path='categories/add' element={<AddCategories />} />
            // Products
              <Route path='products' element={<Products />} />
              <Route path='products/:id' element={<UpdateProduct />} />
              <Route path='product/add' element={<AddProduct />} />


            </Route>
            <Route element={<RequirAuth allowedRole={["1995", "1996"]} />}>
              <Route path='writer' element={<Writer />} />
            </Route>

          </Route>
        </Route>


      </Routes>



    </div>
  );
}

export default App;
