import React from 'react'

const AddDish = () => {
  return (
    <div>
      <div className='container p-3 m-1'>
        <h1 className='fs-1 text-white mb-4'>Add details of Dish </h1>
      </div>
      <form>
      <div className="mb-3 d-flex flex-row p-2 fluid">
          <h4 className='fs-5'>Enter image of your dish : </h4>
          <input type="file" class="form-control" id="inputGroupFile02"/>
        </div>
        <div className="mb-3 d-flex flex-row p-2">
          <h4 className='fs-5'>Enter name of your dish : </h4>
          <input className='m-1 w-100 fs-6' type="text" placeholder='Name of Dish'/>
        </div>
        <div className="mb-3 d-flex flex-row p-2">
          <h4 className='fs-5'>Enter price of your dish : </h4>
          <input className='m-1 w-100 fs-6' type="number" placeholder='Price of Dish'/>
        </div>
        <div className="mb-3">
        <button type="submit" class="btn btn-primary">Add Item</button>
        </div>  
      </form>
    </div>
  )
}

export default AddDish