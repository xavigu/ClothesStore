import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import SignPage from './pages/sign/sign.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // check data in database of that userRef
        userRef.onSnapshot(snapshot => {
          // pass de log as second parameter because is async and that function only calls after setState
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state);
          })
        });
      }
      // setState to null if there is not userAuth
      this.setState({ currentUser: userAuth });
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
}

export default App;
