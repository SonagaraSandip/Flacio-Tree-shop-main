import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-2 items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-8xl sm:text-[20vh] lg:text-[40vh] font-librebaskerville leading-none'>404</h1>
      <p className='text-xl sm:text-3xl lg:text-4xl xl:text-6xl font-librebaskerville text-center mt-4 lg:mt-8'>
        Oops! That page can't be found.
      </p>
      <span className='h-px w-20 sm:w-24 lg:w-32 my-4 sm:my-6 lg:my-8 bg-gray-400' />
      <p className='text-sm sm:text-base lg:text-lg text-gray-500 text-center my-2 max-w-xs sm:max-w-sm lg:max-w-md mx-auto'>
        The link you followed may be broken, or the page may have been removed.
      </p>
      <button 
        onClick={() => navigate("/")} 
        className='bg-zinc-800 mt-4 sm:mt-6 lg:mt-8 hover:bg-green-950 uppercase text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base transition-colors duration-300 font-poppins'
      >
        back to homepage
      </button>
    </div>
  )
}

export default Error