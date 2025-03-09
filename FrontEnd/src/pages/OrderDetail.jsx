import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser} from "../UserContext"

const OrderDetail = () => {
  const { dishId } = useParams();
  const {user} = useUser();
  const [dish, setDish] = useState(null);
  const [orderStatus, setorderStatus] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-dish/${dishId}`);
        setDish(response.data); 
      } catch (error) {
        console.error('Error fetching dish details:', error);
      }
    };

    fetchDish();
  }, [dishId]);

  const handlePlaceOrder = async () => {
    if (!user?.email){
      alert("Please  login to place an order")
      return
    }

    try{
      const orderData = {
        userEmail : user.email,
        hotelEmail : dish.hotelEmail,
        dishName : dish.name,
        price : dish.price,
      }

      const response = await axios.post("http://localhost:5000/place-order", orderData)
      alert(response.data.message)
      setorderStatus("Pending")
    }catch(error){
      console.error("Error placing order : ", error)
      alert("Failed to place order")
    }
  }

  if (!dish) return <div>Loading...</div>;

  return (
    <div className='row p-2 justify-content-center align-items-center'>
      <div>
        <h1 className='fs-1 text-dark mb-4 text-center'>Place Your Order</h1>
      </div>
      <div className="card p-3" style={{ width: "18rem" }}>
        <img 
          src={dish.image} 
          className="card-img-top border border-2 m-1" 
          alt={dish.name} 
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title fs-2">{dish.name}</h5>
          <p className="card-text fs-3">Price: ₹{dish.price}</p>
          <p className="card-text fs-3">Hotel Email : {dish.hotelEmail}</p>

          <div className='d-flex justify-content-evenly'>
            <button 
              onClick={handlePlaceOrder}
              className='fs-3 bg-success text-white rounded rounded-1 p-2'>
              Order Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
