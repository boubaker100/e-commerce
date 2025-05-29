import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


const QuantityCounter = (props) => {
  const [quantity, setQuantity] = useState(0);
  
   useEffect(() => {
    if (props.changeQuantity) {
      props.changeQuantity(props.id,quantity);
    }
  }, [props.quantity]);

 
  useEffect(() => {
    if (props.quantity) {
      setQuantity(props.quantity);
    }
  }, [props.quantity]);



  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className=" items-center col-sm-4 d-flex   rounded p-2">
      <Button onClick={handleDecrement} disabled={quantity <= 0}>
        -
      </Button>
      <span className="bg-light border pt-1  font-bold text-lg px-4 text-black mx-2 text-center">{quantity}</span>
      <Button onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
};

export default QuantityCounter;