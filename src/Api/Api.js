//export const baseURL = 'https://e-commece-back-end-vwjl.onrender.com/api';
const baseURL = process.env.REACT_APP_API_URL;


export const REGISTER = "register";

//AUTH
export const LOGIN = "login";
export const LOGOUT = 'logout';
// User
export const USERS = 'users';
export const USER = 'user';
// categories
export const CAT = 'categories';
export const Category = 'category';
// Product
export const PROD = 'products';
export const Product = 'product';
export const LatestSale = 'latest-sale';
export const TopRatedProduct = 'top-rated';
export const Latest = 'latest';


 // Roles
export const R_ADMIN = '1995';
export const R_USER = '2001';
export const R_WRITER = '1996';
export const R_PRODUCT = '1999';



export const GOOGLE_CALL_BACK = 'auth/google/callback';

//cart
export const CART = '/cart';






