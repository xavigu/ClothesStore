import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import SignPage from './pages/sign/sign.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  // method to unsubscribe
  unsubcribeFromAuth = null;

  // onAuthStateChanged gives back a function that when we call close the subscription
  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // check data in database of that userRef
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });
        });
      }
      // setState to null if there is not userAuth
      setCurrentUser(userAuth);
    });
  };

  componentWillUnmount(){
    this.unsubcribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignPage} />
        </Switch>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
