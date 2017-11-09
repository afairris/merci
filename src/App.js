import React, { Component } from 'react';
import * as firebase from 'firebase';
import LoggedInContainer from './LoggedInContainer'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      page: "home",
    }

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAgUFshhmoeH_BHb_UDkYoFkuGh2esrvYo",
      authDomain: "merci-mercier.firebaseapp.com",
      databaseURL: "https://merci-mercier.firebaseio.com",
      projectId: "merci-mercier",
      storageBucket: "merci-mercier.appspot.com",
      messagingSenderId: "913940678126"
    };
    firebase.initializeApp(config);
  }

    promptLogin()
    {
      const provider = new firebase.auth.FacebookAuthProvider()

      firebase.auth().signInWithRedirect(provider).then(function(result) {
        // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        const user = result.user;
        const userId = user.uid

        this.state = {
          database: firebase.database().ref('/users/').child(userId),
          isLoading: false,
          isLoggedIn: true
        }

        // // ...
      }).catch(function(error) {
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
        console.log(error)
      })
    }

    componentDidMount()
    {

      firebase.auth().onAuthStateChanged((user) => {
        if (user === null) {
          this.promptLogin()
        }

        console.log('Logged in', user.uid)

        // Set DB base
        const database = firebase.database().ref('/users/').child(user.uid)

        this.setState({
          database,
          isLoading: false,
          isLoggedIn: true
        })
      })
    }

    setPage(destination)
    {
      this.setState({
        page: destination
      })
    }

    render()
    {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Bonjour, Marie</h2>
          </div>

          {
            !this.state.isLoggedIn ?
              (
                <h2>You are logged out</h2>
              )
              : (
                <LoggedInContainer database={ this.state.database } page={ this.state.page } />
              )
          }
        </div>
      );
    }
  }

 export default App;