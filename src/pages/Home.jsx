import React from 'react'
import { useSelector } from 'react-redux'
import { CreateLink } from '../components'

function Home() {
  const isLogged = useSelector(data=>data.user)
  return (
    <section className='text-center py-12'>
      <h1 className='text-3xl mb-5'>Ask anonymous questions! !</h1>
        {
          isLogged && <CreateLink/>
        }
    </section>
  )
}

export default Home