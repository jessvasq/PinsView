import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import video1 from '../assets/share.mp4'
import logo from '../assets/logo1.png';
import { client } from '../utils/client'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const navigate = useNavigate();
    const user = false;

    const responseGoogle = (response) => {
        const decoded = jwtDecode(response.credential);
        localStorage.setItem('user', JSON.stringify(decoded));
        const { name, sub, picture } = decoded;

        //we'll use the googleId as the id of the document in our database, we need all the other fields to create a user in our database (see the backend)
        const doc = {
            _id : sub,
            _type: 'user',
            userName: name,
            image: picture,
        };
        
        client.createIfNotExists(doc).then(() => {
            navigate('/', {replace: true});
        });
    };

  return (
    <>
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video 
            //video properties
                src = {video1}
                type='video/mp4'
                //loop will replay the video as soon as it ends in a loop
                loop
                //controls will show the video controls, set to false to hide
                controls={false}
                //muted will mute the video
                muted
                //autoPlay will start the video automatically
                autoPlay
                className='w-full h-full object-cover'
            />

            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width='130px' alt='logo'></img>
                </div>


                <div className='shadow-2xl'>
                    {user ? (
                <div>Logged In</div>
                ) : (
                    <GoogleLogin 
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                        render= {(renderProps) => (
                            <button 
                                type='button'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className='bg-white text-black font-bold py-2 px-4 rounded-lg flex justify-center items-center p-3  cursor-pointer outline-none'
                            >
                                <FcGoogle className='mr-2' /> Sign in with Google
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onError={responseGoogle}
                />
            )}

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login;
