import React ,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-info mb-5 p-3">
            <div className="container-fluid">
                <img src="Logo.png" alt="" width="175" height="75" className="d-inline-block align-text-top rounded-pill m-2"/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse m-2" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-2">
                    <li className="nav-item m-2">
                    <Link to='/' className='nav-item text-decoration-none fs-5  text-white'>Home</Link>
                    </li>

                    <li className="nav-item dropdown m-2" id='logged-in'>
                        <Link to='/login' className='nav-item text-decoration-none fs-5  text-white dropdown-toggle' id='navbarDropdown' role="button" data-bs-toggle="dropdown" aria-expanded="false">Login</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className='dropdown-item' to='user-login'>User</Link></li>
                            <li><Link className='dropdown-item' to='hotel-login'>Hotel</Link></li>
                        </ul>
                    </li>

                    <li className="nav-item dropdown m-2" id='loggedin' >
                        <Link to='/register' className='nav-item text-decoration-none fs-5  text-white dropdown-toggle' id='navbarDropdown' role="button" data-bs-toggle="dropdown" aria-expanded="false">Register</Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className='dropdown-item' to='user-register'>User</Link></li>
                            <li><Link className='dropdown-item' to='hotel-register'>Hotel</Link></li>
                        </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar