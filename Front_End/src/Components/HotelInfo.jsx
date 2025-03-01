import React, { use } from 'react'
import { useState, useEffect } from 'react'

const HotelInfo = () => {

  var data = JSON.parse(localStorage.getItem('hoteldata'))

  const [hname, sethname] = useState('')
  const [hemail, sethemail] = useState('')
  const [hphone, sethphone] = useState('')
  const [haddress, sethaddress] = useState('')
  const [howner, sethowner] = useState('')

  useEffect(() => {
  
    if(data){
      sethname(data.name)
      sethemail(data.email)
      sethowner(data.hname)
    }
  
  }, [])

  const handleupdate =(e)=>{
    e.preventDefault();

    var updateData = {
      name: hname,
      email: hemail,
      phone: hphone,
      address: haddress,
      owner: howner,
    }

    localStorage.setItem('hoteldata', JSON.stringify(updateData))

    alert('Data Updated Successfully')
  }

  return (
    <div className='p-3 container bg-light text-dark fluid'>
      <div className='fs-3 text-dark'>Information of Your Hotel</div>
      <div className='mt-3 p-3 border border-3 border-dark rounded rounded-3 text-start'>
        <div className='mb-2'><img src={data.image} alt="" className='img-fluid m-3'style={{ maxHeight: '200px', objectFit: 'cover', height:'auto'}}/></div>
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