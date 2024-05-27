import React from 'react'
import { useSelector } from 'react-redux'
import { CreateLink } from '../components'
import { Link } from 'react-router-dom'

function Home() {
  const isLogged = useSelector(data=>data.user)
  return (
    <section className='text-center py-12'>
      
        {
          isLogged ? <CreateLink/> : (
            <div className='flex flex-col h-full justify-center items-center'>
              <h1 className='text-3xl mb-5 font-bold'>Shh !!</h1>
              <h2 className='text-2xl font-semibold drop-shadow-2xl text-gray-700'>Create account today to get anonymous questions</h2>
              <Link to={'/signup'} className="mt-10 block mx-auto text-white text-2xl hover:scale-105 duration-200 hover:-rotate-3 bg-green-500 py-4 rounded-2xl w-80 animate-bounce shadow-2xl">
        Get Your Own Messeges!
      </Link>
            </div>
          )
        }
    </section>
  )
}

export default Home