import React, { useState }  from 'react'

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import  './sign-in.styles.scss';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
const SignIn = ({emailSignInStart, googleSignInStart}) => {
  const [userCrendentials, setCredentials] = useState({ email: '', password: ''});

  const { email, password } = userCrendentials;
  
  const handleSubmit = async e => {
      e.preventDefault();

      emailSignInStart(email, password);
    }

  const handleChange = e => {
    const {value, name} = e.target;

    setCredentials({...userCrendentials, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput 
          name="email" 
          type="email"
          label="email" 
          value={email} 
          handleChange= {handleChange}
          required/>
        <FormInput 
          name="password" 
          type="password" 
          label="password" 
          value={password}
          handleChange= {handleChange} 
          required/>
        <div className='buttons'>
          <CustomButton type="submit">
            Sign in
          </CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>  
      </form>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn)
