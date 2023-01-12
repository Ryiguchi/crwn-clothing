import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectCartTotal,
  selectCartItems,
} from '../../store/cart/cart.selectors';
import { selectCurrentUser } from '../../store/user/user.selector';

import { saveOrderStart } from '../../store/user/user.action';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles';

const PaymentForm = () => {
  const dispatch = useDispatch();

  const stripe = useStripe();

  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    // prevent default form behavior
    e.preventDefault();
    console.log(currentUser.email);

    // check to make sure there is a registered instance of stripe and elements
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);
    // send a fetch to backend to create a payment intent
    // Payment intent - used by stripe to register that a payment is coming and to confirm that it has gone through

    // request to get payment intent
    // fetch the route relative to your app URL
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount * 100,
        email: currentUser.email,
      }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'guest',
        },
      },
      setup_future_usage: 'off_session',
    });
    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful');
        const { id, amount } = paymentResult.paymentIntent;
        const dateObj = new Date();
        const date = dateObj.toString().slice(4, 15);
        const timestamp = Date.now();

        const order = {
          id,
          amount,
          date,
          timestamp,
          numItems: cartItems.length,
          orderItems: cartItems,
        };

        dispatch(saveOrderStart(currentUser, order));
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          button-type={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
