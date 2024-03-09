import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { removeUser } from '../utils/userSlice';
import { PROD_API_URL } from '../utils/util';

/**
 * BookingHistory component displays the booking history of the user.
 * It fetches the booking data from the API and renders it.
 * Redirects to the home page if the user is not logged in.
 *
 * @component
 * @returns {JSX.Element} The JSX representation of the BookingHistory component.
 */
const BookingHistory = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use useEffect for navigation
    if (!user.data) {
      navigate('/');
    }
  }, [user.data, navigate]);

  /**
   * Handles the sign-out action and navigates to the home page.
   * @function
   */
  const handleSignOut = () => {
    dispatch(removeUser());
    navigate('/');
  };

  /**
   * Fetch booking history data from the API.
   * Updates the state with the fetched data.
   */
  const fetchData = async () => {
    try {
      const response = await fetch(PROD_API_URL + '/bookings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user?.data?.accessToken,
        },
      });

      if (response.status === 401) { 
        // Token expired
        alert('Login expired, please login again.');
        dispatch(removeUser());
        navigate('/');
        return;
      }

      if (!response.ok) {
        alert('Failed to fetch booking history, please try again later');
        throw new Error('Failed to fetch booking history');
      }
      const data = await response.json();
      setBookingHistory(data.data);
    } catch (error) {
      console.error('Error fetching booking history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the user is not logged in
    if (!user?.data) {
      // Redirect to the home page
      navigate('/');
      return;
    }

    // Fetch booking history when the component mounts
    fetchData();
  }, [user, navigate]);

  if (!user?.data) {
    // If the user is not logged in, prevent rendering content
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/browse')} className="text-blue-500 hover:underline focus:outline-none">
          Back to Browse
        </button>
        <button onClick={handleSignOut} className="text-red-500 hover:underline focus:outline-none">
          Sign Out
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-4">Booking History</h2>
      {loading ? (
        <BarLoader />
      ) : (
        <>
          {bookingHistory.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul className="space-y-4">
              {bookingHistory.map((booking) => (
                <li key={booking.hotelName + booking.checkIn} className="bg-white p-6 rounded-lg shadow-md">
                  <div>
                    <span className="font-bold text-lg">Hotel Name:</span> {booking.hotelName}
                  </div>
                  <div>
                    <span className="font-bold text-lg">Price:</span> {booking.price}
                  </div>
                  <div>
                    <span className="font-bold text-lg">Location:</span> {booking.location}
                  </div>
                  <div>
                    <span className="font-bold text-lg">Check-In:</span> {new Date(booking.checkIn).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default BookingHistory;
