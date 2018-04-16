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
    ImageBackground,
    ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'
import { Header, FormInput, FormLabel, Button, Icon, Input, SocialIcon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Circle from 'react-native-vector-icons/Entypo'
import Google from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import FBSDK from 'react-native-fbsdk';
import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
// import { GoogleSignin, } from 'react-native-google-signin';
import { userLogin, alreadyLogin, } from '../../store/middleware/authMiddleWare';
import { AuthAction } from '../../store/actions/authActions'
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
    componentDidMount() {
        var user = ''
        SplashScreen.hide();
        AsyncStorage.getItem('token')
            .then((data) => {
                if (data !== null) {
                    AsyncStorage.getItem('role')
                        .then((role) => {
                            this.props.userType(role)
                        })
                        .catch((err) => {
                            console.log(err.response)
                        })

                    this.props.alreadyLogin(data)
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

    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log('Result Name: ', result);
            // alert('Result Name: ' + result.name);
        }
    }
    // _signIn() {
    //     GoogleSignin.signIn()
    //         .then((user) => {
    //             console.log(user);
    //             // this.setState({ user: user });
    //         })
    //         .catch((err) => {
    //             console.log('WRONG SIGNIN', err);
    //         })
    //         .done();
    // }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >
                <ActivityIndicator size="large" color="#0000ff" animating={false} />
                <KeyboardAwareScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
                    <View style={loginStyles.form}>
                        <Image source={require('../../../images/logotrans.png')} style={styles.logo} />
                        <View style={{ marginTop: '10%' }} >
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
                                <LoginButton
                                    // publishPermissions={["publish_actions"]}
                                    readPermissions={["email", "user_friends", "public_profile"]}
                                    onLoginFinished={
                                        (error, result) => {
                                            if (error) {
                                                alert("login has error: " + result.error);
                                            } else if (result.isCancelled) {
                                                alert("login is cancelled.");
                                            } else {
                                                AccessToken.getCurrentAccessToken().then(
                                                    (data) => {
                                                        const infoRequest = new GraphRequest(
                                                            '/me?fields=name,picture',
                                                            null,
                                                            this._responseInfoCallback
                                                        );
                                                        // Start the graph request.
                                                        new GraphRequestManager().addRequest(infoRequest).start();
                                                    }
                                                )
                                            }
                                        }
                                    }
                                    onLogoutFinished={() => alert("logout.")} />
                            </View>
                            {/* <TouchableOpacity>
                                <SocialIcon
                                    type='google'
                                    iconColor='#fff'
                                    style={{ backgroundColor: '#2BB673' }}
                                />
                            </TouchableOpacity> */}
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
    },
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
        alreadyLogin: (data) => { dispatch(alreadyLogin(data)) },
        userType: (data) => { dispatch(AuthAction.checkUser(data)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);