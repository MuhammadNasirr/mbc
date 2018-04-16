import React, { Component } from 'react'
import {
  View, Text, ScrollView, AsyncStorage, TouchableOpacity, StyleSheet, Image, ImageBackground
} from 'react-native';
import { Icon } from 'native-base';

import { Button, Header } from 'react-native-elements';
import axios from 'axios';
import { base_url, events, sectorsList, offers, User, profile } from '../../constants/constant'
import { logout } from '../../store/middleware/authMiddleWare';
import { connect } from 'react-redux'

class Dashbord extends Component {
  constructor(props) {
    super(props)
    this.state = ({

    })

  }
  componentDidMount() {
    // const { navigate } = this.props.navigation;
    this.props.navigation.setParams({ handleLogout: this._logout }),
      (error) => {
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

    console.disableYellowBox = true

  }
  static navigationOptions = {
    header: null

  }

  selectSectors() {
    const { navigate } = this.props.navigation;
    axios.get(`${base_url}${sectorsList}`)
      .then((res) => {
        navigate('BusinessCategoryScreen', { data: res.data.data, token: this.props.token })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  selectEvents() {
    const { navigate } = this.props.navigation;
    axios.get(`${base_url}${events}`, { 'headers': { 'Authorization': this.props.token } })
      .then((res) => {
        navigate('EventsScreen', { data: res.data.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  selectOffers() {
    const { navigate } = this.props.navigation;
    axios.get(`${base_url}${offers}`, { 'headers': { 'Authorization': this.props.token } })
      .then((res) => {
        navigate('OffersScreen', { data: res.data.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  selectProfile() {
    const { navigate } = this.props.navigation;
    AsyncStorage.getItem('token')
      .then((res) => {
        axios.get(`${base_url}${profile}`, { 'headers': { 'Authorization': res } })
          .then((res) => {
            navigate('ProfileScreen', { profileData: res.data.data })
          })
          .catch((error) => {
            console.log(error.response)
          })

      })
  }
  _logout() {
    const { navigate } = this.props.navigation;
    this.props.logout(navigate)
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("profiledata",this.props.profileInfo)
    return (

      <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >

      <Header
        leftComponent={<Icon name='home' style={{ marginLeft: 10, fontFamily: 'Gotham Rounded', color: '#fff' }} />}
        centerComponent={{ text: 'Home', style: { fontSize: 20, marginLeft: '-50%', fontWeight: 'bold', color: '#fff' } }}
        rightComponent={< Icon name="log-out" style={{ marginLeft: 10, color: '#fff' }} onPress={() => this._logout()} ></Icon>}
        backgroundColor='rgb(0,150,136)'
        outerContainerStyles={{ marginTop: '-2%' }}
      />
    <ScrollView>
      <View style={{ alignItems: 'center', minHeight: 350 }}>
        <Image source={require('../../../images/logotrans.png')} style={styles.logo} />
        <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', marginBottom: '8%' }}>
            <Button
              title=" Events"
              icon={{ name: 'event', size: 80 }}
              textStyle={{ marginRight: 10 }}
              onPress={() => this.selectEvents()}
              buttonStyle={{
                backgroundColor: 'rgb(0,150,136)',
                fontFamily: 'Gotham Rounded',
                width: 150,
                flexDirection: 'column',
                height: 120,

              }}
            />
            <Button
              icon={{ name: 'person-pin-circle', size: 80 }}
              title="sectors"
              textStyle={{ marginRight: 10 }}
              onPress={() => this.selectSectors()}
              buttonStyle={{
                backgroundColor: 'rgb(0,150,136)',
                fontFamily: 'Gotham Rounded',
                height: 120,
                width: 150,
                flexDirection: 'column'
              }}
            />
          </View>
          <View style={{ flexDirection: 'row',marginBottom: '8%' }}>

            <Button
              icon={{ name: 'local-offer', size: 80 }}
              title=" Offers"
              textStyle={{ marginRight: 10 }}
              onPress={() => this.selectOffers()}
              buttonStyle={{
                backgroundColor: 'rgb(0,150,136)',
                height: 120,
                fontFamily: 'Gotham Rounded',
                flexDirection: 'column',
                width: 150,
              }}
            />
            <Button
              icon={{ name: 'person', size: 80, marginRight: 10 }}
              title=" Profile"
              onPress={() => this.selectProfile()}
              textStyle={{ marginRight: 10 }}
              buttonStyle={{
                backgroundColor: 'rgb(0,150,136)',
                height: 120,
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: 'Gotham Rounded',
                // justifyContent:'center',
                width: 150,
              }}
            />
          </View>

        {this.props.profileInfo && this.props.profileInfo === "BUSINESS" ?
          <Button
            // rounded={true}
            icon={{ name: 'person', size: 80,marginRight: 10 }}
              textStyle={{ marginRight: 10 }}
              title=" CreateOffer"
            onPress={() => navigate('GenerateOfferScreen')}
            buttonStyle={{
              backgroundColor: 'rgb(0,150,136)',
              height: 120,
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'Gotham Rounded',
              // justifyContent:'center',
              width: 150,
              marginBottom:'8%'
              
// marginTop:'5%'
            }}
          />
          : null}
        </View>
      </View>

    </ScrollView>
  </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  loginimage: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  logo: {
    marginTop: '10%',
    marginBottom: 40,
    width: 200,
    height: 70,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

const mapStateToProps = (state) => {
  return {
    token: state.AuthReducers.token,
    profileInfo: state.AuthReducers.profileInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (navigate) => { dispatch(logout(navigate)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashbord)