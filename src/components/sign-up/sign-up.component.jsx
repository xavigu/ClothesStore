import React from 'react'
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import  './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {signUpStart} = this.props;
    const {displayName, email, password, confirmPassword} = this.state;

    if (password !== confirmPassword) {
      alert('passwords don´t match');
      return;
    };

    signUpStart({displayName, email, password});

  }

  handleChange = e => {
    const {value, name} = e.target;

    this.setState({ [name]: value })
  }

  render() {
    const {displayName, email, password, confirmPassword} = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput 
            name="displayName" 
            type="text"
            label="Display Name" 
            value={displayName} 
            onChange= {this.handleChange}
            required/>
          <FormInput 
            name="email" 
            type="email"
            label="Email" 
            value={email} 
            onChange= {this.handleChange}
            required/>
          <FormInput 
            name="password" 
            type="password" 
            label="Password" 
            value={password}
            onChange= {this.handleChange} 
            required/>
          <FormInput 
            name="confirmPassword" 
            type="password" 
            label="Confirm password" 
            value={confirmPassword}
            onChange= {this.handleChange} 
            required/>
          <CustomButton type='submit'>
            SIGN UP
          </CustomButton>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);
