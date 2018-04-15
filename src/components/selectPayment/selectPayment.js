import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { SelectPayment } from 'react-native-checkout'
import { Button } from 'react-native-elements';
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
  render() {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground source={require('../../../images/login.png')} style={style.loginimage} >

        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <Image source={require('../../../images/Paypal-Button.png')} style={style.logo} />

          </TouchableOpacity>

          <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              title="Next"
              containerViewStyle={{ alignItems: 'center' }}
              buttonStyle={style.Button}
              onPress={() => navigate('LoginScreen')} />
            {this.props.navigation.state.params.data === "individual" ?
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text>Or</Text>
                <Button
                  title="Skip"
                  containerViewStyle={{ alignItems: 'center' }}
                  buttonStyle={style.Button}
                  onPress={() => navigate('LoginScreen')} />

              </View> :
              null
            }
          </View>
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
    borderRadius:5
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