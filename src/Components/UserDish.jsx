import React from 'react'
import {Link} from 'react-router-dom'

const UserDish = () => {
  return (
    <div className='container p-3 m-1'>
      <div className="card p-3" style={{width: "18rem"}}>
        <img src="https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg" className="card-img-top border border-2 m-1" alt="..."/>
        <div className="card-body text-center">
          <h5 className="card-title fs-2">Matar Paneer</h5>
          <p className="card-text fs-3">Price : 120</p>
          <div className='d-flex justify-content-evenly '>
            <Link to='/details' className='fs-5 bg-success text-white rounded rounded-1 text-decoration-none p-1'>Dish Details</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDish