import React from 'react';

const Button = ({ onClick, label, bgColor, textColor }) => {
  const buttonClassName = `p-4 my-4 bg-${bgColor} text-${textColor} w-full rounded-lg`;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
