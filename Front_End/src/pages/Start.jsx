import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div style={{textAlign:'center', overflow:'hidden',padding:'1px',borderRadius:'10px',margin:'auto'}}>
        <img style={{width:'450px', height:'450px',borderRadius:'25px'}} src="https://img.freepik.com/premium-vector/waiter-serving-flat-illustration_133260-1886.jpg" alt="" />
        <div>
            <h2>Join us</h2>
            <Link to='/user-login' style={{textDecoration:'none',border:'none'}}>Get Started</Link>
        </div>
    </div>
  )
}

export default Start