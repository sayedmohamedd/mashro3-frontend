import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const CustomCard = () => {
  const cardStyle = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '16px',
      // lineHeight: '24px',
      // padding: '10px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md mb-4 w-full">
      <label htmlFor="card-element" className="block text-lg font-medium mb-2">
        Card Details
      </label>
      <CardElement
        id="card-element"
        options={{ style: cardStyle }}
        className="h-1/2 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default CustomCard;
