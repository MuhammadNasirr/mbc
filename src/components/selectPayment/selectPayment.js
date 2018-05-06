import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ToastAndroid
} from 'react-native';
import { SelectPayment } from 'react-native-checkout'
import { Button } from 'react-native-elements';
import BTClient from 'react-native-braintree-xplat';
import { base_url, CustomerSignup } from '../../constants/constant';

import axios from 'axios'
// import stripe from 'tipsi-stripe';
export default class Selectpayment extends Component {
  static navigationOptions = {
    headerTitle: 'Payment Method',
    headerTitleStyle: {
      color: '#ffff',
      textAlign: 'center',
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'rgb(0,150,136)'
    }
  }
  // braintree() {
  //   const token = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI5YzRiYWQxMmEzNzc1ZmRjNDJjMmJiMzkwMWQ4ODhlODQwZTkzZDYxYzgyOTgyYjU1MDBlZDNhYzUzZWRkMjM5fGNyZWF0ZWRfYXQ9MjAxNi0wNi0xOFQxNDoyMjo1MS43Mzc1OTcwMjcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWNjOWY2OHZ3Y2NrdDYzdGpcdTAwMjZwdWJsaWNfa2V5PW0ycGJ4a3F4Yzl5ZHQyYzIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvY2M5ZjY4dndjY2t0NjN0ai9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2NjOWY2OHZ3Y2NrdDYzdGovY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL2NjOWY2OHZ3Y2NrdDYzdGoifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiV2h5d2FpdCB0ZXN0IiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoiV2h5d2FpdF9zdmVuc2tfdGVzdDIiLCJjdXJyZW5jeUlzb0NvZGUiOiJTRUsifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6ImNjOWY2OHZ3Y2NrdDYzdGoiLCJ2ZW5tbyI6Im9mZiJ9";
  //   BTClient.setup(token)
  //     .then(function (success) {
  //       console.log(success)
  //       // BTClient.getCardNonce("4111111111111111", "10", "20").then(function(nonce) {console.log(nonce)}).catch(function(err) {console.log('error')})
  //     })
  //     .catch(function (err) { console.log(err) });
  //   BTClient.showPaymentViewController()
  //     .then(function (nonce) {
  //       //payment succeeded, pass nonce to server
  //       console.log(nonce)
  //     })
  //     .catch(function (err) {
  //       //error handling
  //       console.log(error)
  //     });
  // }
  // handlePayment() {
  //   this.props.navigation.state.params === undefined ?
  //     console.log("")
  //     :
  //     axios.post(`${base_url}${CustomerSignup}`, this.props.navigation.state.params.business)
  //       .then((res) => {
  //         navigate('LoginScreen')
  //         ToastAndroid.show("account created successfully", ToastAndroid.SHORT);
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.errors[0].message)
  //         ToastAndroid.show(error.response.data.errors[0].message, ToastAndroid.SHORT);
  //       })
  // }
  handleSignup() {
    const { navigate } = this.props.navigation;

    const obj = this.props.navigation.state.params.obj
    axios.post(`${base_url}${CustomerSignup}`, obj)
      .then((res) => {
        const { navigate } = this.props.navigation;
        navigate('LoginScreen')
        ToastAndroid.show("your account has been created", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log("", error.response.data.errors)
        ToastAndroid.show(error.response.data.errors[0].message, ToastAndroid.SHORT);
      })
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground source={require('../../../images/offer.jpg')} style={style.loginimage} >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button
            title="Finish"
            containerViewStyle={{ alignItems: 'center' }}
            buttonStyle={style.Button}
            onPress={() => this.handleSignup()} />
          {/* <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={this.braintree}>
            <Image source={require('../../../images/Paypal-Button.png')} style={style.logo} />

          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              title="Next"
              containerViewStyle={{ alignItems: 'center' }}
              buttonStyle={style.Button}
              onPress={this.props.navigation.state.params.data === "BUSINESS"?()=>this.handlePayment():null} />
            {this.props.navigation.state.params.data === "individual" ?
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text>Or</Text>
                <Button
                  title="Skip"
                  containerViewStyle={{ alignItems: 'center' }}
                  buttonStyle={style.Button}
                  onPress={() => this.handleSignup()} />

              </View> :
              null
            }
          </View>
        </View> */}
        </View>
      </ImageBackground>
    )
  }
}
const style = StyleSheet.create({
  Button: {
    backgroundColor: 'rgb(0,150,136)',
    marginTop: 25,
    marginBottom: 25,
    width: 250,
    borderRadius: 5
  },
  loginimage: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  logo: {
    width: 220,
    height: 75,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})