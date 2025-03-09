import React, { use } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useUser} from "../UserContext"

const HotelInfo = () => {

  const {user} = useUser();
  const [hoteldata, sethoteldata] = useState(null)
  const [hname, sethname] = useState('')
  const [hemail, sethemail] = useState('')
  const [hphone, sethphone] = useState('')
  const [haddress, sethaddress] = useState('')
  const [howner, sethowner] = useState('')
  const [himage, setHimage] = useState('')

  useEffect(() => {
  
   if (user?.email){
    fetchHotelData(user.email)
   }
  }, [user])

  const fetchHotelData = async (email)=> {
    try{
      const res = await axios.get(`http://localhost:5000/hotel-info/${email}`)
      sethoteldata(res.data);
      sethname(res.data.h_name);
      sethemail(res.data.email);
      sethowner(res.data.owner);
      sethphone(res.data.phone || " ");
      sethaddress(res.data.address || " ");
      setHimage(res.data.himage);
    }catch(error){
      console.error("Error fetching hotel data:", error);
      alert("Failed to fetch hotel information!");
    }
  }

  const handleupdate = async(e)=>{
    e.preventDefault();

    const updateData = {
      h_name : hname,
      email : hemail,
      owner : howner,
      phone : hphone,
      address : haddress,
      h_image : himage,
    }

    try{
      await axios.post(`http://localhost:5000/update-hotel/${user.email}`,updateData)
      alert("Hotel data updated successfully!")
    }catch(error){
      console.error("Error updating hotel data",error)
      alert("Failed to update data")
    }
  }

  if (!hoteldata){
    return <h2>Loading hotel information ...</h2>
  }

  return (
    <div className='p-3 container bg-light text-dark fluid'>
      <div className='fs-3 text-dark'>Information of Your Hotel</div>
      <div className='mt-3 p-3 border border-3 border-dark rounded rounded-3 text-start'>
        <div className='mb-2'><img src={hoteldata.h_image} alt="HOTEL" className='img-fluid m-3'style={{ maxHeight: '200px', objectFit: 'cover', height:'auto'}}/></div>
        <form>
          <div className='d-flex flex-row m-1 fs-6'> 
            <h3>Hotel Name : </h3>
            <input type="text" value={hname} onChange={(e) => sethname(e.target.value)} />
          </div>
          <div className='d-flex flex-row m-1 fs-6'>
            <h3>Hotel Owner : </h3>
            <input type="text" value={howner} onChange={(e) => sethowner(e.target.value)} />
          </div>
          <div className='d-flex flex-row m-1 fs-6'>
            <h3>Email : </h3>
            <input type="email" value={hemail} onChange={(e) => sethemail(e.target.value)} />
          </div>
          <div className='d-flex flex-row m-1 fs-6'>
            <h3>Phone : </h3>
            <input type="text" value={hphone} onChange={(e) => sethphone(e.target.value)} />
          </div>
          <div className='d-flex flex-row m-1 fs-6'>
            <h3>Address : </h3>
            <input type="text" value={haddress} onChange={(e) => sethaddress(e.target.value)} />
          </div>
        </form>
        <div >
            <button onClick={(e) => handleupdate(e)} className='btn btn-primary m-2'>Update</button>
          </div>
        
      </div>
    </div>
  )
}

export default HotelInfo