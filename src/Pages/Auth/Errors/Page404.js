import React, { useEffect } from "react";
import "./404.css"; // تأكد من استيراد ملف التنسيقات
import anime from "animejs"; // تأكد من تثبيت animejs إذا كان مستخدمًا

export default function Page404() {
  


return (

    <div className="container">
        <div className="error-code">404</div>
        <div className="error-message">Page Not Found</div>
        <a href="/" className="back-btn">
          Back to Homepage
        </a>
      </div>
  );
     
};

 
 






