import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"


function Home() {
  const clickHandler = async() => {
    try {
        const user = await createUserWithEmailAndPassword(auth, 'test@gmail.com', '@test123')
        if(user)
          console.log(user)
        else throw Error('error while creating user')
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
   <section className=''>
    <button className="rounded border px-2 my-4" onClick={clickHandler}>test here</button>
   </section>
  )
}

export default Home