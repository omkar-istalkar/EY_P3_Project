import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HotelRegister = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [hname, sethname] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Convert image to Base64 format
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // Store Base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation before submitting the form
    if (!name || !email || !password || !hname || !file) {
      setError('All fields are required, including the image.');
      return;
    }

    // Create form data object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('hname', hname);
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/hotel-register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Hotel registered successfully');
        navigate('/hotel-login');
      } else {
        setError(data.message || 'Error during registration');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <div style={{ padding: '20px', margin: '50px auto', width: '400px', backgroundColor: 'rgba(164, 206, 238, 0.8)', borderRadius: '15px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <div style={{ backgroundColor: 'rgba(46, 164, 37, 0.8)', padding: '15px 0', borderRadius: '15px 15px 0 0', marginBottom: '20px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Hotel Registration</h1>
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(241, 249, 255, 0.9)', borderRadius: '0 0 15px 15px' }}>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Name Input */}
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <input
              style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '100%', fontSize: '16px' }}
              type="text"
              placeholder="Hotel Owner Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <input
              style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '100%', fontSize: '16px' }}
              type="email"
              placeholder="sample@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <input
              style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '100%', fontSize: '16px' }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          {/* Hotel Name Input */}
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <input
              style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '100%', fontSize: '16px' }}
              type="text"
              placeholder="Hotel Name"
              value={hname}
              onChange={(e) => sethname(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <input
              style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '100%', fontSize: '16px' }}
              type="file"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={{ backgroundColor: '#46a037', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease', marginTop: '20px' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default HotelRegister;
