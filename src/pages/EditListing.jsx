import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EditListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    address,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  const params = useParams();

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error('You cannot edit this listing');
      navigate('/');
    }
  }, [auth.currentUser.uid, listing, navigate]);

  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate('/');
        toast.error('Listing does not exist');
      }
    }
    fetchListing();
  }, [navigate, params.listingId]);

  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error('Discounted price needs to be less than regular price');
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error('Maximum 6 images are allowed');
      return;
    }

    let geolocation = {};
    let location;

    if (geolocationEnabled) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
        );

        const data = await response.json();
        console.log(data);

        geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
        geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

        location = data.status === 'ZERO_RESULTS' && undefined;

        if (location === undefined) {
          setLoading(false);
          toast.error('Please enter a correct address');
          return;
        }
      } catch (error) {
        setLoading(false);
        toast.error('Error fetching geolocation data');
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    let imgUrls;

    try {
      imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      );
      console.log(imgUrls);

      if (imgUrls === undefined || imgUrls.length === 0) {
        setLoading(false);
        toast.error('No image URLs available');
        return;
      }

      const formDataCopy = {
        ...formData,
        imgUrls,
        geolocation,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
      };
      delete formDataCopy.images;
      !formDataCopy.offer && delete formDataCopy.discountedPrice;
      delete formDataCopy.latitude;
      delete formDataCopy.longitude;
      const docRef = doc(db, 'listings', params.listingId);

      await updateDoc(docRef, formDataCopy);
      setLoading(false);
      toast.success('Listing Edited');
      navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    } catch (error) {
      setLoading(false);
      toast.error('Error creating listing. Please try again.');
      console.error(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className='max-w-md px-4 mx-auto'>
      <h1 className='text-4xl text-gray-300 bg-slate-700 flex flex-col text-center mt-6 mb-6 font-serif items-center'>
        Edit Listing
      </h1>
      <form onSubmit={onSubmit}>
        <p className='text-gray-300 flex flex-col items-start mb-2'>
          Sell / Rent
        </p>
        <div className='flex mt-2 space-x-2'>
          <button
            type='button'
            id='type'
            value='sale'
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              type === 'rent'
                ? 'bg-white text-gray-700'
                : 'bg-slate-600 text-yellow-500'
            }`}
          >
            Sell
          </button>
          <button
            type='button'
            id='type'
            value='rent'
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none  focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              type === 'sale'
                ? 'bg-white text-gray-700'
                : 'bg-slate-600 text-yellow-500'
            }`}
          >
            Rent
          </button>
        </div>
        <p className='text-gray-300 flex flex-col mb-2 items-start mt-4'>
          Name
        </p>
        <input
          type='text'
          id='name'
          value={name}
          onChange={onChange}
          placeholder='Name'
          maxLength='32'
          minLength='10'
          required
          className='w-full px-3 text-gray-700 py-2 text-sm bg-gray-200 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out mb-6'
        />
        <div className='flex space-x-2 mb-6'>
          <div className='flex-1'>
            <p className='text-gray-300 flex flex-col items-start mb-2'>Beds</p>
            <input
              type='number'
              id='bedrooms'
              value={bedrooms}
              onChange={onChange}
              min='1'
              max='50'
              required
              className='w-full px-4 text-gray-700 py-2 text-sm bg-gray-200 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out mb-6 text-center'
            />
          </div>
          <div className='flex-1'>
            <p className='text-gray-300 flex flex-col items-start mb-2'>
              Baths
            </p>
            <input
              type='number'
              id='bathrooms'
              value={bathrooms}
              onChange={onChange}
              min='1'
              max='50'
              required
              className='w-full px-4 py-2 text-sm bg-gray-200 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out mb-6 text-center'
            />
          </div>
        </div>
        <p className='text-gray-300 flex flex-col items-start mb-2'>Parking</p>
        <div className='flex mt-2 space-x-2'>
          <button
            type='button'
            id='parking'
            value={true}
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm  font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              !parking
                ? 'bg-white text-gray-700'
                : 'bg-slate-600 text-yellow-500'
            }`}
          >
            Yes
          </button>
          <button
            type='button'
            id='parking'
            value={false}
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              parking
                ? 'bg-white text-gray-700'
                : 'bg-slate-600 text-yellow-500'
            }`}
          >
            No
          </button>
        </div>
        <p className='text-gray-300 mt-4 flex flex-col items-start mb-2'>
          Furnished
        </p>
        <div className='flex mb-6 space-x-2'>
          <button
            type='button'
            id='furnished'
            value={true}
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              !furnished
                ? 'bg-white text-gray-700'
                : 'bg-slate-600 text-yellow-500'
            }`}
          >
            Yes
          </button>
          <button
            type='button'
            id='furnished'
            value={false}
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              furnished
                ? 'bg-white text-gray-700'
                : 'bg-slate-600 text-yellow-500'
            }`}
          >
            No
          </button>
        </div>
        <p className='text-gray-300 flex flex-col mb-2 items-start mt-4'>
          Address
        </p>
        <textarea
          type='text'
          id='address'
          value={address}
          onChange={onChange}
          placeholder='Address'
          required
          className='w-full px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out mb-6'
        />
        {!geolocationEnabled && (
          <div className='flex space-x-6 justify-center mb-6'>
            <div className=''>
              <p className='text-gray-300 flex flex-col items-start mb-2'>
                Latitude
              </p>
              <input
                type='number'
                id='latitude'
                value={latitude}
                onChange={onChange}
                required
                min='-90'
                max='90'
                className='w-full px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out text-center'
              />
            </div>
            <div className=''>
              <p className='text-gray-300 flex flex-col items-start mb-2'>
                Longitude
              </p>
              <input
                type='number'
                id='longitude'
                value={longitude}
                onChange={onChange}
                required
                min='-180'
                max='180'
                className='w-full px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out text-center'
              />
            </div>
          </div>
        )}

        <p className='text-gray-300 flex flex-col mb-2 items-start mt-4'>
          Description
        </p>
        <textarea
          type='text'
          id='description'
          value={description}
          onChange={onChange}
          placeholder='Description'
          required
          className='w-full px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out mb-6'
        />
        <p className='text-gray-300 mt-4 flex flex-col items-start mb-2'>
          Offer
        </p>
        <div className='flex mb-4 space-x-2'>
          <button
            type='button'
            id='offer'
            value={true}
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              !offer ? 'bg-white text-gray-700' : 'bg-slate-600 text-yellow-500'
            }`}
          >
            Yes
          </button>
          <button
            type='button'
            id='offer'
            value={false}
            onClick={onChange}
            className={`flex-1 px-4 py-2 text-sm font-serif relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all rounded mt-4 ${
              offer ? 'bg-white text-gray-700' : 'bg-slate-600 text-yellow-500'
            }`}
          >
            No
          </button>
        </div>
        <div className='flex items-center mb-6'>
          <div className=''>
            <p className='text-gray-300 flex flex-col items-start mb-2'>
              Regular Price
            </p>
            <div className='flex w-full justify-between items-center'>
              <div className='flex w-full justify-center items-center space-x-6'>
                <input
                  type='number'
                  id='regularPrice'
                  value={regularPrice}
                  onChange={onChange}
                  min='50'
                  max='400000000'
                  required
                  className='w-full px-2 py-2 text-gray-700 text-sm bg-gray-200 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out text-center'
                />
              </div>
              {type === 'rent' && (
                <p className='text-md whitespace-nowrap text-gray-300 ml-2'>
                  € / Month
                </p>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className='flex items-center mb-6'>
            <div className=''>
              <p className='text-gray-300 flex flex-col items-start mb-2'>
                Discounted Price
              </p>
              <div className='flex w-full justify-between items-center'>
                <div className='flex w-full justify-center items-center space-x-6'>
                  <input
                    type='number'
                    id='discountedPrice'
                    value={discountedPrice}
                    onChange={onChange}
                    min='50'
                    max='400000000'
                    required={offer}
                    className='w-full px-2 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out text-center'
                  />
                </div>
                {type === 'rent' && (
                  <p className='text-md whitespace-nowrap text-gray-300 ml-2'>
                    € / Month
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className='mb-6 '>
          <p className='text-lg font-semibold text-gray-300 mb-2'>Images</p>
          <p className='text-white mb-2'>
            The first image will be the cover (max 6)
          </p>
          <input
            type='file'
            id='images'
            onChange={onChange}
            accept='.jpg,.png,.jpeg'
            multiple
            required
            className='w-full py-3 text-sm bg-gray-200 text-gray-700 rounded-lg border focus:border-yellow-500 focus:bg-white focus:outline-none transition duration-150 ease-in-out text-center'
          />
        </div>
        <button
          type='submit'
          className='mb-6 mt-4 w-full px-7 py-3 text-lg font-serif before:ease relative overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded'
        >
          Edit Listing
        </button>
      </form>
    </main>
  );
};

export default EditListing;
