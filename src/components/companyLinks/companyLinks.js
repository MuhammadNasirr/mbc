import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, ToastAndroid, ImageBackground } from 'react-native';
import {
    Button,
    Header,
    FormInput,
    FormLabel,
    Icon,
    Avatar,
    CheckBox,

} from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import { base_url, CustomerSignup } from '../../constants/constant'

// const Item = Picker.Item;
export default class CompanyLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: [],
            facebookUrl: '',
            LinkedinUrl: '',
            TwitterUrl: '',
            WebsiteUrl: ''
        }
    }
    static navigationOptions = {
        headerTitle: ' SOCIAL LINKS ',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        }
    }
    submit() {
        const { navigate } = this.props.navigation;
        const object = this.props.navigation.state.params.alllstate
        const data = {
            attributes: {
                userType: "BUSINESS",
                email: object.email,
                password: object.password,
            },
            relationships: {
                company: {
                    attributes: {
                        name: object.name
                    },
                    relationships: {
                        sector: {
                            attributes: {
                                id: object.id
                            }
                        },
                        address: {
                            attributes: {
                                line: object.line,
                                city: object.city,
                                postcode: object.postcode,
                                country: object.country
                            }
                        },
                        socialMediaLink: {
                            attributes: {
                                twitter: this.state.TwitterUrl,
                                facebook: this.state.facebookUrl,
                                linkedin: this.state.LinkedinUrl,
                                website: this.state.WebsiteUrl
                            }
                        }
                    }
                }
            }
        }
        navigate('SelectPaymentScreen', { obj: data })
        // axios.post(`${base_url}${CustomerSignup}`, data)
        //     .then((res) => {
        //         alert('success')
        //         navigate('SelectPaymentScreen', { data: this.props.navigation.state.params.data, obj: data })
        //     })
        //     .catch((error) => {
        //         console.log(error.response.data.errors[0].message)
        //         ToastAndroid.show(error.response.data.errors[0].message, ToastAndroid.SHORT);
        //     })

    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../../../images/login.png')} style={style.loginimage} >

                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../../../images/icon3.png')} style={style.logo} />
                            <Text style={{ color: '#fff', fontFamily: 'Gotham Rounded' }}>YOUR SOCIAL MEDIA PROFILE LINK</Text>
                            <View style={style.form}>
                                <View>
                                    <FormInput
                                        containerStyle={style.inputStyle}
                                        value={this.state.facebookUrl}
                                        onChangeText={txt => this.setState({ facebookUrl: txt })}
                                        underlineColorAndroid='transparent'
                                        placeholder="Facebook URL"
                                        inputStyle={{ fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                    />
                                    <FormInput
                                        containerStyle={style.inputStyle}
                                        value={this.state.TwitterUrl}
                                        onChangeText={txt => this.setState({ TwitterUrl: txt })}
                                        underlineColorAndroid='transparent'
                                        placeholder="Twitter URL"
                                        inputStyle={{ fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                    />
                                    <FormInput
                                        value={this.state.LinkedinUrl}
                                        underlineColorAndroid='transparent'
                                        placeholder="Linkedin URL"
                                        onChangeText={txt => this.setState({ LinkedinUrl: txt })}
                                        containerStyle={style.inputStyle}
                                        inputStyle={{ fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                    />
                                    <FormInput
                                        value={this.state.WebsiteUrl}
                                        underlineColorAndroid='transparent'
                                        placeholder="Website URL"
                                        onChangeText={txt => this.setState({ WebsiteUrl: txt })}
                                        containerStyle={style.inputStyle}
                                        inputStyle={{ fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                    />
                                </View>
                                <Button
                                    title="Next"
                                    buttonStyle={style.SignupButton}
                                    // onPress={() => navigate('SelectPaymentScreen', { data: this.props.navigation.state.params.data })}
                                    onPress={() => this.submit()}
                                    textStyle={{ fontSize: 20, fontFamily: 'Gotham Rounded' }}
                                />
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    bgImage: {
        width: 220,
        height: 170,

    },
    loginimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'stretch',
    },

    innerContainer: {
        alignItems: 'center',
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

    },
    SignupButton: {
        backgroundColor: 'rgb(0,150,136)',
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 5,
        fontFamily: 'Gotham Rounded',
        // height: 55,
        width: 250,
    },
    logo: {
        width: 120,
        height: 120,
        marginTop: '5%',
        marginBottom: '2%'
        // marginLeft: 'auto',
        // marginRight: 'auto'
    },
    registerSuggestionText: {
        marginTop: 5,
        marginBottom: 20,
        alignItems: 'center'
    },
    inputStyle: {
        width: 250, borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: '#fff',
        marginTop: '3%',
        fontFamily: 'Gotham Rounded',
        color: 'rgb(0,150,136)'
    },
    privacy: {
        fontSize: 10,
    }
})


