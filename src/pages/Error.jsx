import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-2 items-center justify-start h-screen'>
      <h1 className='text-[40vh] font-librebaskerville'>404</h1>
      <p className='text-6xl font-librebaskerville'>Oops! That page can't be found.</p>
      <span className='h-px w-32 my-4 bg-gray-400' />
      <p className='text- text-gray-500 text-center my-2 max-w-sm mx-auto'>The link you followed may be broken, or the page may have been removed.</p>
      <button onClick={() => navigate("/")} className='bg-zinc-800 mt-2 hover:bg-green-950 uppercase text-white px-6 py-4 transition-colors duration-300 font-poppins'>back to homepage</button>
    </div>
  )
}

export default Error
