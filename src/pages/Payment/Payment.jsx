import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    const id = useLoaderData();
    return (
        <div>
            <h2>Amar kache tk nai bhai.</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm info={id}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;