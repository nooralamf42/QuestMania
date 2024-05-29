import React, { useState } from 'react'   
import { useDispatch, useSelector } from 'react-redux'
import Home from './Home'
import { Container, Loading } from '../components'
import getProfilePicture from "../utils/getProfileImage"
import { addProfile } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../redux/appSlice'

function AddProfile() {
    const uid = useSelector(data=>data.user)?.uid
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    if(uid==null || uid == undefined) return (<Home/>)

    const submitHandler = (e) =>{
        e.preventDefault()
        setLoading(true)
        getProfilePicture('nooralamfiroz').then(({data})=>{
          dispatch(setProfile(data))
          addProfile(data, uid).then(()=>navigate('/'))
        }).catch(e=>toast(e.message)).finally(()=>setLoading(false))
    }
  return (
    <Container className={'max-w-[450px] w-[90%] py-20'}>
        <Loading visible={loading}/>
        <h1 className='text-xl font-semibold text-center'>Enter your instagram username  <br />or profile link</h1>
        <form onSubmit={submitHandler}>
          <input type="text" minLength={3} className='w-full rounded-2xl py-2 my-4 bg-white px-2'/>
          <button type="submit" className='w-full mt-3 rounded-2xl py-2 my-4 bg-black text-white text-xl hover:-rotate-3 duration-100'>Continue</button>
        </form>
    </Container>
  )}

export default AddProfile