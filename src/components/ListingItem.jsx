import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { IoTrashOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { DateTime } from 'luxon';

const ListingItem = ({ listing, id, onEdit, onDelete }) => {
  const formattedDate = DateTime.fromJSDate(
    listing.timestamp?.toDate()
  ).toRelative();

  return (
    <li className='text-gray-700 border border-yellow-500 shadow bg-neutral-600 relative flex flex-col justify-between items-center hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-150 m-[10px]'>
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img
          className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
          loading='lazy'
          src={listing.imgUrls[0]}
          alt={listing.name || ''}
        />
        <div className='absolute text-white top-2 left-2 bg-slate-600 border border-yellow-500 uppercase text-xs font-bodoni rounded-md px-2 py-1 shadow-2xl'>
          {formattedDate}
        </div>
        <div className='w-full p-[10px]'>
          <div className='flex items-center space-x-1'>
            <MdLocationOn className='h-4 w-4 mb-2 text-blue-500' />
            <p className=' font-bold text-sm mb-[2px] text-gray-300 dark:text-white truncate'>
              {listing.address}
            </p>
          </div>
          <p className='font-serif m-0 text-gray-300 text-2xl text-left truncate'>
            {listing.name}
          </p>
          <p className='text-gray-300 text-left mt-2 font-bold'>
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'}
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className='flex mt-[10px] items-center space-x-3'>
            <div className='flex text-gray-300 items-center space-x-1'>
              <p className='font-helvetica text-xs'>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
              </p>
            </div>
            <div className='flex text-gray-300 items-center space-x-1'>
              <p className='font-helvetica text-xs'>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : '1 Bath'}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <IoTrashOutline
          className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-yellow-500'
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <CiEdit
          className='absolute bottom-1.5 right-7 h-4 cursor-pointer text-yellow-500'
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
};

export default ListingItem;
