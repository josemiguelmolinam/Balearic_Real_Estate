import { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was send');
    } catch (error) {
      toast.error(
        'Could not send reset password. Please provide a valid email address.'
      );
    }
  }
  return (
    <section
    className='flex flex-col md:flex-row h-screen items-center bg-slate-700
border-yellow-500'
  >
    <div className='bg-slate-700 w-full h-screen mb-12 flex items-center justify-center'>
    <div className='w-full h-4/4 mb-32 sm:w-2/3 sm:h-2/3 md:w-2/3 md:h-2/3 lg:w-3/4 lg:h-3/4 xl:w-4/5 xl:h-3/5 xl:rounded bg-slate-700 overflow-hidden flex items-center justify-center  shadow-2xl'>
      <img
        className='w-full h-full object-cover'
        src='/terraza1.jpg'
        alt='Villa'
      />
    </div>
  </div>

      <div className='bg-opacity-80 md:max-w-md xl:mr-16 xl:mb-24 lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-full md:h-screen px-6 lg:px-12 xl:px-10 flex items-center justify-center bg-slate-700 p-5 text-center w-full mt-[50px]'>
        <div className='w-full mt-[-350px] md:mt-0'>
          <h1 className='text-xl font-sans-serif md:text-2xl font-bold leading-tight text-gray-300'>
            Forgot Your Password?
          </h1>

          <form className='mt-auto' onSubmit={onSubmit}>
            <div>
              <label
                htmlFor='email'
                className='text-gray-300 flex mt-8 flex-col items-start mb-2'
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

            <button
              type='submit'
              className='py-3 text-sm font-serif before:ease relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded mt-6'
            >
              Send Reset Password
            </button>
          </form>

          <hr className='my-6 border-gray-300 w-full' />
          <OAuth />
          <div>
            <p className='mt-8 text-gray-300'>
              Remembered your password?{' '}
              <Link
                className='text-blue-400 hover:text-yellow-500 font-semibold ml-2'
                to='/sign-in'
              >
                {' '}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
