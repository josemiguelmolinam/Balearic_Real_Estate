import React from 'react';

const AboutUs = () => {
  return (
    <div className='container mt-20 my-24 mx-auto md:px-6'>
      <section className='mb-32 px-6 py-2'>
        <div className='block rounded-lg border border-yellow-500 bg-neutral-600'>
          <div className='flex flex-wrap items-center py-3 px-3'>
            <div className='w-full lg:flex lg:w-full'>
              <div className='w-full md:w-1/2 p-6'>
                <div className='grid xl:mt-8 grid-cols-3 gap-6'>
                  <img
                    className='rounded-lg xl:h-[380px] shadow-xl col-span-3'
                    src='./rols1.jpg'
                    alt='House 1'
                  />
                </div>
              </div>
              <div className='w-full md:w-1/2 p-6'>
                <div className='mb-8'>
                  <p className='text-sm text-gray-300 dark:text-white flex items-center'>
                    <svg
                      className='fill-current text-gray-400 w-3 h-3 mr-2'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0a12 12 0 0112 12c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12a12 12 0 0112-12zm0 2a10 10 0 00-10 10c0 5.524 4.477 10 10 10 5.522 0 10-4.476 10-10a10 10 0 00-10-10z' />
                      <path d='M12 14a2 2 0 100-4 2 2 0 000 4z' />
                    </svg>
                    Our Mission
                  </p>
                  <div className=' text-white font-serif text-2xl mb-2'>
                  Bringing Luxury Living to the Balearic Islands
                  </div>
                  <p className='text-gray-300 text-base'>
                  At Balearic Estate, we specialize in delivering luxury living experiences across the stunning Balearic Islands. From the pristine shores of Mallorca to the serene landscapes of Menorca, the vibrant energy of Ibiza, and the untouched beauty of Formentera, we are dedicated to helping you find your dream home in these enchanting islands.
  <br />
  <br />
                  Our mission is to elevate island living by providing unparalleled real estate services tailored to the unique charm and lifestyle of the Balearic Islands. Whether you're seeking to buy, sell, or rent a luxury property, our team is committed to exceeding your expectations and making your island living dreams a reality.
                  </p>
                </div>
                <div className='mb-8'>
                  <p className='text-sm text-gray-300 dark:text-white flex items-center'>
                    <svg
                      className='fill-current text-gray-400 w-3 h-3 mr-2'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0a12 12 0 0112 12c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12a12 12 0 0112-12zm0 2a10 10 0 00-10 10c0 5.524 4.477 10 10 10 5.522 0 10-4.476 10-10a10 10 0 00-10-10z' />
                      <path d='M12 14a2 2 0 100-4 2 2 0 000 4z' />
                    </svg>
                    Our Vision
                  </p>
                  <div className='text-white font-serif text-2xl mb-2'>
                  Setting New Standards in Balearic Estate
                  </div>
                  <p className='text-gray-300 text-base'>

Our vision is to set new standards in Balearic Estate by combining local expertise with global innovation. We aim to redefine the real estate experience in the Balearic Islands, offering cutting-edge technology, personalized service, and unmatched professionalism to our clients.
                  </p>
                </div>
                <div className='flex items-center'>
                  <img
                    className='w-[80px] h-[80px] rounded-full mr-4'
                    src='./me.jpg'
                    alt='Avatar of the company'
                  />
                  <div className='text-sm'>
                    <p className='text-gray-100 leading-none'>
                      Jose Miguel Molina
                    </p>
                    <p className='text-gray-300'>Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
