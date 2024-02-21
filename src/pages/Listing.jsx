import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsChevronLeft } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';
import { CiShare2 } from 'react-icons/ci';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { PiBathtub } from 'react-icons/pi';
import { GiHomeGarage } from 'react-icons/gi';
import { TbArmchair } from 'react-icons/tb';
import { getAuth } from 'firebase/auth';
import Contact from '../components/ContactUser';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const Listing = () => {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className='custom-arrow next'
        onClick={onClick}
        style={{
          color: 'rgb(234, 179, 8, 0.7)',
          position: 'absolute',
          top: '50%',
          right: '1rem',
          zIndex: '1',
          fontSize: '2.5rem',
          transform: 'translateY(-50%)',
        }}
      >
        <BsChevronRight />
      </button>
    );
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className='custom-arrow prev'
        onClick={onClick}
        style={{
          color: 'rgb(234, 179, 8, 0.7)',
          position: 'absolute',
          top: '50%',
          left: '1rem',
          zIndex: '1',
          fontSize: '2.5rem',
          transform: 'translateY(-50%)',
        }}
      >
        <BsChevronLeft />
      </button>
    );
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <main>
      <Slider {...carouselSettings}>
        {listing.imgUrls.map((url, index) => (
          <div
            key={index}
            className='relative w-full overflow-hidden h-[550px]'
          >
            <img
              src={url}
              alt={`Imagen ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Slider>
      <div
        className='fixed top-[17%] right-[3%] z-10 cursor-pointer border-yellow-500 py-3 text-xs font-semibold overflow-hidden transition-all bg-slate-600  border-2 rounded-full w-12 h-12 flex justify-center items-center border-opacity-50  before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-90 bg-opacity-60 before:duration-700 hover:shadow-yellow-500 shadow-md before:absolute before:right-0 before:top-0 before:h-10 before:w-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 10000);
        }}
      >
        <CiShare2 className='text-2xl text-yellow-500 before:opacity-80 text-opacity-80' />
      </div>
      {shareLinkCopied && (
        <p className='w-[150px] fixed top-[23%] right-[5%] shadow-xl font-serif border-2 border-yellow-500 text-gray-300 text-center rounded-md bg-slate-600 z-10 p-2'>
          <a
            href='https://www.facebook.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className='text-2xl text-gray-300 mr-2 cursor-pointer transition-all hover:text-yellow-500 hover:scale-105'
            />
          </a>
          <FontAwesomeIcon
            icon={faCopy}
            className='text-2xl text-gray-300 mr-2 cursor-pointer transition-all hover:text-yellow-500 hover:scale-105'
          />
          <a
            href='mailto:correo@ejemplo.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className='text-2xl text-gray-300 mr-2 cursor-pointer transition-all hover:text-yellow-500 hover:scale-105'
            />
          </a>
          <a
            href='https://api.whatsapp.com/send?phone=NUMERO_DE_TELEFONO'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className='text-2xl text-gray-300 mr-2 cursor-pointer transition-all hover:text-yellow-500 hover:scale-105'
            />
          </a>
        </p>
      )}

      <div className='m-4 border border-yellow-500 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg  bg-neutral-600 lg:space-x-5'>
        <div className='w-full'>
          <p className='text-2xl font-serif mb-3 text-gray-300  '>
            {listing.name} -{' '}
            <span className='font-semibold'>
              {listing.offer
                ? `${listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`
                : `${listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`}
              {listing.type === 'rent' ? '/ Month' : ''}
            </span>
          </p>

          <p className='flex text-gray-300 items-center mt-6 mb-3 font-semibold '>
            <FaMapMarkerAlt className='flex mb-1 text-blue-500 mr-1 md:top-0 md:relative' />
            {listing.address}
          </p>
          <div className='flex justify-start items-center space-x-4 w-[75%]'>
            <p className='max-w-[200px] p-2 font-serif shadow-md text-yellow-500 w-full py-1 text-center text-sm rounded-full transition duration-150 ease-in-out hover:shadow-md border border-yellow-500 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50  before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500  relative overflow-hidden before:ease bg-slate-600'>
              {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer && (
              <p className='max-w-[200px] p-2 font-serif shadow-md text-yellow-500 w-full py-1 text-center text-sm rounded-full transition duration-150 ease-in-out hover:shadow-md border border-yellow-500 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50  before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500  relative overflow-hidden before:ease bg-slate-600'>
                {+listing.regularPrice - +listing.discountedPrice} € Discount
              </p>
            )}
          </div>
          <p className='mt-6 mb-3 text-gray-300'>
            <span className='font-semibold'>Description - </span>
            {listing.description}
          </p>
          <ul className='flex text-gray-100 items-center space-x-1 sm:space-x-10 text-sm font-semibold mt-6'>
            <li className='flex items-center whitespace-nowrap '>
              <IoBedOutline className='text-lg mr-1' />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
            </li>
            <li className='flex items-center whitespace-nowrap '>
              <PiBathtub className='text-lg mr-1' />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : '1 Bath'}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <GiHomeGarage className='text-lg mr-1' />
              {listing.parking ? 'Parking spot' : 'No parking'}
            </li>
            <li className='flex items-center whitespace-nowrap '>
              <TbArmchair className='text-lg mr-1' />
              {+listing.furnished ? 'Furnished' : 'Not furnished'}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className='mt-6 xl:ml-28 ml-10 '>
              <button
                onClick={() => setContactLandlord(true)}
                className='px-20 py-3 ml-7 bg-slate-600 text-yellow-500 font-serif font-medium text-sm uppercase rounded shadow-md hover:shadow-yellow-500 hover:shadow-md border border-yellow-500 text-center'
              >
                Contact
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className='w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2 rounded-lg'>
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                <div>
                  <p className='text-gray-700 font-semibold'>
                    {listing.address}
                  </p>
                  <p className='text-gray-700'>{listing.name}</p>
                  {listing.imgUrls.length > 0 && (
                    <img src={listing.imgUrls[0]} alt={listing.name} />
                  )}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
};

export default Listing;
