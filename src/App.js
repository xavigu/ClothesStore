import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import SignPage from './pages/sign/sign.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  // method to unsubscribe
  unsubcribeFromAuth = null;

  // onAuthStateChanged gives back a function that when we call close the subscription
  componentDidMount(){
    this.unsubcribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});

      console.log(user);
    });
  };

  componentWillUnmount(){
    this.unsubcribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
