import React, { useState, useEffect } from 'react';
// import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';

const REACT_APP_API_URL = "http://localhost:5000/api"

const Profile = ({ history }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        phone: '',
        textChange: 'Update',
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

                const { role, name, email, phone } = res.data;
                // console.log(name, email);
                setFormData({ ...formData, role, name, email, phone });
            })
            .catch(err => {
                toast.error(`Error To Your Information ${err.response.statusText}`);
                if (err.response.status === 401) {
                    signout(() => {
                        Navigate('/login');
                    });
                }
            });
    };
    const { name, email, phone, password1, textChange, role } = formData;
    const _id = isAuth()._id;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };
    const handleSubmit = e => {
        const token = getCookie('token');
        e.preventDefault();
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
            .put(
                `${REACT_APP_API_URL}/user/update/`,
                {
                    _id,
                    name,
                    email,
                    phone,
                    password: password1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(res => {
                console.log("Updating user information")
                updateUser(res, () => {
                    toast.success('Profile Updated Successfully');
                    setFormData({ ...formData, textChange: 'Update' });
                });
            })
            .catch(err => {
                // console.log(err.response);
                toast.error(err.response.data.error);
                setFormData({ ...formData, textChange: 'Update' });
            });
    };

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer />
            <div className='max-w-screen-xl m-5 sm:m-5 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1 xl:w-5/12 p-5 sm:p-3'>
              <div className='mt-6 flex flex-col items-center'>
                <h1 className='text-1xl lg:text-3xl font-extrabold'>
                            Profile Update
                        </h1>

                        <form
                            className='w-full flex-1 mt-6 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative '>
                                <input
                                    // disabled
                                    className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='text'
                                    placeholder='Name'
                                    onChange={handleChange('name')}
                                    value={name}
                                />
                                <input
                                    className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                    type='text'
                                    placeholder='role'
                                    onChange={handleChange('role')}
                                    value={role}
                                />
                                <input
                                    className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                    type='email'
                                    placeholder='Email'
                                    disabled
                                    value={email}
                                />
                                <input
                                    className='w-full px-3 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                    type='Number'
                                    placeholder='Phone'
                                    onChange={handleChange('phone')}
                                    value={phone}
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
                                    className='mt-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                    <span className='ml-3'>{textChange}</span>
                                </button>
                            </div>
                            <div className='my-2 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Go To Home
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <a
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    href='/'
                                    target='_self'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Home</span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
            ;
        </div>
    );
};

export default Profile;