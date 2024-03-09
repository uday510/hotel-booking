import React from 'react';

/**
 * Error component to display a "Page Not Found" message for invalid routes.
 * @component
 * @returns {JSX.Element} The JSX representation of the Error component.
 */
const Error = () => {
  /**
   * Renders the Error component with a custom error message.
   * @returns {JSX.Element} The JSX representation of the rendered component.
   */
  return (
    <div>
      <h2>Error: Page Not Found</h2>
      <p>The requested page does not exist.</p>
    </div>
  );
};

export default Error;
