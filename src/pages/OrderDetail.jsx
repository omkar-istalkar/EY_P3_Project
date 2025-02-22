import React from 'react'

const OrderDetail = () => {
  return (
    <div className='row p-2 justify-content-center align-items-center'>
        <div>
            <h1 className='fs-1 text-dark mb-4 text-center'>Place Your order </h1>
        </div>
        <div className="card p-3" style={{width: "18rem"}}>
            <img src="https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg" className="card-img-top border border-2 m-1" alt="..."/>
            <div className="card-body">
                <h5 className="card-title fs-2">Matar Paneer</h5>
                <p className="card-text fs-3">Price : 120</p>
                <p className='card-text fs-4'><span>Hotel Details : </span> ABC Hotel, xyz street, behind PQR Hospital ,MNO nagar, def 413 521</p>
                <div className='d-flex justify-content-evenly '>
                    <button onClick={()=>{alert('Your order is placed')
                    }} className='fs-3 bg-success text-white rounded rounded-1'>Order food </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderDetail