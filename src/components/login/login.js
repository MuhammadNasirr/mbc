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
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
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
        const { navigate } = this.props.navigation;
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log('Result Name: ', result.name);
            this.props.getdata(result.name)
            navigate('SignupScreen')
            // alert('Result Name: ' + result.name);
        }
    }
    _signIn() {
        const { navigate } = this.props.navigation
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
        })
            .catch((err) => {
                console.log("Play services error", err.code, err.message);
            })
        GoogleSignin.configure({
            // scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
            //   iosClientId: <FROM DEVELOPER CONSOLE> // only for iOS
            webClientId: '663564521271-tg70kjob5okoji86lmpr7ctu3fej7uhg.apps.googleusercontent.com'
            , // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '' // [Android] specifies an account name on the device that should be used
        })
            .then(() => {
                GoogleSignin.signIn()
                    .then((user) => {
                        console.log("userdetails==", { user: user });
                        navigate('SignupScreen', { user: user })
                        // this.setState({ user: user });
                    })
                    .catch((err) => {
                        console.log('WRONG SIGNIN', err);
                    })
            })
            .catch(() => {
                console.log("eroro")
            })

    };
    fblogin() {
        var res = this._responseInfoCallback
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                console.log("resulr===", result)
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    const infoRequest = new GraphRequest(
                        '/me',
                        null,
                        res
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                }
            },
            function (error) {
                alert('Login fail with error: ' + error);
            }
        );

    }
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
                                <SocialIcon
                                    title='Continue with Facebook'
                                    button
                                    type='facebook'
                                    fontStyle={{ fontSize: 12 }}
                                    style={{ width: 190, height: 30, borderRadius: 5 }}
                                    onPress={() => this.fblogin()}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    marginTop: 10,
                                    borderColor: 'white',
                                    borderWidth: 0.5,
                                    width: 190,
                                    height: 30,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    backgroundColor: 'white',
                                    borderRadius: 3,
                                    padding: 12

                                }}
                                onPress={() => this._signIn()}
                            >
                                <GoogleSigninButton
                                    style={{ width: 30, height: 25 }}
                                    size={GoogleSigninButton.Size.Icon}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={() => this._signIn()} />
                                <Text style={{ fontSize: 13, color: 'black' }}>Continue with Google</Text>
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
        userType: (data) => { dispatch(AuthAction.checkUser(data)) },
        getdata: (data) => { dispatch(AuthAction.getuserdata(data)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);