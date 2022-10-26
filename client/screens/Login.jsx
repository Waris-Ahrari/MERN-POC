import React, { useState, useEffect } from 'react';
// import authSvg from '../assests/login.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';

const REACT_APP_API_URL = "http://localhost:5000/api"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });
  const { email, password1, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  
  const navigate = useNavigate();

  const handleSubmit = e => {
    
    console.log(REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`${REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
            console.log('Logged in')
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted'
            });
            isAuth() && isAuth().role === 'admin'
              ? navigate('/admin')
              : navigate('/');
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {
            useEffect(() => {
                if (isAuth()){
                 navigate("/")   
                }
            },[])
        }

      {/* {isAuth() ? navigate('/') : null} */}
      <ToastContainer />
      <div className='max-w-screen-xl m-5 sm:m-5 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1 xl:w-5/12 p-5 sm:p-3'>
              <div className='mt-6 flex flex-col items-center'>
                <h1 className='text-1xl lg:text-3xl font-extrabold'>
              Account Sign In 
            </h1>
            <div className='w-full flex-1 mt-2 text-indigo-500'>
              <div className='flex flex-col items-center'>
                               

                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-2
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2'
                  href='/register'
                  target='_self'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign Up</span>
                </a>
              </div>
              <div className='my-6 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign In with e-mail
                </div>
              </div>
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <button
                  type='submit'
                  className='mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
                </button>
                <Link
                  to='/users/password/forget'
                  className='no-underline hover:underline text-indigo-500 text-sm text-right absolute right-0  mt-2'
                >
                  Forget password?
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            // style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;