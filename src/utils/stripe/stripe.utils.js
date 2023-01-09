import { loadStripe } from '@stripe/stripe-js';

// must pass loadStripe the publishable key, found on your Stripe dash
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
