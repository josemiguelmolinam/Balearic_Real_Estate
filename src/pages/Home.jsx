import { useState, useEffect } from 'react';
import Slider from '../components/MySlider';
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

const Home = () => {
  const [offerListings, setOfferListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  const [saleListings, setSaleListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(
          listingsRef,
          where('type', '==', 'sale'),
          orderBy('timestamp', 'desc'),
          limit(20)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  const [rentListings, setRentListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(
          listingsRef,
          where('type', '==', 'rent'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  return (
    <div>
      <Slider />
      <div className='max-w-7xl mx-auto pt-4 space-y-6'>
        {offerListings && offerListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-gray-300 text-3xl mt-6 font-serif'>
              Recent offers
            </h2>
            <Link to='/offers'>
              <p className='px-3 text-sm text-gray-300 hover:text-yellow-500 transition duration-150 ease-in-out'>
                Show more offers
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 '>
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-gray-300 text-3xl mt-6 font-serif'>
              Places for Rent
            </h2>
            <Link to='/category/rent'>
              <p className='px-3 text-sm text-gray-300 hover:text-yellow-500 transition duration-150 ease-in-out'>
                Show more places for Rent
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 '>
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-gray-300 text-3xl mt-6 font-serif'>
              Places for Sale
            </h2>
            <Link to='/category/sale'>
              <p className='px-3 text-sm text-gray-300 hover:text-yellow-500 transition duration-150 ease-in-out'>
                Show more places for Sale
              </p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 '>
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
