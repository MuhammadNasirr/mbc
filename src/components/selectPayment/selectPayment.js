import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
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
    console.log(this.props.navigation.state.params.data)
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SelectPayment
          enableApplePay={true} // optional, default: false
          applePayHandler={() => this.createtoken()} // optional
          paymentSources={[
            { last4: '1234', brand: 'American Express', more: 'stuff' },
            { last4: '2345', brand: 'Visa', more: 'stuff' },
            { last4: '2345', brand: 'Master Card', more: 'stuff' },
          ]} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for Stripe format.
          addCardHandler={() => console.log('Add Card Pressed!')}
          selectPaymentHandler={(paymentSource) => console.log(paymentSource)}
        />
        <Button
          title="Next"
          containerViewStyle={{ alignItems: 'center' }}
          buttonStyle={style.Button}
          onPress={() => navigate('LogoutMenu')} />
        {this.props.navigation.state.params.data === "individual" ?
          <View style={{ alignItems: 'center' }}>
            <Text>Or</Text>
            <Button
              title="Skip"
              containerViewStyle={{ alignItems: 'center' }}
              buttonStyle={style.Button}
              onPress={() => navigate('LogoutMenu')} />

          </View> :
          null
        }
      </View>
    )
  }
}
const style = StyleSheet.create({
  Button: {
    backgroundColor: 'rgb(0,150,136)',
    marginTop: 25,
    marginBottom: 25,
    width: 250,
  },
  logo: {
    width: 220,
    height: 75,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
