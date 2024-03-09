import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import Button from './Button';

/**
 * Header component displaying navigation options and user information.
 * @component
 * @returns {JSX.Element} The JSX representation of the Header component.
 */
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(removeUser());
    navigate('/');
  };
  
  useEffect(() => {
    if (user?.data) {
      navigate('/browse');
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => navigate('/browse')} className="text-blue-500 hover:underline focus:outline-none">
        Back to Browse
      </button>
      <button onClick={handleSignOut} className="text-red-500 hover:underline focus:outline-none">
        Sign Out
      </button>
    </div>
  )
};

export default Header;
