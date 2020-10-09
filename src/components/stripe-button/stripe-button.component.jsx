import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HaJn3KLn7jv1f2jHLob7b14qaYp1EYq16lajJhdpxNWtCVPraHXS3KWsqO9tow43QEkpHXZKDlOIKhl9OxijdF300vxS4ZExu';

  const onToken = (token) => {
    // in this function we need pass the token to the backend server
    console.log(token);
    alert('Payment Success');
  };

  return (
    <StripeCheckout
      label="Pay Now" // text inside the Stripe button
      name="CRWN Clothing" // the pop-in header title
      description={`Your total is ${price}$`} // the pop-in header subtitle
      image="https://svgshare.com/i/CUz.svg" // the pop-in header image
      amount={priceForStripe} // cents
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="USD"
    ></StripeCheckout>
  );
};

export default StripeCheckoutButton;
