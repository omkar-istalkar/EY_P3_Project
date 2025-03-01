import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDish = ({ dish }) => {
  return (
    <div className="card p-3" style={{ width: "18rem" }}>
      {/* If the image is base64, use it like this: */}
      <img 
        src={`data:image/png;base64,${dish.image}`} // Assuming image is base64 encoded
        className="card-img-top border border-2 m-1"
        alt={dish.name}
      />
      <div className="card-body text-center">
        <h5 className="card-title fs-2">{dish.name}</h5>
        <p className="card-text fs-3">Price: {dish.price}</p>
        <div className="d-flex justify-content-evenly">
          <Link to={`/details/${dish._id}`} className="fs-5 bg-success text-white rounded rounded-1 text-decoration-none p-1">
            Dish Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const UserDishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dishes'); 
        setDishes(response.data); 
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div className="container p-3 m-1">
      <div className="row border border-3 border-success m-3 p-2">
        <h1>Order your favourite food</h1>
      </div>
      <div className="row p-3">
        {dishes.map((dish) => (
          <div key={dish._id} className="col-4">
            <UserDish dish={dish} /> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDishes;
