/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import InitialRoutes from './appNavigation/appNavigation'
import { connect } from 'react-redux';
class App extends Component {
  render() {
    console.log(this.props.isLogin)
    const Mainroot = InitialRoutes(this.props.islogin)
    return (
      <Mainroot />
      // <InitialRoutes />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    islogin: state.AuthReducers.isLoggedIn
  }
}
export default connect(mapStateToProps, null)(App)




{/* <TouchableOpacity
style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
     borderColor: 'white',
    borderWidth: 0.5,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto'

}}
>
<GoogleSigninButton
    style={{ width: 48, height: 48 }}
    size={GoogleSigninButton.Size.Icon}
    color={GoogleSigninButton.Color.Dark}
    onPress={() => this._signIn()} />
<Text style={{ color: 'white' }}>Sign in with Google</Text>
</TouchableOpacity> */}