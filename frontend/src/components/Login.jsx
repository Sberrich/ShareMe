import React from 'react'
import Googlelogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

const Login = () => {

  const responseGoogle = (response) => {
 
  }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className=' relative w-full h-full'>
        <video 
          src={shareVideo}
          type="video/mp4"
          loop
          autoPlay
          muted
          controls={false}
          className="w-full h-full object-cover"
        />
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
        <div className='p-5 '>
          <img src={logo} alt="logo" width='130px' />
        </div>
        <div className=' shadow-2xl'>
          <Googlelogin
            clientId=""
            render={(renderProps) => (
              <button
                type='button'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              >
                <FcGoogle className='mr-4' />Sign in with Google
              </button>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
