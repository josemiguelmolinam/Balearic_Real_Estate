import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import { useParams } from 'react-router-dom';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listing');
      }
    }
    fetchListings();
  }, [params.categoryName]);

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listing');
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center text-gray-300 font-bold mt-6 mb-6'>
        {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className='flex justify-center items-center'>
              <button
                onClick={onFetchMoreListings}
                className='text-yellow-500 px-3 py-1.5 mb-7 text-md font-medium rounded shadow-md transition duration-150 ease-in-out hover:shadow-md mt-7 border border-yellow-500 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50  before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500  relative overflow-hidden before:ease bg-slate-600'
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p>
          There are no current{' '}
          {params.categoryName == 'rent'
            ? 'places for rent'
            : 'places for sale'}
        </p>
      )}
    </div>
  );
};

export default Category;
