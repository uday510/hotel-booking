import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BarLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { PROD_API_URL } from '../utils/util';

/**
 * ViewHotels component for selecting a date and viewing available hotels.
 * @component
 */
const ViewHotels = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Effect hook for navigation.
   */
  useEffect(() => {
    if (!user.data) {
      navigate('/');
    }
  }, [user.data, navigate]);

  /**
   * Handles the date change event.
   * @param {Date} date - Selected date.
   */
  const handleDateChange = (date) => {
    if (date <= new Date()) {
      alert('Please select a future date');
    } else {
      setSelectedDate(date);
    }
  };

  /**
   * Fetches hotels based on the selected date.
   */
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch(PROD_API_URL + '/hotels/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user?.data?.accessToken,
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
        }),
      });

      if (response.status === 401) {
        alert('Login expired, please login again.');
        dispatch(removeUser());
        navigate('/');
        return;
      }

      if (!response.ok) {
        alert('Failed to fetch hotels, please try again later');
        throw new Error('Failed to fetch hotels');
      }

      const data = await response.json();
      setHotelList(data.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the click event to view hotels.
   */
  const handleViewHotels = () => {
    if (selectedDate) {
      fetchHotels();
    }
  };

  /**
  * Handles the sign-out action and navigates to the home page.
  * @function
  */
  const handleSignOut = () => {
    dispatch(removeUser());
    navigate('/');
  };

  /**
   * Handles the click event to book a hotel.
   * @param {Object} hotel - The hotel object.
   * @param {string} hotel.id - ID of the selected hotel.
   */
  const handleBookHotel = async (hotel) => {
    try {
      setLoading(true);
      const response = await fetch(PROD_API_URL + '/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user?.data?.accessToken,
        },
        body: JSON.stringify({
          hotelId: hotel.hotelId,
          date: selectedDate.toISOString(),
        }),
      });


      if (response.status === 401) {
        alert('Login expired, please login again.');
        dispatch(removeUser());
        navigate('/');
        return;
      }

      if (!response.ok) {
        alert('Failed to book hotel, please try again later');
        throw new Error('Failed to book hotel');
      }

      const data = await response.json();
      const { hotelName, price, location, checkIn } = data.data;

      alert(`Hotel booked successfully!\n\nHotel Name: ${hotelName}\nPrice: $${price}\nLocation: ${location}\nCheck-In: ${checkIn}`);

      navigate('/booking-history');
    } catch (err) {
      setLoading(false);
      console.error('Error booking hotel:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate('/browse')} className="text-blue-500 hover:underline focus:outline-none">
            Back to Browse
          </button>
          <button onClick={handleSignOut} className="text-red-500 hover:underline focus:outline-none">
            Sign Out
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-4">Select Date</h2>
        <div className="flex items-center">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            minDate={new Date()}
          />
          <Button
            onClick={handleViewHotels}
            label="View Hotels"
            bgColor="blue-500"
            textColor="white"
            className="ml-auto"
          />
        </div>

        {loading && <BarLoader />}
       
        {hotelList.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mt-4 mb-2">Available Hotels:</h3>
            <ul>
              {hotelList.map((hotel) => (
                <li key={hotel._id} className="mb-4 p-4 border border-gray-300 rounded">
                  <h4 className="text-lg font-bold">{hotel.name}</h4>
                  <p className="text-gray-600">hotel-Id: {hotel.hotelId}</p>
                  <p className="text-gray-600">Location: {hotel.location}</p>
                  <p className="text-gray-600">Price: ${hotel.price}</p>
                  <Button
                    onClick={() => handleBookHotel(hotel)}
                    label="Book Hotel"
                    bgColor="blue-500"
                    textColor="white"
                    className="mt-auto"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewHotels;
