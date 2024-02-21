import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';

const Contact = ({ userRef, listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, 'users', userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error('Could not get landlord data');
      }
    }
    getLandlord();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {landlord !== null && (
        <div className='flex flex-col w-full'>
          <p className='mt-6 text-red-400'>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className='mt-3 mb-6'>
            <textarea
              name='message'
              id='message'
              rows='2'
              value={message}
              onChange={onChange}
              className='w-full px-4 py-2 text-md border border-yellow-500 rounded transition duration-150 ease-in-out  bg-gray-200 mt-4 focus:border-yellow-500 focus:bg-white focus:outline-none'
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button
              className='px-7 font-serif py-3 bg-slate-600 border border-yellow-500 text-yellow-500 rounded text-md shadow-md text-center mb-6 '
              type='button'
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
