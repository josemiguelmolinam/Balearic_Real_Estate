import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from './Spinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const MySlider = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'));
      const querySnap = await getDocs(q);
      let listingsData = [];
      querySnap.forEach((doc) => {
        listingsData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listingsData);
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!listings || listings.length === 0) {
    return <></>;
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
    <Slider {...carouselSettings}>
      {listings.map(({ data, id }) => (
        <div
          key={id}
          onClick={() => navigate(`/category/${data.type}/${id}`)}
          className='w-full h-96 md:h-80 lg:h-96 xl:h-96 relative overflow-hidden bg-center'
        >
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${data.imgUrls[0]})` }}
          ></div>
        </div>
      ))}
    </Slider>
  );
};

export default MySlider;
