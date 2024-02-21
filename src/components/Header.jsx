import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { IoIosSearch } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

const locales = ['en-GB', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'ja-JP', 'ru-RU'];

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode)
    ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
    : '';
}

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(locales[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuButtonClick = (path) => {
    if (path === '/offers' && !auth.currentUser) {
      navigate(path);
    } else {
      navigate(path);
      toggleMenu();
    }
  };

  const setSelectedLocale = (locale) => {
    const intlLocale = new Intl.Locale(locale);
    const langName = new Intl.DisplayNames([locale], {
      type: 'language',
    }).of(intlLocale.language);

    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdownContent = document.getElementById('dropdown-content');

    dropdownContent.innerHTML = '';

    const otherLocales = locales.filter((loc) => loc !== locale);
    otherLocales.forEach((otherLocale) => {
      const otherIntlLocale = new Intl.Locale(otherLocale);
      const otherLangName = new Intl.DisplayNames([otherLocale], {
        type: 'language',
      }).of(otherIntlLocale.language);

      const listEl = document.createElement('li');
      listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
        otherIntlLocale.region
      )}" />`;
      listEl.value = otherLocale.toLocaleUpperCase();
      listEl.addEventListener('mousedown', function () {
        handleLanguageChange(otherLocale);
      });
      dropdownContent.appendChild(listEl);
    });

    dropdownBtn.innerHTML = `<img src="${getFlagSrc(
      intlLocale.region
    )}" />${langName}<span class="arrow-down font-serif"></span>`;
  };

  useEffect(() => {
    console.log('Current language:', currentLanguage);
    setSelectedLocale(currentLanguage);
    const browserLang = new Intl.Locale(navigator.language).language;
    for (const locale of locales) {
      const localeLang = new Intl.Locale(locale).language;
      if (localeLang === browserLang) {
      }
    }
  }, [currentLanguage]);

  const handleLanguageChange = (locale) => {
    setCurrentLanguage(locale);
    i18n.changeLanguage(locale);
  };

  return (
    <div className='bg-slate-700 shadow-sm relative'>
      <header className='flex justify-between items-center px-3 mx-auto sticky top-0 z-40 border-b border-yellow-500 w-full'>
        <div className='flex items-center ml-24'>
          <img
            src='/balearic.svg'
            alt='logo'
            className='h-28 ml-2 cursor-pointer'
            onClick={() => navigate('/')}
          />
        </div>
        <div className='hidden md:flex items-center border-b border-yellow-500 pb-1'>
          <form className='flex items-center'>
            <input
              type='text'
              className='bg-slate-700 text-yellow-500 focus:outline-none px-2 py-1 w-48'
            />
            <button
              type='submit'
              className='bg-slate-700 text-yellow-500 hover:text-yellow-400 focus:outline-none px-3 py-1 ml-1'
              style={{ marginLeft: '5px' }}
            >
              <IoIosSearch size={20} />
            </button>
          </form>
        </div>

        <div className='flex space-x-5 mr-4  md:hidden'>
          <button
            className='relative w-11 h-11 text-2xl font-serif overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all hover:shadow-yellow-500 hover:before:-translate-x-2 rounded-md'
            onClick={toggleMenu}
          >
            <span
              style={{ marginTop: '-5px', display: 'block' }}
              className='before:absolute before:right-0 before:top-0 before:h-4 before:w-4 before:translate-x-2 before:translate-y-1 before:rotate-6 before:opacity-10 before:duration-700'
            ></span>
            &#9776;
          </button>
        </div>

        {isMenuOpen && (
          <div
            className='md:hidden fixed inset-0 z-40 bg-gray-800 bg-opacity-75'
            onClick={toggleMenu}
          >
            <div className='flex items-center justify-center h-screen'>
              <div className='flex flex-col space-y-4'>
                <button
                  className='py-3 text-sm font-serif before:ease relative w-80 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500  rounded'
                  onClick={() => handleMenuButtonClick('/')}
                >
                  Home
                </button>

                {auth.currentUser && (
                  <button
                    className='py-3 text-sm font-serif before:ease relative w-80 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded'
                    onClick={() => handleMenuButtonClick('/profile')}
                  >
                    Profile
                  </button>
                )}

                <button
                  className='py-3 text-sm font-serif before:ease relative w-80 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded'
                  onClick={() => handleMenuButtonClick('/offers')}
                >
                  Offers
                </button>
                <button
                  className='py-3 text-sm font-serif before:ease relative w-80 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded'
                  onClick={() => handleMenuButtonClick('/about-us')}
                >
                  About us
                </button>
                <button
                  className='py-3 text-sm font-serif before:ease relative w-80 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded'
                  onClick={() => handleMenuButtonClick('/contact')}
                >
                  Contact
                </button>
                <button
                  className='py-3 text-sm font-serif before:ease relative w-80 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 rounded'
                  onClick={() => handleMenuButtonClick('/sign-in')}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
        <div className='hidden space-x-10 mr-5 md:flex'>
          <button
            className='py-3 text-sm font-serif before:ease relative w-16 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 hover:before:-translate-x-32 rounded-[16px]'
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className='py-3 text-sm font-serif before:ease relative w-16 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 hover:before:-translate-x-32 rounded-[16px]'
            onClick={() => handleMenuButtonClick('/offers')}
          >
            Offers
          </button>
          <button
            className='py-3 text-[12.4px] font-serif before:ease relative w-16 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 hover:before:-translate-x-32 rounded-[16px]'
            onClick={() => handleMenuButtonClick('/about-us')}
          >
            About us
          </button>

          <button
            className='py-3 text-sm font-serif before:ease relative w-16 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 hover:before:-translate-x-32 rounded-[16px]'
            onClick={() => handleMenuButtonClick('/contact')}
          >
            Contact
          </button>

          {isLoggedIn ? (
            <button
              className='py-3 text-sm font-serif before:ease relative w-16 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 hover:before:-translate-x-32 rounded-[16px]'
              onClick={() => handleMenuButtonClick('/profile')}
            >
              {isLoggedIn ? 'Profile' : 'Sign In'}
            </button>
          ) : (
            <button
              className='py-3 text-sm font-serif before:ease relative w-16 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 hover:before:-translate-x-32 rounded-[16px]'
              onClick={() => handleMenuButtonClick('/sign-in')}
            >
              Sign In
            </button>
          )}

          <div className='dropdown' tabIndex='0'>
            <button
              id='dropdown-btn'
              className='py-3 text-sm font-serif before:ease relative w-16 overflow-hidden border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-50 bg-slate-600 text-yellow-500 shadow-md transition-all before:absolute before:right-0 before:top-0 before:h-10 before:w-4 before:translate-x-6 before:rotate-6 before:bg-yellow-500 before:opacity-10 before:duration-700 hover:shadow-yellow-500 hover:before:-translate-x-32 rounded-full'
              onClick={toggleDropdown}
            >
              <img
                src={getFlagSrc(new Intl.Locale(currentLanguage).region)}
                alt=''
                className='w-6 h-6 inline-block font-serif'
              />
              <span className='ml-2'>{t('language')}</span>
              <span className='arrow-down ml-2 font-serif'>&#9660;</span>
            </button>
            <ul
              id='dropdown-content'
              className={`dropdown-content font-serif ${
                isDropdownOpen ? 'block' : 'hidden'
              } absolute shadow-lg  bg-slate-600 z-20 right-0 mt-2 w-36  rounded-md font-serif text-sm`}
            >
              {locales.map((locale) => (
                <li key={locale}>
                  <button
                    onClick={() => handleLanguageChange(locale)}
                    className='text-sm font-serif'
                  >
                    {t(`menu.${locale.split('-')[0]}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
