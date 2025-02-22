import React from 'react'

const AllDishes = () => {
  return (
    <div className='container p-3 m-1'>
      <div>
        <h1 className='fs-1 text-white mb-4'>All Dishes</h1>
      </div>
      <div className="card p-3" style={{width: "18rem"}}>
        <img src="public/Logo.png" className="card-img-top border border-2 m-1" alt="..."/>
        <div className="card-body">
          <h5 className="card-title fs-2">Dal Fry</h5>
          <p className="card-text fs-3">Price : 120</p>
          <button className='fs-3 bg-danger text-white'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default AllDishes