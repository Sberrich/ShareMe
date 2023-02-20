import React from 'react'
import Googlelogin from 'react-google-login'
import { useNavigate, useNavigationType } from 'react-router-dom'
import { gapi } from "gapi-script";
import {FcGoogle} from "react-icons/fc"
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { useEffect } from 'react';
import {client} from '../client';

const Login = () => {

  const navigate = useNavigate();

  const responseGoogle = (response) => {
  localStorage.setItem("user", JSON.stringify(response.profileObj));

  const {name, googleId, imageUrl} = response.profileObj;

  const doc = {
    _id: googleId,
    _type: "user",
    Username: name,
    Image: imageUrl
  }
  client.createIfNotExists(doc)
  .then(() => {
    navigate('/', {replace: true});
  })
    
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
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
            clientId="49083712404-jeppajgc89ek2hfv6c6896id19sem9hm.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                type='button'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              >
                <FcGoogle className='mr-4' />Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </div>
  )
}

export default Login
