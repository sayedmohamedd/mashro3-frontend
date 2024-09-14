// Hooks
import { useEffect, useState } from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
// Stripe
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
// Components
import CustomCard from '../components/CustomCard';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { scrollTop } from '../utils/helper';
import url from '../utils/url';

const stripePromise = loadStripe(
  'pk_test_51PycR2FvwLyiKJ6iy7Y5QM8O88aJxyKqjQPCMFJXMShBhKDjCjEVVfznJHQa7Mzr0ykkrV40RuzHxU2B6rWAPmmN00xEwH8dvR'
);

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  //   const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(error.message);
    } else {
      setError('');
      toast.success('Payment successful!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <CustomCard />
      <button
        type="submit"
        className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Pay
      </button>
      {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
      {/* {success && <div className="mt-2 text-green-500">{success}</div>} */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </form>
  );
};

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');

  const createPaymentIntent = async () => {
    try {
      const response = await fetch(
        `${url}/api/v1/payment/create-payment-intent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 1000 }), // Amount in cents
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    scrollTop();
    return () => {};
  }, []);

  return (
    <section>
      <div className="container mx-auto px-6 py-5 flex flex-col items-center h-fit bg-white min-h-[80vh]">
        {/* <h1 className="font-semibold text-2xl my-5 text-slate-900">
        </h1> */}
        <div className="w-full">
          <div className="w-full flex justify-center">
            <button
              onClick={createPaymentIntent}
              className="p-3 bg-green-500 rounded-md text-white mx-auto"
            >
              Create Payment
            </button>
          </div>
          {clientSecret && (
            <Elements stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
