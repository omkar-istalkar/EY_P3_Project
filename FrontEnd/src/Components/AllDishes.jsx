import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

const AllDishes = () => {
  const {user} = useUser()
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchDishes(user.email);
    }
  }, [user]);

  const fetchDishes = async (email) => {
    try {
      const res = await axios.post("http://localhost:5000/get-dishes", { hotelEmail: email });
      setDishes(res.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleDelete = async (dishId) => {
    try {
      await axios.post("http://localhost:5000/delete-dish", { dishId, hotelEmail: user.email });
      setDishes(dishes.filter(dish => dish._id !== dishId)); // Update UI immediately
      alert('Dish deleted successfully');
    } catch (error) {
      console.error('Error deleting dish:', error);
      alert('Failed to delete dish');
    }
  };

  return (
    <div className="container p-3 m-1">
      <h1 className="fs-1 text-white mb-4">Your Dishes</h1>
      
      <div className="row">
        {dishes.length === 0 ? (
          <p className="text-white">No dishes available.</p>
        ) : (
          dishes.map((dish) => (
            <div key={dish._id} className="col-md-4 mb-4">
              <div className="card p-3" style={{ width: '18rem' }}>
                <img 
                  src={dish.image} 
                  className="card-img-top border border-2 m-1" 
                  alt={dish.name} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                <div className="card-body">
                  <h5 className="card-title fs-2">{dish.name}</h5>
                  <p className="card-text fs-3">Price: ${dish.price}</p>
                  <button className="btn btn-danger fs-5" onClick={() => handleDelete(dish._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllDishes;