import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import BookingHistory from './BookingHistory';
import BookHotel from './BookHotel';
import Error from './Error';

/**
 * Body component responsible for handling the main content based on the router.
 * @component
 * @returns {JSX.Element} The JSX representation of the Body component.
 */
const Body = () => {
  /**
   * Configures the router with an array of route objects.
   * @type {Object}
   */
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/browse',
      element: <Browse />,
    },
    {
      path: '/booking-history',
      element: <BookingHistory />,
    },
    {
      path: '/book-hotel',
      element: <BookHotel />,
    },
    {
      path: '/*',
      element: <Error />,
    },
  ]);

  /**
   * Renders the Body component with the configured router.
   * @returns {JSX.Element} The JSX representation of the rendered component.
   */
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
