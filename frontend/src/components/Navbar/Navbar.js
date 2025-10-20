import React from 'react'
import Left from './Left'
import Center from './Center'
import Right from './Right'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-screen px-10 h-20 mt-3'>
        <Left/>
        <Center/>
        <Right/>
    </div>
  )
}

export default Navbar