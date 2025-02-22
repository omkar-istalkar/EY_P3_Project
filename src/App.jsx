import React from 'react'
import UserLogin from './pages/UserLogin'
import HotelLogin from './pages/HotelLogin'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './pages/UserRegister'
import Start from './pages/Start'
import HotelRegister from './pages/HotelRegister'
import UserHome from './pages/UserHome'
import HotelHome from './pages/HotelHome'
import 'remixicon/fonts/remixicon.css'
import OrderDetail from './pages/OrderDetail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/hotel-login" element={<HotelLogin />} />
        <Route path='/user-register' element={<UserRegister/>}/>
        <Route path='/hotel-register' element={<HotelRegister/>}/>
        <Route path='/user-home' element={<UserHome/>}/>
        <Route path='/hotel-home' element={<HotelHome/>}/>
        <Route path='/details' element={<OrderDetail/>}/>
      </Routes>
    </div>
  )
}

export default App