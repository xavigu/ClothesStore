import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { clearCart } from '../../redux/cart/cart.actions';
import './stripe-button.styles.scss';

const StripeCheckoutButton = ({ price, history, clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HaJn3KLn7jv1f2jHLob7b14qaYp1EYq16lajJhdpxNWtCVPraHXS3KWsqO9tow43QEkpHXZKDlOIKhl9OxijdF300vxS4ZExu';

  const onToken = (token) => {
    // in this function we need pass the token to the backend server
    console.log(token);
    // post request to /payment route using axios
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      console.log('Payment success:', response);
      alert('Payment successfull');
      clearCart();
      history.push('/shop');
    }).catch(error => {
      console.log('Payment error:', error);
      alert('There was an issue with your payment. Please sure you use the provided credit card.');
    })
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

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
})

export default withRouter(connect(null, mapDispatchToProps)(StripeCheckoutButton));
