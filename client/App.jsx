import {React, useEffect, useState} from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { signout, isAuth, getCookie } from './helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const REACT_APP_API_URL = "http://localhost:5000/api"

function App() {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie('token');
    console.log("Loading Profile");
    axios
      .get(`${REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const { role, name, email } = res.data;
        // console.log(name, email);
        setData({ ...Data, role, name, email });
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            Navigate('/login');
          });
        }
      });
    }
  
      const { name, email, role } = Data;
    
  
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      {
            useEffect(() => {
                if (!isAuth()){
                  navigate("/login")
                }
            },[])
        }
            <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-8/12 p-6 sm:p-6'>
          <div className='mt-6 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-2xl font-extrabold  text-center '>
              Welcome, {name}!
            </h1>
            <h3 className='text-center'>
              You are logged in with {email}.
            </h3>
            <div className='w-full flex-1 mt-4 text-indigo-500'>
              <div className='my-10 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Features
                </div>
              </div>
              <div className='mx-auto max-w-xs relative '>
                <Link
                  to='/login'
                  className='mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
                </Link>
                <Link
                  to='/register'
                  className='mt-2 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus  w-6  -ml-2' />
                  <span className='ml-3'>Sign Up</span>
                </Link>
                <Link
                  to='/profile'
                  className='mt-2 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-3 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>View Profile</span>
                </Link>
                <Link
                  to='/editprofile'
                  className='mt-2 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-3 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Edit Profile</span>
                </Link>
                
                <button
                  onClick={() => {
                    signout(() => {
                      navigate("/login")
                      toast.error('Signout Successfully');
                    });
                  }}
                  className='mt-2 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-out-alt  w-6  -ml-2' />
                  <span className='ml-3'>Signout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default App;