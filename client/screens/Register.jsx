import React, { useState } from 'react';
// import authSvg from '../assests/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Navigate } from 'react-router-dom';

const REACT_APP_API_URL = "http://localhost:5000/api"

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
        textChange: 'Sign Up'
      });
    
      const { name, email, password1, password2, textChange } = formData;
      const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
      };
      const handleSubmit = e => {
        e.preventDefault();
        if (name && email && password1) {
          if (password1 === password2) {
            setFormData({ ...formData, textChange: 'Submitting' });
            axios
              .post(`${REACT_APP_API_URL}/register`, {
                name,
                email,
                password: password1
              })
              .then(res => {
                setFormData({
                  ...formData,
                  name: '',
                  email: '',
                  password1: '',
                  password2: '',
                  textChange: 'Submitted'
                });
                toast.success(res.data.message);
              })
              .catch(err => {
                setFormData({
                  ...formData,
                  name: '',
                  email: '',
                  password1: '',
                  password2: '',
                  textChange: 'Sign Up'
                });
                // console.log("IN REGISTER", err.data);
                toast.error(err.response.data.error);
              });
          } else {
            toast.error("Passwords don't matches");
          }
        } else {
          toast.error('Please fill all fields');
        }
      };
    
      return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
          {isAuth() ? <Navigate to='/' /> : null}
          <ToastContainer />
          <div className='max-w-screen-xl m-5 sm:m-5 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1 xl:w-5/12 p-5 sm:p-3'>
              <div className='mt-6 flex flex-col items-center'>
                <h1 className='text-1xl lg:text-3xl font-extrabold'>
                  Create an Account
                </h1>
    
                <form
                  className='w-full flex-1 mt-4 text-indigo-500'
                  onSubmit={handleSubmit}
                >
                  <div className='mx-auto max-w-xs s '>
                    <input
                      className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                      type='text'
                      placeholder='Name'
                      onChange={handleChange('name')}
                      value={name}
                    />
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
                    <input
                      className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                      type='password'
                      placeholder='Confirm Password'
                      onChange={handleChange('password2')}
                      value={password2}
                    />
                    <button
                      type='submit'
                      className='mt-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                      <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                      <span className='ml-2'>{textChange}</span>
                    </button>
                  </div>
                  <div className='my-3 border-b text-center'>
                    <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                      Need an Account ?
                    </div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <a
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-2
               bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-3'
                      href='/login'
                      target='_self'
                    >
                      <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                      <span className='ml-4'>Sign In</span>
                    </a>
                  </div>
                </form>
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

export default Register;