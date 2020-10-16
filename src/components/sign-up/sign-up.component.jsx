import React, {useState} from 'react'
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import  './sign-up.styles.scss';

const SignUp = ({signUpStart}) => {
  const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: ''});
  const {displayName, email, password, confirmPassword} = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords don´t match');
      return;
    };

    signUpStart({displayName, email, password});
  }

  const handleChange = e => {
    const {value, name} = e.target;

    setUserCredentials({...userCredentials, [name]: value })
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput 
          name="displayName" 
          type="text"
          label="Display Name" 
          value={displayName} 
          onChange= {handleChange}
          required/>
        <FormInput 
          name="email" 
          type="email"
          label="Email" 
          value={email} 
          onChange= {handleChange}
          required/>
        <FormInput 
          name="password" 
          type="password" 
          label="Password" 
          value={password}
          onChange= {handleChange} 
          required/>
        <FormInput 
          name="confirmPassword" 
          type="password" 
          label="Confirm password" 
          value={confirmPassword}
          onChange= {handleChange} 
          required/>
        <CustomButton type='submit'>
          SIGN UP
        </CustomButton>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);
