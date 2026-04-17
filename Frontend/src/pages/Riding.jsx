import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const ride = location.state?.ride

  return (
    <div className='h-screen relative flex flex-col justify-end'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img
          className='w-16'
          src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
          alt='Nexa Ride'
        />
        <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-home-4-line'></i>
        </Link>
      </div>

      <div className='h-1/4 p-6 bg-white relative z-10'>
        <h4 className='text-xl font-semibold mb-2'>Ride In Progress</h4>
        <p className='text-sm text-gray-700'>
          {ride?.pickup || 'Pickup not available'}
        </p>
        <p className='text-sm text-gray-700'>
          {ride?.destination || 'Destination not available'}
        </p>
      </div>

      <div className='h-screen fixed w-screen top-0 z-[-1]'>
        <LiveTracking />
      </div>
    </div>
  )
}

export default Riding
