import React, { Component } from "react";
import { GenerateStyles } from "./style";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
    StyleSheet,
    TextInput,
    ImageBackground,
    DatePickerAndroid
} from "react-native";
import { connect } from 'react-redux'
import { Header, FormInput, FormLabel, Button, Icon, Input, SocialIcon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';

import { base_url, companies, createOffer } from '../../constants/constant';
const Accounts = [];

class GenerateOffer extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        let today = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fullDate = year + '-' + month + '-' + today;
        this.state = {
            code: '',
            description: "",
            date: fullDate
        };
    }
    componentDidMount() {
        let date = new Date();
        let today = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fullDate = today + '/' + month + '/' + year;
        this.setState({
            date: fullDate
        })
    }

    static navigationOptions = {
        // header: null,
        headerTitle: ' Generate offer ',
        headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Gotham Rounded',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        },
    }
    submit() {

        const obj = {
            attributes: {
                code: this.state.code,
                description: this.state.description,
                expiryDate: this.state.date
            }
        }
        axios.post(`${base_url}/${companies}/1${createOffer}`, obj, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                console.log(res)
                alert('offer successfully create ')
            })
            .catch((err) => {
                alert(err.response.data.errors[0].message)
            })
        this.setState({
            description: '',
            code: ''
        })
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >

                <KeyboardAwareScrollView>
                    <View style={GenerateStyles.form}>
                        <View style={{ marginTop: 30 }} >
                            <View style={styles.passwordContainer}>
                                <FormInput
                                    containerStyle={{
                                        width: 250,
                                        borderRadius: 5,
                                        borderWidth: 0.5,
                                        marginBottom: 0,
                                        borderColor: '#d6d7da',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder='Code'
                                    underlineColorAndroid='transparent'
                                    keyboardType="email-address"
                                    onChangeText={txt => this.setState({ code: txt })}
                                    dataDetectorTypes="address"
                                    value={this.state.code}
                                    inputStyle={{ marginLeft: '3%', fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                    placeholderTextColor="#D3D3D3"
                                />
                            </View>
                            <View style={styles.passwordContainer}>
                                <FormInput
                                    containerStyle={{
                                        width: 250,
                                        borderRadius: 5,
                                        borderWidth: 0.5,
                                        marginBottom: 0,
                                        borderColor: '#d6d7da',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholder='Description'
                                    underlineColorAndroid='transparent'
                                    onChangeText={txt => this.setState({ description: txt })}
                                    value={this.state.description}
                                    inputStyle={{ marginLeft: '3%', fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                    placeholderTextColor="#D3D3D3"
                                />
 
                            </View>
                            <View style={{ flexDirection: 'row',alignItems:'center',marginLeft:'auto',marginRight:'auto' }}>
                                <Text style={{color:"white"}} >Expire At</Text>
                                <DatePicker
                                    style={{ width: 190, }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="DD/MM/YYYY"
                                    minDate={this.state.date}
                                    // maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0,     
                                        },
                                        dateInput: {
                                            marginLeft: 36,
                                        }
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />
                            </View>
                        </View>
                        <Button
                            title="Generate"
                            buttonStyle={GenerateStyles.Generatebutton}
                            onPress={() => this.submit()}
                            textStyle={{ fontFamily: 'Gotham Rounded', fontWeight: 'bold', fontSize: 18 }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    inputStyle: {
        flex: 1,
    },
    bgImage: {
        width: 250,
        height: 200,
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
        marginTop: 80,
        width: 200,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
const mapStateToProps = (state) => {
    return {
        token: state.AuthReducers.token,
    }
}
export default connect(mapStateToProps, null)(GenerateOffer);