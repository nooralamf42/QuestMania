import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import { toast } from "react-toastify"
import { Loading } from "../components"

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Signup() {

    const [inputs, setInputs] = useState({email:'', password:''})
    const [loading, setLoading] = useState(false)
    const submitHandler = (e) =>{
      setLoading(true)
      e.preventDefault()
      createUserWithEmailAndPassword(auth,inputs.email, inputs.password)
        .then((data)=>{
          toast.success("Account created")
        }).catch(e=>toast.error(e.message)).finally(()=>setLoading(false))  
    }

    return (
      <>
        <Loading visible={loading}/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://ss-six-phi.vercel.app/assets/shh-Er9Jewbo.svg"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to create your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={(e)=>submitHandler(e)} >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e)=>setInputs({...inputs, email: e.target.value})}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e)=>setInputs({...inputs, password: e.target.value})}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
  
            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p> */}
          </div>
        </div>
      </>
    )
  }
  