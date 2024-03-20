import React, { useState, useRef, useEffect } from 'react';
import { checkValidData } from '../utils/util';
import { BarLoader } from 'react-spinners';
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  PROD_API_URL } from '../utils/util';

/**
 * Login component for user authentication.
 * @component
 */
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const userId = useRef(null);

  useEffect(() => {
    // Check if the user is already logged in
    if (user.data) {
      // User is logged in, navigate to /browse
      navigate('/browse');
    }
  }, [user.data, navigate]);

  /**
   * Toggles between sign-in and sign-up forms.
   */
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  /**
   * Handles the button click event for sign-in or sign-up.
   */
  const handleButtonClick = () => {
    const validationMessage = checkValidData(email.current.value, password.current.value);
    setErrMessage(validationMessage);

    if (validationMessage) return;

    setIsLoading(true);

    // Common options for fetch requests
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    // Data to be sent in the request body
    const requestBody = {
      email: email.current.value,
      password: password.current.value
    };
    if (!isSignInForm) {
      // Sign up
      requestOptions.body = JSON.stringify({
        ...requestBody,
        name: name.current.value,
        userId: userId.current.value
      });

      fetch(PROD_API_URL + '/auth/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (!data.data) {
            alert(data.message);
            return;
          }
          alert(`Signup successful. please login to continue`);
          setIsSignInForm(true);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Sign in
      requestOptions.body = JSON.stringify(requestBody);
      fetch(PROD_API_URL + '/auth/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (!data.data) {
            alert(data.message);
            return;
          }
          dispatch(addUser({ data: data.data, isLogin: true, token: data.accessToken, message: data.message }))
          alert(`Welcome back, ${data.data.name}`);
          navigate('/browse');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-6 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <div>
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
            <input
              ref={userId}
              type="text"
              placeholder="User Id"
              className="p-4 my-4 w-full bg-gray-700"
            />
          </div>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {errMessage && <p className="text-red-500 font-bold text-lg py-2">{errMessage}</p>}
        {isLoading ? <BarLoader color='#fff' po /> : <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>}
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to App? Sign Up Now" : "Already registered? Sign In Now."}</p>
      </form>
    </div>
  );
};

export default Login;
