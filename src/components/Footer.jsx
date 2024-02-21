import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'react-feather';
import { FaRssSquare, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className='bg-slate-700 mt-auto p-5 text-center border-yellow-500 border-t w-full'>
      <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='text-center sm:text-left'>
            <p className='text-lg font-serif font-medium text-white'>
              About Balearic Estate
            </p>
            <ul className='mt-8 space-y-4 text-sm'>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Agency History
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Meet Our Expert Team
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Client Testimonials
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className='text-center sm:text-left'>
            <p className='text-lg font-serif font-medium text-white'>
              Luxury Estates
            </p>
            <ul className='mt-8 space-y-4 text-sm'>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Exclusive Residences & Villas
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Featured Projects
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  High-End Properties
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Property Portfolio
                </a>
              </li>
            </ul>
          </div>

          <div className='text-center sm:text-left'>
            <p className='text-lg font-serif font-medium text-white'>
              Services
            </p>
            <ul className='mt-8 space-y-4 text-sm'>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Buying and Selling Luxury Real Estate
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Personalized Real Estate Advisory
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Property Valuation
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Guides for Buyers and Sellers
                </a>
              </li>
            </ul>
          </div>

          <div className='text-center sm:text-left'>
            <p className='text-lg font-serif font-medium text-white'>Contact</p>
            <ul className='mt-8 space-y-4 text-sm'>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Office Information
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  className='text-gray-300 transition hover:text-yellow-500'
                  href='/'
                >
                  Property Showings
                </a>
              </li>
              <li>
                <a
                  className='group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'
                  href='/'
                >
                  <span className='text-white transition group-hover:text-yellow-500'>
                    Live Chat
                  </span>
                  <span className='relative flex h-2 w-2'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-85'></span>
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-teal-300'></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-16'>
          <div className='flex justify-center'>
            <img
              src='/balearic.svg'
              alt='logo'
              className='h-40 cursor-pointer'
              onClick={() => navigate('/')}
            />
          </div>

          <ul className='flex justify-center gap-6 sm:justify-end'>
            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-white transition hover:text-yellow-500'
              >
                <span className='sr-only'>Facebook</span>
                <Facebook size={24} />
              </a>
            </li>
            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-white transition hover:text-yellow-500'
              >
                <span className='sr-only'>Instagram</span>
                <Instagram size={24} />
              </a>
            </li>
            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-white transition hover:text-yellow-500'
              >
                <span className='sr-only'>Twitter</span>
                <FaXTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-white transition hover:text-yellow-500'
              >
                <span className='sr-only'>RSS</span>
                <FaRssSquare size={24} />
              </a>
            </li>
            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-white transition hover:text-yellow-500'
              >
                <span className='sr-only'>Youtube</span>
                <Youtube size={24} />
              </a>
            </li>
            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-white transition hover:text-yellow-500'
              >
                <span className='sr-only'>Linkedin</span>
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
        </div>
        <p className='mt-4 sm:mt-12 sm:ml-6 text-center text-sm text-white sm:text-right font-serif'>
          © Balearic Estate.com 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
