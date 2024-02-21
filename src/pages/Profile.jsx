import { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import {
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  updateDoc,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ListingItem from '../components/ListingItem';
import { IoHomeOutline } from 'react-icons/io5';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName || '',
    email: auth.currentUser.email || '',
  });

  const { name, email } = formData;

  function onLogout() {
    auth.signOut().then(() => {
      navigate('/');
    });
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success('Profile details updated');
      setEditMode(false);
    } catch (error) {
      toast.error('Could not update the profile details');
    }
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  async function onDelete(listingID) {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success('Successfully deleted listing');
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }
  return (
    <>
      <section className='justify-center mt-8 flex flex-col h-screen items-center bg-slate-700'>
        <div className='bg-opacity-80 mb-40 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-full md:h-screen px-6 lg:px-12 xl:px-12 flex items-center justify-center bg-slate-700 p-5 text-center w-full'>
          <div className='w-full mb-72 px-3 mt-6'>
            <form className='' onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor='name'
                  className='text-gray-300 font-poppins flex flex-col items-start mb-2'
                >
                  Name
                </label>
                <input
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mb-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                  type='text'
                  id='name'
                  value={name}
                  disabled={!editMode}
                  onChange={onChange}
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='text-gray-300 font-poppins flex flex-col items-start mb-2'
                >
                  Email
                </label>
                <input
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                  type='email'
                  id='email'
                  value={email}
                  disabled
                />
              </div>

              <div className='flex justify-between mt-3 whitespace-nowrap text-sm sm:text-lg'>
                <button
                  type='button'
                  onClick={() => setEditMode((prevState) => !prevState)}
                  className='mr-3 py-3 text-sm font-serif before:ease relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded mt-4'
                >
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>

                {editMode ? (
                  <button
                    type='button'
                    onClick={() => onSubmit()}
                    className='ml-3 py-3 text-sm font-serif before:ease relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded mt-4'
                  >
                    Apply Changes
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={onLogout}
                    className='ml-3 py-3 text-sm font-serif before:ease relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded mt-4'
                  >
                    Log Out
                  </button>
                )}
              </div>

              <div className='flex justify-center'>
                <Link to='/create-listing'>
                  <button
                    type='submit'
                    className='w-full text-yellow-500 px-11 py-3 text-lg font-medium rounded shadow-md transition duration-150 ease-in-out hover:shadow-lg mt-10 border border-yellow-500 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50  before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500  relative overflow-hidden before:ease bg-slate-600'
                  >
                    <Link
                      to='/create-listing'
                      className='flex justify-center font-serif items-center'
                    >
                      <IoHomeOutline className='mr-6 text-yellow-500 text-4xl bg-slate-600 rounded-full p-1 border-2 border-yellow-500 shadow-md' />
                      Sell or rent your Property
                    </Link>
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className='max-w-6xl px-3 mx-auto text-center mt-[-350px]'>
        {!loading && listings.length > 0 && (
          <>
            <h2 className='text-4xl text-gray-300 text-center font-serif mb-15'>
              My Listings
            </h2>

            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
