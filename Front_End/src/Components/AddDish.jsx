import React,{useState} from 'react'
import axios from 'axios'

const AddDish = () => {
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!dishName || !dishPrice || !file) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', dishName);
    formData.append('price', dishPrice);
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/add-dish', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Dish added successfully!');
    } catch (err) {
      alert('Error adding dish');
    }
  };
  return (
    <div>
      <div className='container p-3 m-1'>
        <h1 className='fs-1 text-white mb-4'>Add details of Dish </h1>
      </div>
      <form onSubmit={submitHandler}>
      <div className="mb-3 d-flex flex-row p-2 fluid">
          <h4 className='fs-5'>Enter image of your dish : </h4>
          <input type="file" class="form-control" id="inputGroupFile02" onChange={handleFileChange} required/>
        </div>
        <div className="mb-3 d-flex flex-row p-2">
          <h4 className='fs-5'>Enter name of your dish : </h4>
          <input className='m-1 w-100 fs-6' type="text" placeholder='Name of Dish' value={dishName} onChange={(e)=>setDishName(e.target.value)} required/>
        </div>
        <div className="mb-3 d-flex flex-row p-2">
          <h4 className='fs-5'>Enter price of your dish : </h4>
          <input className='m-1 w-100 fs-6' type="number" placeholder='Price of Dish' value={dishPrice} onChange={(e)=>setDishPrice(e.target.value)}/>
        </div>
        <div className="mb-3">
        <button type="submit" class="btn btn-primary">Add Item</button>
        </div>  
      </form>
    </div>
  )
}

export default AddDish