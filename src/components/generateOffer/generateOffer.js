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
    TextInput
    // ImageBackground
} from "react-native";
import { connect } from 'react-redux'
import { Header, FormInput, FormLabel, Button, Icon, Input, SocialIcon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';

import { base_url, companies, createOffer } from '../../constants/constant';
const Accounts = [];

class GenerateOffer extends Component {
    constructor() {
        super();
        this.state = {
            code: '',
            description: "",
        };
    }

    static navigationOptions = {
        // header: null,
        headerTitle: ' Generate offer ',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#44592F'
        },
    }
    submit() {
        let date = new Date();
        console.log(date)
        let today = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fullDate = today + '/' + month + '/' + year;
        const obj = {
            attributes: {
                code: this.state.code,
                description: this.state.description,
                expiryDate: fullDate
            }
        }
        axios.post(`${base_url}/${companies}/1${createOffer}`, obj, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                console.log(res)
                alert('offer successfully create ')
            })
            .catch((err) => {
                console.log(err.response)
            })
        this.setState({
            description: '',
            code: ''
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                <View style={GenerateStyles.form}>
                    <View style={{ marginTop: 30 }} >
                        <View style={styles.passwordContainer}>
                            <FormInput
                                containerStyle={{ width: 250, marginLeft: 0 }}
                                placeholder='Code'
                                underlineColorAndroid='#44592F'
                                keyboardType="email-address"
                                onChangeText={txt => this.setState({ code: txt })}
                                dataDetectorTypes="address"
                                value={this.state.code}
                                inputStyle={{ fontFamily: 'times new roman', color: "#44592F" }}
                                placeholderTextColor="#44592F"
                            />
                        </View>
                        <View style={styles.passwordContainer}>
                            <FormInput
                                containerStyle={{ width: 250, marginLeft: 0 }}
                                placeholder='Description'
                                underlineColorAndroid='#44592F'
                                onChangeText={txt => this.setState({ description: txt })}
                                value={this.state.description}
                                inputStyle={{ fontFamily: 'times new roman', color: "#44592F" }}
                            />
                        </View>
                    </View>
                    <Button
                        title="Generate "
                        buttonStyle={GenerateStyles.Generatebutton}
                        onPress={() => this.submit()}
                        textStyle={{ fontFamily: 'times new roman', fontWeight: 'bold', fontSize: 18 }}
                    />
                </View>
            </KeyboardAwareScrollView>
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