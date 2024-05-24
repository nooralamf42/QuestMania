import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { auth, database } from "../firebase/firebaseConfig"
import {arrayUnion, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import { ref, set } from "firebase/database"
import { useSelector } from "react-redux"


function Home() {
  const userId = auth.currentUser.uid
  const clickHandler = async() => {
    try {
        await updateDoc(doc(database, 'Users', userId), {messeges : 
          arrayUnion(
            'whats your aim'
          )
        })

        // const messeges = await getDoc(doc(database,'Users', userId))
        // console.log(messeges.data())
        // if(user)
        //   console.log(user)
        // else throw Error('error while creating user')
      
    } catch (error) {
      if(error.message.includes("No document to update")){
        console.log('hello')
        try {
          await setDoc(doc(database, 'Users', userId), {messeges : ['first messege']
          })
        } catch (error) {
          console.log(error)
        }
      }

      console.log(error.message)
    }
  }
  return (
   <section className=''>
    <button className="rounded border px-2 my-4" onClick={clickHandler}>test here</button>
   </section>
  )
}

export default Home