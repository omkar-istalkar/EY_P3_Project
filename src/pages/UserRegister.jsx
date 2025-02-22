import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserRegister = () => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        const userdata = {
            name: name,
            email: email,
            password: password
        }

        localStorage.setItem('userdata', JSON.stringify(userdata))

        navigate('/user-login')
    }

    return (
        <div style={{
            padding: '20px',
            margin: '50px auto',
            width: '400px',
            backgroundColor: `rgba(164, 206, 238, 0.8)`,
            borderRadius: '15px',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center'
        }}>
            <div style={{
                backgroundColor: `rgba(46, 164, 37, 0.8)`,
                padding: '15px 0',
                borderRadius: '15px 15px 0 0',
                marginBottom: '20px'
            }}>
                <h1 style={{ color: 'white', margin: 0 }}>User Registration</h1>
            </div>
            <div style={{
                padding: '20px',
                backgroundColor: `rgba(241, 249, 255, 0.9)`,
                borderRadius: '0 0 15px 15px'
            }}>
                <form onSubmit={(e) => { submitHandler(e) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Name Input */}
                    <div style={{
                        marginBottom: '15px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }}>
                        <i style={{
                            borderRight: '1px solid #ccc',
                            padding: '8px',
                            fontSize: '18px'
                        }} className="ri-user-3-fill"></i>
                        <input
                            style={{
                                border: 'none',
                                outline: 'none',
                                padding: '8px 10px',
                                fontSize: '16px',
                                flex: 1
                            }}
                            type="text"
                            placeholder='John Doe'
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                    </div>

                    {/* Email Input */}
                    <div style={{
                        marginBottom: '15px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }}>
                        <i style={{
                            borderRight: '1px solid #ccc',
                            padding: '8px',
                            fontSize: '18px'
                        }} className="ri-mail-fill"></i>
                        <input
                            style={{
                                border: 'none',
                                outline: 'none',
                                padding: '8px 10px',
                                fontSize: '16px',
                                flex: 1
                            }}
                            type="email"
                            placeholder='sample@gmail.com'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div style={{
                        marginBottom: '15px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }}>
                        <i style={{
                            borderRight: '1px solid #ccc',
                            padding: '8px',
                            fontSize: '18px'
                        }} className="ri-lock-fill"></i>
                        <input
                            style={{
                                border: 'none',
                                outline: 'none',
                                padding: '8px 10px',
                                fontSize: '16px',
                                flex: 1
                            }}
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>

                    {/* Login Link */}
                    <p style={{
                        marginTop: '10px',
                        fontSize: '14px'
                    }}>
                        Already have an account? <Link to='/user-login' style={{ textDecoration: 'none', color: '#3385ff' }}>Login Now</Link>
                    </p>

                    {/* Submit Button */}
                    <button style={{
                        backgroundColor: '#46a037',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'background-color 0.3s ease',
                        marginTop: '20px'
                    }} type='submit'>
                        Submit
                    </button>
                </form>

                {/* Hotel Registration Button */}
                <div style={{
                    marginTop: '20px',
                    textAlign: 'center'
                }}>
                    <button style={{
                        backgroundColor: '#f2f2f2',
                        color: 'black',
                        padding: '10px 20px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}>
                        <Link to='/hotel-register' style={{ textDecoration: 'none', color: 'black' }}>
                            Hotel Registration
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserRegister
