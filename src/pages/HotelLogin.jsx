import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const HotelLogin = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        const data = {
            email: email,
            password: password
        }

        var hdata = JSON.parse(localStorage.getItem('hoteldata'))

        if (hdata && hdata.email === data.email && hdata.password === data.password) {
            navigate('/hotel-home')
        } else {
            alert('Invalid Email or Password')
        }
    }

    return (
        <div className='content-box' style={{padding: '20px', margin: '50px auto', width: '400px', backgroundColor: `rgba(164, 206, 238, 0.8)`,borderRadius: '15px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)', fontFamily: 'Arial, sans-serif', textAlign: 'center'}}>
            <div style={{backgroundColor: `rgba(46, 164, 37, 0.8)`, padding: '15px 0', borderRadius: '15px 15px 0 0', marginBottom: '20px'}}>
                <h1 style={{ color: 'white', margin: 0 }}>Hotel Login</h1>
            </div>
            <div style={{padding: '20px', backgroundColor: `rgba(241, 249, 255, 0.9)`, borderRadius: '0 0 15px 15px'}}>
                <form onSubmit={(e) => { submitHandler(e) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{marginBottom: '15px', width: '100%', display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                        <i style={{borderRight: '1px solid #ccc', padding: '8px', fontSize: '18px' }} className="ri-mail-fill"></i>
                        <input style={{ border: 'none', outline: 'none', padding: '8px 10px', fontSize: '16px', flex: 1}} type="email" placeholder='sample@gmail.com' value={email} onChange={(e) => setemail(e.target.value)}/>
                    </div>

                    <div style={{marginBottom: '15px', width: '100%', display: 'flex',alignItems: 'center', padding: '10px',border: '1px solid #ccc', borderRadius: '8px'}}>
                        <i style={{borderRight: '1px solid #ccc', padding: '8px', fontSize: '18px'}} className="ri-lock-fill"></i>
                        <input style={{border: 'none', outline: 'none', padding: '8px 10px', fontSize: '16px', flex: 1}} type="password" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)}/>
                    </div>

                    <p style={{marginTop: '10px', fontSize: '14px'}}>
                        New here? <Link to='/hotel-register' style={{ textDecoration: 'none', color: '#3385ff' }}>Register your hotel</Link>
                    </p>

                    <button style={{ backgroundColor: '#46a037', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px',  cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease', marginTop: '20px'}} type='submit'>
                        Submit
                    </button>
                </form>

                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    <button style={{backgroundColor: '#f2f2f2', color: 'black', padding: '10px 20px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '16px'}}>
                        <Link to='/user-login' style={{ textDecoration: 'none', color: 'black' }}>
                            User Login
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HotelLogin
