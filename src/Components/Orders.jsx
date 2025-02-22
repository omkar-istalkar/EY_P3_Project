import React from 'react'

const Orders = () => {
  return (
    <div className='container p-3 m-1'>
      <div>
        <h1 className='fs-1 text-white mb-4'>Today's Orders </h1>
      </div>
      <div className="card p-3" style={{width: "18rem"}}>
        <img src="public/Logo.png" className="card-img-top border border-2 m-1" alt="..."/>
        <div className="card-body">
          <h5 className="card-title fs-2">Dal Fry</h5>
          <p className="card-text fs-3">Price : 120</p>
          <div className='d-flex justify-content-evenly '>
            <button className='fs-3 bg-success text-white rounded rounded-1'>Confirm</button>
            <button className='fs-3 bg-danger text-white rounded rounded-3'>Reject</button>
          </div>
          <button className='mt-3 rounded rounded-2'>Order Details</button>
        </div>
      </div>
    </div>
  )
}

export default Orders