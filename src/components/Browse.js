import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

/**
 * Browse component for displaying options to view booking history and book hotels.
 * @component
 */
const Browse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Use useEffect for navigation
    if (!user.data) {
      navigate('/');
    }
  }, [user.data, navigate]);

  /**
   * Handles the click event for navigating to the ViewBookingHistory page.
   * @function
   */
  const handleViewBookingHistory = () => {
    navigate('/booking-history');
  };

  /**
   * Handles the click event for navigating to the BookHotels page.
   * @function
   */
  const handleBookHotels = () => {
    navigate('/book-hotel');
  };

  /**
   * Handles the click event for signing out.
   * @function
   */
  const handleSignOut = () => {
    dispatch(removeUser());
    navigate('/');
  };

  return (
    <div className='max-w-2xl mx-auto mt-8'>
      <div className="flex justify-end">
        <button onClick={handleSignOut} className="text-red-500 hover:underline focus:outline-none">
          Sign Out
        </button>
      </div>

      {user && (
        <div className="flex flex-col items-center space-y-4  pt-10">
          <button
            onClick={handleBookHotels}
            className='py-2 px-3 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none'
          >
            Book Hotels
          </button>

          <button
            onClick={handleViewBookingHistory}
            className='py-2 px-3 mb-4 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none'
          >
            View Booking History
          </button>
        </div>
      )}
    </div>
  );
};

export default Browse;
