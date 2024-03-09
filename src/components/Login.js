import React, { useState, useRef } from 'react';
import { checkValidData } from '../utils/util';
import Header from './Header';
import { BarLoader } from 'react-spinners';
import userSlice, { addUser } from "../utils/userSlice";
import { useDispatch } from 'react-redux';

/**
 * Login component for user authentication.
 * @component
 */
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const userId = useRef(null);

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

    // API endpoint
    const API_URL = 'http://localhost:4000/v1/auth';

    // Common options for fetch requests
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
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

      fetch(API_URL + '/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
          dispatch(userSlice({ data: data.data, isLogin: true, message: data.message }))
          alert(data.message);
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
      fetch(API_URL + '/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          dispatch(addUser({ data: data.data, isLogin: true, token: data.accessToken, message: data.message }))
          alert(data.message);
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
      <Header />
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
