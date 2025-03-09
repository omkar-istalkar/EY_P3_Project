import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

const UserOrders = () => {
  const { user } = useUser(); // Get the user context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchUserOrders(user.email);
    }
  }, [user]);

  const fetchUserOrders = async (email) => {
    try {
      const res = await axios.post('http://localhost:5000/user-orders', { userEmail: email });
      setOrders(res.data); // Set the user's orders
      setLoading(false); // Stop the loading state
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Orders</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No orders found.
        </div>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order._id} className="list-group-item d-flex justify-content-between align-items-center mt-2 rounded border-3 border-primary">
              <div className='p-2 m-1 '>
                <h5 className="mb-1">{order.dishName}</h5>
                <p className="mb-1">Price: <strong>${order.price}</strong></p>
                <p className="mb-1">Status: <span className="badge bg-info">{order.status}</span></p>
                <small>Ordered On: {new Date(order.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
