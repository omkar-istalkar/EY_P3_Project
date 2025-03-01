import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
  const { dishId } = useParams(); // Get the dishId from URL
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-dish/${dishId}`);
        setDish(response.data); // Set the fetched dish details
      } catch (error) {
        console.error('Error fetching dish details:', error);
      }
    };

    fetchDish();
  }, [dishId]);

  if (!dish) return <div>Loading...</div>; // Loading state

  return (
    <div className='row p-2 justify-content-center align-items-center'>
      <div>
        <h1 className='fs-1 text-dark mb-4 text-center'>Place Your order</h1>
      </div>
      <div className="card p-3" style={{ width: "18rem" }}>
        <img src={`data:image/png;base64,${dish.image}`} className="card-img-top border border-2 m-1" alt={dish.name} />
        <div className="card-body">
          <h5 className="card-title fs-2">{dish.name}</h5>
          <p className="card-text fs-3">Price : {dish.price}</p>
          <div className='d-flex justify-content-evenly'>
            <button 
              onClick={() => alert('Your order is placed')}
              className='fs-3 bg-success text-white rounded rounded-1'>
              Order food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
