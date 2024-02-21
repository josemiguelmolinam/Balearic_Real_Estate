import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className='container mt-20 my-24 mx-auto md:px-6 max-w-4xl'>
      <section className='mb-32 px-6 py-2'>
        <div className='block rounded-lg border border-yellow-500 bg-neutral-600'>
          <div className='flex flex-wrap items-center justify-center lg:justify-between mb-6 py-3 px-3'>
            <div className='w-full mb-10 lg:w-6/12 xl:w-7/12 lg:pr-12'>
              <form className='form-container'>
                <div className='mb-6 px-3 mr-2'>
                  <label
                    htmlFor='name'
                    className='block font-poppins text-sm font-medium text-gray-300'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    placeholder='Enter your name...'
                    name='name'
                    id='name'
                    className='md:w-[400px] w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                  />
                </div>
                <div className='mb-4 px-3 mr-2'>
                  <label
                    htmlFor='email'
                    className='block font-poppins text-sm font-medium text-gray-300'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    placeholder='Enter your email...'
                    name='email'
                    id='email'
                    className='md:w-[400px] w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                  />
                </div>
                <div className='mb-4 px-3 mr-2'>
                  <label
                    htmlFor='message'
                    className='block font-poppins text-sm font-medium text-gray-300'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    placeholder='Write your message...'
                    name='message'
                    rows='4'
                    className='md:w-[400px] w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none'
                  ></textarea>
                </div>
                <div className='text-center md:text-left px-3 mr-2 flex justify-between'>
                  <button
                    type='submit'
                    className='md:w-[200px] py-2 text-sm font-serif before:ease relative w-full overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-8 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded mt-2'
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div className='w-full mb-4 px-4 lg:w-6/12 xl:w-5/12 lg:mt-10'>
              <div className='h-[320px] mb-24 w-full'>
                <MapContainer
                  center={[39.5696, 2.6502]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                  className='left-0 z-10 top-0 h-full w-full rounded-lg'
                >
                  <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                  <Marker position={[39.5696, 2.6502]}>
                    <Popup>
                      <div className='text-center'>
                        <img
                          src='./logoempresa.png'
                          alt='Company Logo'
                          style={{ maxWidth: '150px', maxHeight: '150px' }}
                        />
                        <p className='text-black mt-2 ml-2'>
                          Street Join 33, 07013
                        </p>
                        <p className='text-black mt-2 ml-2'>
                          Palma, Balearic Islands
                        </p>
                        <p className='text-black mt-2 ml-2'>
                          Telephone: + 34123754853
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
                <div className='mt-6 px-3 py-2'>
                  <div className='flex items-center'>
                    <FaMapMarkerAlt className='text-yellow-500 mb-6 mr-2' />
                    <p className='text-gray-300 text-lg font-serif'>
                      Street Join 33, 07013 Palma, Balearic Islands
                    </p>
                  </div>
                  <div className='flex items-center mt-6'>
                    <FaPhoneAlt className='text-yellow-500 mr-2' />
                    <p className='text-gray-300 text-lg font-serif'>Telephone: +34 123 754 853</p>
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

export default Contact;
