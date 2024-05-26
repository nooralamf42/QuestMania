// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, } from 'firebase/auth'
import {arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DB,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export the Firebase modules you'll use
export const auth = getAuth(app) 
export const database = getFirestore(app)
export default app;

//functions to create, read and update docs

export const createMessege = async(messege, uid) =>{
    function getCurrentDate() {
        const now = new Date();
      
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const date = now.getDate().toString().padStart(2, '0');
      
        return `${year}-${month}-${date}`;
      }
      
      function getCurrentTime() {
        const now = new Date();
      
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12; // Convert hours to 12-hour format
        hours = hours ? hours : 12; // The hour '0' should be '12'
        hours = hours.toString().padStart(2, '0');
      
        return `${hours}:${minutes}:${seconds} ${ampm}`;
      }
      
      const date = getCurrentDate();
      const time = getCurrentTime();   
    const docRef = doc(database, 'Messeges', uid)

    try {
        await updateDoc(docRef, {messeges : arrayUnion({messege, time, date})})

    } catch (error) {
        if(error.message.includes("No document to update")){
            try {
                await setDoc(docRef, {
                    messeges : [{messege, time, date}]
                })
            } catch (error) {
                toast.error(error.message)
                console.log(error.message)
            }
        }else(toast.error(error.message))
    }
}

export const readMesseges = async(uid) =>{
    const docRef = doc(database, 'Messeges', uid)
    try {
        const data = await getDoc(docRef)
        let message = data.data()
        return message.messeges
    } catch (error) {
        console.log(error.message)
    }
}
