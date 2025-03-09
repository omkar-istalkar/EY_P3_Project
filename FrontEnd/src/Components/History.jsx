import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserContext";

const History = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchOrderHistory(user.email);
    }
  }, [user]);

  const fetchOrderHistory = async (email) => {
    try {
      const res = await axios.post("http://localhost:5000/order-history", { hotelEmail: email });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-light">Order History</h2>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No past orders found.
        </div>
      ) : (
        <div className="list-group" style={{ maxHeight: "540px", overflowY: "auto" }}>
          {orders.map((order) => (
            <div key={order._id} className="list-group-item  align-items-center mt-2 rounded border-3 border-warning">
              <div className="m-1 p-1">
                <h5 className="mb-1">{order.dishName}</h5>
                <p className="mb-1">Price: <strong>${order.price}</strong></p>
                <p className="mb-1">Status: <span className={`badge bg-success`}>{order.status}</span></p>
                <small>Ordered On: {new Date(order.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
