import React from 'react'
import Left from './Left.js'
import Right from './Right.js'
import Navbar from '../Navbar/Navbar.js'
const Landing = () => {
  return (
    <div className='w-full h-screen'>
        <Navbar/>
        <div className='flex  items-center h-[90%] w-full'>
        <Left/>
        <Right/>
        </div>
        
    </div>
  )
}

export default Landing