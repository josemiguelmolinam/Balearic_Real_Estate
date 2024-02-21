import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import OAuth from '../components/OAuth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with the registration');
    }
  }

  return (
    <section
      className='flex flex-col md:flex-row h-screen items-center bg-slate-700
    border-yellow-500'
    >
      <div className='bg-slate-700 w-full h-screen mb-20 flex items-center justify-center'>
        <div className='w-full h-4/4 sm:w-2/3 sm:h-2/3 md:w-2/3 md:h-2/3 lg:w-3/4 lg:h-3/4 xl:w-4/5 xl:h-3/5 bg-slate-700 xl:rounded overflow-hidden flex items-center justify-center shadow-2xl'>
          <img
            className='w-full h-full object-cover'
            src='/villa7.jpg'
            alt='Villa'
          />
        </div>
      </div>

      <div className='bg-opacity-80 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-full md:h-screen px-6 lg:px-12 xl:px-12 flex items-center justify-center bg-slate-700 p-5 text-center  w-full'>
        <div className='w-full xl:mr-10 xl:mb-16'>
          <h1 className='text-xl font-sans-serif md:text-2xl font-bold leading-tight text-gray-300'>
            Sign up to your account
          </h1>

          <form onSubmit={onSubmit} className='mt-2'>
            <div>
              <label
                htmlFor='fullName'
                className='text-gray-300 flex flex-col items-start mb-2'
              >
                Full Name
              </label>
              <input
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mb-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                type='text'
                id='name'
                value={name}
                onChange={onChange}
                placeholder='Enter Full Name'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='text-gray-300 flex flex-col items-start mb-2'
              >
                Email Address
              </label>
              <input
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                type='email'
                id='email'
                value={email}
                onChange={onChange}
                placeholder='Enter Email Address'
              />
            </div>

            <div className='mt-2 relative mb-6'>
              <label
                htmlFor='password'
                className='text-gray-300 flex flex-col items-start mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  value={password}
                  onChange={onChange}
                  placeholder='Password'
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                />
                {showPassword ? (
                  <FaEyeSlash
                    className='absolute right-3 top-5 text-xl cursor-pointer'
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <FaEye
                    className='absolute right-3 top-5 text-xl cursor-pointer'
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>
            </div>

            <div className='text-sm text-blue-400 hover:text-yellow-500 font-semibold flex justify-end items-start my-3'>
              <p>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </p>
            </div>

            <button
              type='submit'
              className='py-3 text-sm font-serif before:ease relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded'
            >
              Sign Up
            </button>
          </form>

          <hr className='my-6 border-gray-300 w-full' />
          <OAuth />
          <div>
            <p className='mt-8 text-gray-300'>
              Have an Account?{' '}
              <Link
                className='text-blue-400 hover:text-yellow-500 font-semibold ml-2'
                to='/sign-in'
              >
                {' '}
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
