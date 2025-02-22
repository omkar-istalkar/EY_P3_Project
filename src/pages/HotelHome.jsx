import React from 'react'
import AllDishes from '../Components/AllDishes'
import Orders from '../Components/Orders'
import History from '../Components/History'
import AddDish from '../Components/AddDish'
import HotelInfo from '../Components/HotelInfo'
import { useState } from 'react'

const HotelHome = () => {

  const data = JSON.parse(localStorage.getItem('hoteldata'))

  const [showDishes, setShowDishes] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showHotelInfo, setShowHotelInfo] = useState(false);

  const handleButtonClick = (section) => {
    // Reset all other sections to false
    setShowDishes(false);
    setShowOrders(false);
    setShowOrderHistory(false);
    setShowAddItem(false);
    setShowHotelInfo(false);

    // Set the clicked section to true
    if (section === 'dishes') setShowDishes(true);
    if (section === 'orders') setShowOrders(true);
    if (section === 'orderHistory') setShowOrderHistory(true);
    if (section === 'addItem') setShowAddItem(true);
    if (section === 'hotelInfo') setShowHotelInfo(true);

  }
  return (
    <div className="p-3" style={{height: "100vh", width: "95vw", borderRadius: '10px', margin: 'auto', textAlign: 'center', overflow: 'hidden', padding: '1px'}}>
      <div>
        <marquee behavior="scroll" direction="left" scrollamount="10"><h4>Welcome to Hotel <span>{data.name}</span> Dashboard! Stay on top of today’s bookings, manage the menu, and track customer orders—all in one place. Let's make today a great service experience!</h4></marquee>
      </div>
      <div className='row justify-content-md-center mt-3 p-3 bg-light text-dark'>
        <div className="col-3 border border-3 border-dark bg-secondary d-flex flex-column justify-content-evenly p-2 position-sticky top-0" style={{ height: '40vh', position: 'sticky', top: '0' }}>
          <button className='m-1 rounded rounded-3 p-1' onClick={() => handleButtonClick('dishes')}>All Dishes</button>
          <button className='m-1 rounded rounded-3 p-1' onClick={() => handleButtonClick('orders')}>Today's Orders</button>
          <button className='m-1 rounded rounded-3 p-1' onClick={() => handleButtonClick('orderHistory')}>Order History</button>
          <button className='m-1 rounded rounded-3 p-1' onClick={() => handleButtonClick('addItem')}>Add item</button>
          <button className='m-1 rounded rounded-3 p-1' onClick={() => handleButtonClick('hotelInfo')}>Hotel Info</button>
        </div>
        <div className='col-9  border border-3 border-primary bg-success' id="right" style={{height: '100vh', overflowY: 'auto', padding: '10px', }}> 
          {showDishes && <AllDishes />}
          {showOrders && <Orders />}
          {showOrderHistory && <History/>}
          {showAddItem && <AddDish/>}
          {showHotelInfo && <HotelInfo/>}
        </div>
          
      </div>
    </div>
  )
}

export default HotelHome