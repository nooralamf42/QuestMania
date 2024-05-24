// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, } from 'firebase/auth'
import {arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc} from 'firebase/firestore'
import { useSelector } from "react-redux";

const firebaseConfig = {
    apiKey: "AIzaSyDRfcT6SQExjtrHH5UW3-QEtQL-4iDvAeE",
    authDomain: "questmania-d6054.firebaseapp.com",
    databaseURL: "https://questmania-d6054-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "questmania-d6054",
    storageBucket: "questmania-d6054.appspot.com",
    messagingSenderId: "764471043299",
    appId: "1:764471043299:web:6ceb9f0b6137e5e3b411d6",
    measurementId: "G-0DRWE36RMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export the Firebase modules you'll use
export const auth = getAuth(app) 
export const database = getFirestore(app)
export default app;

//functions to create, read and update docs

export const createMessege = async(messege, uid) =>{
    const docRef = doc(database, 'Messeges', uid)
    try {
        await updateDoc(docRef, {messeges : arrayUnion(messege)})
    } catch (error) {
        if(error.message.includes("No document to update")){
            try {
                await setDoc(docRef, {
                    messeges : [messege]
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    }
}

export const readMesseges = async(messege, uid) =>{
    const docRef = doc(database, 'Messeges', uid)
    try {
        const messages = await getDoc(docRef)
        return messages.data().messages
    } catch (error) {
        console.log(error.message)
    }
}
