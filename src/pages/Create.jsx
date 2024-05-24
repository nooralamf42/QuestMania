import { useState } from "react"
import { auth, createMessege, database } from "../firebase/firebaseConfig"
import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"


function Create() {
  const [message, setMessage] = useState('')
  const {username} = useParams()
  const clickHandler = async() => {
    createMessege(message, username)
  }
  return (
   <section className='text-center mb-12 mt-12'>
    <textarea type="text" onInput={(e)=>setMessage(e.currentTarget.value)} className="p-2" placeholder="type your question here"/><br />
    <button className="rounded border px-2 my-4" onClick={clickHandler}>Submit</button>
   </section>
  )
}

export default Create