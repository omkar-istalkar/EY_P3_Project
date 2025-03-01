import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllDishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-dishes'); 
        setDishes(response.data); 
        console.error('Error fetching dishes:', error);
      }catch(err){
        console.log(err)
      }
    };

    fetchDishes();
  }, []);

  const handleDelete = async (dishId) => {
    try {
      await axios.delete(`http://localhost:5000/delete-dish/${dishId}`);
      setDishes(dishes.filter(dish => dish._id !== dishId));
      alert('Dish deleted successfully');
    } catch (error) {
      console.error('Error deleting dish:', error);
      alert('Failed to delete dish');
    }
  };

  return (
    <div className="container p-3 m-1">
      <h1 className="fs-1 text-white mb-4">All Dishes</h1>
      
      {/* Render each dish dynamically */}
      <div className="row">
        {dishes.map((dish) => (
          <div key={dish._id} className="col-3 mb-4">
            <div className="card p-3" style={{ width: '18rem' }}>
              {/* Display image */}
              <img src={`data:image/png;base64,${dish.image}`} className="card-img-top border border-2 m-1" alt={dish.name} />
              <div className="card-body">
                <h5 className="card-title fs-2">{dish.name}</h5>
                <p className="card-text fs-3">Price: {dish.price}</p>
                {/* Add Delete button */}
                <button className="fs-3 bg-danger text-white" onClick={() => handleDelete(dish._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDishes;