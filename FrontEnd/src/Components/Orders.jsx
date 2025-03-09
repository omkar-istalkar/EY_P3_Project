import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserContext";

const Orders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchTodayOrders(user.email);
    }
  }, [user]);

  const fetchTodayOrders = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/today-orders/${email}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching today's orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put("http://localhost:5000/update-order-status", { orderId, status });
      fetchTodayOrders(user.email); // Refresh the list after update
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center text-light">Today's Orders</h2>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No orders today.
        </div>
      ) : (
        <div style={{ maxHeight: "540px", overflowY: "auto" }}>
          <ul className="list-group">
            {orders.map(order => (
              <li key={order._id} className="list-group-item mb-3 p-3 border rounded">
                <h5 className="text-primary">Customer: {order.userEmail}</h5>
                <p><strong>Dish:</strong> {order.dishName}</p>
                <p><strong>Total:</strong> ₹{order.price}</p>
                <p><strong>Status:</strong> 
                  <span 
                    className={
                      order.status === "Accepted" 
                        ? "badge bg-success" 
                        : order.status === "Rejected" 
                        ? "badge bg-danger" 
                        : "badge bg-warning"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                
                {order.status === "Pending" && (
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success me-2"
                      onClick={() => updateOrderStatus(order._id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => updateOrderStatus(order._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
