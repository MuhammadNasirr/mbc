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
    // ImageBackground
} from "react-native";
import { connect } from 'react-redux'
import { Header, FormInput, FormLabel, Button, Icon, Input, SocialIcon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Circle from 'react-native-vector-icons/Entypo'
import Google from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import FBSDK from 'react-native-fbsdk';
const {
    LoginButton,
    AccessToken
} = FBSDK;

import { userLogin, alreadyLogin } from '../../store/middleware/authMiddleWare';
import { base_url, Login } from '../../constants/constant';
const Accounts = [];

class UserLogin extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            email: "",
            password: "",
        };
    }
    // componentDidMount() {

    //     SplashScreen.hide();

    // }
    componentDidMount() {
        SplashScreen.hide();
        AsyncStorage.getItem('token')
            .then((data) => {
                console.log("-----------", data)
                if (data !== null) {
                    this.props.alreadyLogin(data)
                    // this.props.login(obj, navigate)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }
    static navigationOptions = {
        header: null,
    }
    _handleLogin() {
        const { navigate } = this.props.navigation
        let obj = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.login(obj, navigate)
    }
    render() {
        const { navigate } = this.props.navigation;
        console.log("loginn--", this.props.isLogin)
        return (
            <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >
                <KeyboardAwareScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
                    <View style={loginStyles.form}>
                        <Image source={require('../../../images/logotrans.png')} style={styles.logo} />
                        <View style={{ marginTop: '10%' }} >
                            <View style={styles.passwordContainer}>
                                {/* <Icon
                                    name='person'
                                    color='#fff'
                                    size={20}
                                /> */}
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
                                    placeholder='Email address'
                                    // underLine='none'
                                    placeholderTextColor="#D3D3D3"
                                    underlineColorAndroid='transparent'
                                    keyboardType="email-address"
                                    onChangeText={txt => this.setState({ email: txt })}
                                    dataDetectorTypes="address"
                                    value={this.state.email}
                                    inputStyle={{ marginLeft: '3%', fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                // placeholderTextColor="rgb(0,150,136)"
                                />
                            </View>
                            <View style={styles.passwordContainer}>
                                {/* <Icon
                                    name='lock'
                                    color='#fff'
                                    size={20}
                                /> */}
                                <FormInput
                                    containerStyle={{
                                        width: 250, borderRadius: 5,
                                        borderWidth: 0.5,
                                        borderColor: '#d6d7da',
                                        backgroundColor: '#fff',
                                        marginTop: 0,
                                        // marginLeft: 0,
                                    }}
                                    placeholder='Password'
                                    placeholderTextColor="#D3D3D3"
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    onChangeText={txt => this.setState({ password: txt })}
                                    value={this.state.password}

                                    inputStyle={{ marginLeft: '3%', fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                />
                            </View>
                            <View>
                                <LoginButton
                                    publishPermissions={["publish_actions"]}
                                    onLoginFinished={
                                        (error, result) => {
                                            if (error) {
                                                alert("login has error: " + result.error);
                                            } else if (result.isCancelled) {
                                                alert("login is cancelled.");
                                            } else {
                                                AccessToken.getCurrentAccessToken().then(
                                                    (data) => {
                                                        alert(data.accessToken.toString())
                                                    }
                                                )
                                            }
                                        }
                                    }
                                    onLogoutFinished={() => alert("logout.")} />
                            </View>
                        </View>
                        <Button
                            title="Login"
                            buttonStyle={loginStyles.loginButton}
                            onPress={() => this._handleLogin()}
                            textStyle={{ fontFamily: 'Gotham Rounded', fontWeight: 'bold', fontSize: 18 }}
                        />
                    </View>
                    <View>
                        <View style={loginStyles.registerSuggestionText}>
                            <TouchableOpacity style={{ marginRight: '15%' }} onPress={() => navigate("ForgotPasswordScreen")}>
                                <Text style={{ color: '#fff', fontSize: 12 }}>Forgot password ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate("SignupScreen")}>
                                <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Gotham Rounded' }}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={loginStyles.socialIcons}>

                            <TouchableOpacity>
                                <SocialIcon
                                    type='facebook'
                                />
                            </TouchableOpacity>
                            <View style={{ borderRightColor: '#5F9EA0', borderRightWidth: 2, height: 30 }}></View>
                            <TouchableOpacity>
                                <SocialIcon
                                    type='google'
                                    iconColor='#fff'
                                    style={{ backgroundColor: '#2BB673' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    loginimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'stretch',
    },
    passwordContainer: {
        flexDirection: 'row',
        // marginLeft:'-2%',
        // borderBottomWidth: 1,
        // borderColor: '#000'
        paddingBottom: 10,
    },
    inputStyle: {
        flex: 1,
    },
    bgImage: {
        width: 250,
        height: 200,
    },
    logo: {
        marginTop: '18%',
        width: 200,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
const mapStateToProps = (state) => {
    return {
        isLogin: state.AuthReducers.isLoggedIn,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload, navigate) => { dispatch(userLogin(payload, navigate)) },
        alreadyLogin: (data) => { dispatch(alreadyLogin(data)) }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);