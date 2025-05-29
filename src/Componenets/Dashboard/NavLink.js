import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";

export const links = [
    {
        name: 'Users',
        link: 'users',
        icon: faUser,
        role:'1995',
    },
  
    {
        name: 'Add User',
        link: 'user/add',
        icon: faPlus,
        role:'1995',
    },
    {
        name: 'Categories',
        link: 'categories',
        icon:faCartShopping,
        role:['1995','1999'],
    },
    {
        name: 'Add Categories',
        link: 'categories/add',
        icon:faPlus,
        role:['1995','1999'],
    }, 
    {
        name: 'Products',
        link: 'products', 
        icon:faProductHunt,
        role:['1995','1999'],
        
    },

    {
        name: 'Add Product',
        link: 'product/add',
        icon:faPlus,
        role:['1995','1999'],
    },
 
  
    {
        name: 'Writer',
        link: 'writer',
        icon: faPlus,
        role:['1995','1996'],
    },


];