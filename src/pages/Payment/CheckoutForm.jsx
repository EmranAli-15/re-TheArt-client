import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckoutForm = ({ info }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();

    const data = { email: user?.email, id: info };
    const [oneClass, setOneClass] = useState([]);
    const [price, setPrice] = useState(-1);

    useEffect(() => {
        axiosSecure.post('/getOneClass', data)
            .then(data => {
                setPrice(data.data.price);
                setOneClass(data.data);
            })
    }, [])

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName
                    },
                },
            },
        );

        console.log(paymentIntent);

        setProcessing(false);
        if (paymentIntent.status === 'succeeded') {
            const transactionId = paymentIntent.id;
            const update = { _id: oneClass._id, id: oneClass.dbId, email: oneClass.email, transactionId: transactionId }
            setTransactionId(`Transaction completed : ${transactionId}`);
            axiosSecure.patch('/updatingForPay', update)
                .then(res => console.log(res.data))
        }
    }

    return (
        <>
            <form className='m-8 md:w-2/3' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-info mt-8' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='ml-8 text-red-500 text-lg font-medium'>{cardError}</p>
            <p className='ml-8 text-green-500 text-lg font-medium'>{transactionId}</p>
        </>
    );
};

export default CheckoutForm;