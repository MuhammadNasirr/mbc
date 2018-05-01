import React, { Component } from "react";
import { loginStyles } from "./style";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
    StyleSheet,
    TextInput,
    ImageBackground
} from "react-native";
import { connect } from 'react-redux'
import { Header, FormInput, FormLabel, Button, Icon, Input, SocialIcon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Circle from 'react-native-vector-icons/Entypo'
import Google from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';

import { base_url, forgotPassword } from '../../constants/constant'

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            email: "",
            password: "",
            isLogin: false
        };

    }
    static navigationOptions = {
        // header:null,
        headerTitle: ' Reset Password ',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        },

    }
    submit() {
        const { navigate } = this.props.navigation;
        axios.post(`${base_url}${forgotPassword}`, { email: this.state.email })
            .then((res) => {
                alert('check your email to rest your password')
                ToastAndroid.show('your email to rest your password', ToastAndroid.SHORT)
                navigate('LogoutMenu')
            })
            .catch((error) => {
                ToastAndroid.show(error.response.data.errors[0].message, ToastAndroid.SHORT)
            })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >
                <KeyboardAwareScrollView>
                    <View style={loginStyles.form}>
                        <View style={{ marginTop: 30 }} >
                            <View style={styles.passwordContainer}>
                                <FormInput
                                    containerStyle={{
                                        width: 250,
                                        // marginLeft: 0, 
                                        borderRadius: 5,
                                        borderWidth: 0.5,
                                        marginBottom: 0,
                                        borderColor: '#d6d7da',
                                        backgroundColor: '#fff'
                                    }}
                                    placeholderTextColor="#D3D3D3"
                                    placeholder='email address'
                                    underlineColorAndroid='transparent'
                                    keyboardType="email-address"
                                    onChangeText={txt => this.setState({ email: txt })}
                                    dataDetectorTypes="address"
                                    value={this.state.email}
                                    inputStyle={{ marginLeft: '3%', fontFamily: 'Gotham Rounded' }}
                                />
                            </View>
                        </View>
                        <Button
                            title="Submit"
                            buttonStyle={loginStyles.loginButton}
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
    loginimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    },
    inputStyle: {
        flex: 1,
    },
    bgImage: {
        width: 250,
        height: 200,
    },
    logo: {
        width: 180,
        height: 60,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
export default ForgotPassword;