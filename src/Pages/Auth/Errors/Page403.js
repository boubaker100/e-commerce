import React from 'react';
import './403.css';
import { Link } from 'react-router-dom';

export default function Page403({role})
 

 {
  console.log(role);
  return (
    <div className="page-403">
      <div className="page-403-content">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>Sorry, you don't have permission to access this page.</p>
        <Link 
          className="btn-403"
          to={role === "1996" ? "/dashboard/writer" : "/"}
          >
          {role === "1996"? "Go to Writer Page" :"Go to Home"}
        </Link>
      </div>
    </div>
  );
}



 