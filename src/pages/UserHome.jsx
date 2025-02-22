import React from 'react'
import UserDish from '../Components/UserDish'

const UserHome = () => {
  return (
    <div className='container p-2'>
      <div className='row p-2'>
        <div className='col-10'> 
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <div className='col-2'>
          <select class="form-select" aria-label="Default select example">
            <option value="cat">Veg</option>
            <option value="cat">Non-veg</option>
          </select>
        </div>
      </div>
      <div className='row p-2 justify-content-center align-items-center'>
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{width:'75%'}}>
          <div className="carousel-inner">
            <div className
            ="carousel-item active" data-bs-interval="10000">
              <img src='https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg' className="d-block w-100" height='400px' alt="..."/>
              <h3>Dal Fry</h3>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg" className="d-block w-100" height='400px' alt="..."/>
              <h3>Baingan Bharta</h3>
            </div>
            <div className="carousel-item">
              <img src="https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg" className="d-block w-100" height='400px' alt="..."/>
              <h3>Matar Paneer</h3>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='row border border-3 border-success m-3 p-2'><h1>Order your favourite food</h1></div>
      <div className='row p-3'>
          <div className='col-4'><UserDish/></div>
          <div className='col-4'><UserDish/></div>
          <div className='col-4'><UserDish/></div>
      </div>
      <div className='row p-3'>
          <div className='col-4'><UserDish/></div>
          <div className='col-4'><UserDish/></div>
          <div className='col-4'><UserDish/></div>
      </div>
    </div>
  )
}

export default UserHome