import React, { useState, useEffect } from 'react';
import UserDish from '../Components/UserDish';
import axios from 'axios';

const UserHome = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all'); 
  
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user-dishes');
        setDishes(response.data);
        setFilteredDishes(response.data); // Initially, show all dishes
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let filtered = dishes;

    if (category !== 'all') {
      filtered = filtered.filter(dish => dish.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDishes(filtered);
  }, [searchTerm, category, dishes]);

  return (
    <div className='container p-2'>
      {/* Search & Filter */}
      <div className='row p-2'>
        <div className='col-12'> 
          <form className="d-flex">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search for a dish..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="btn btn-outline-success" type="button">Search</button>
          </form>
        </div>
      </div>
      
      <div className="container p-3">
        <div className="row">
          {filteredDishes.length === 0 ? (
            <p className="text-center">No dishes available.</p>
          ) : (
            filteredDishes.map((dish) => (
              <div key={dish._id} className="col-md-4 mb-4">
                <UserDish 
                  name={dish.name}
                  price={dish.price}
                  image={dish.image}  
                  dishId={dish._id}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
