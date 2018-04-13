import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal } from 'react-native';
import {
    Button,
    Header,
    FormInput,
    FormLabel,
    Icon,
    Avatar,
    CheckBox
} from "react-native-elements";
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import { Picker } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style'
import { signupStyles } from "./style";
import DeviceInfo from 'react-native-device-info';
import PrivacyPolicy from '../PrivacyContent/PrivacyContent'
const Item = Picker.Item;


const NORTH_AMERICA = [
    'CA', 'US', 'AG', 'AI', 'AS', 'BB', 'BM', 'BS', 'DM', 'DO', 'GD', 'GU', 'JM', 'KN', 'KY', 'LC', 'MP', 'MS', 'PR', 'SX', 'TC', 'TT', 'VC', 'VG', 'VI'
    // 'AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB',
    //  'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BR', 'IO', 'VG', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'AL', 'DZ', 'AS', 'AD', 'AL', 'DZ', 'AS', 'AD', 'AL', 'DZ', 'AS',
];
// const NORTH_AMERICA = ['CA', 'MX', 'US'];

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        let callingCode = null;
        let cca2 = 'US';
    
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            companyName: '',
            companyAddress: '',
            contact: 0,
            checked: false,
            selected: '',
            sector: 'sector',
            modalVisible: false,
            userType: 'individual',
            cca2,
            callingCode,
            country: ''
        }
    }

    static navigationOptions = {
        headerTitle: ' SIGNU ',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        }
    }
    onValueChange3(value) {
        this.setState({
            sector: value
        });
    }
    onValueChange4(value) {
        this.setState({
            country: value
        });
    }
    onValueChange2(value) {
        this.setState({
            selected: value
        });
    }
    openModal() {
        this.setState({ modalVisible: true });
    }
    closeModal() {
        this.setState({ modalVisible: false });
    }
    changeUSerType(type) {
        this.setState({
            userType: type
        })
    }
    menu() {
        return (
            <View>
                <FormInput
                    onChangeText={txt => this.setState({ companyName: txt })}
                    value={this.state.companyName}
                    underlineColorAndroid='rgb(0,150,136)'
                    placeholder="Company name"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ color: '#44592F',fontFamily:'Gotham Rounded' }}
                />
                <FormInput
                    onChangeText={txt => this.setState({ companyAddress: txt })}
                    value={this.state.companyAddress}
                    underlineColorAndroid='rgb(0,150,136)'
                    placeholder="Email Address"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded' }}
                />
                <FormInput
                    secureTextEntry={true}
                    value={this.state.password}
                    underlineColorAndroid='rgb(0,150,136)'
                    placeholder="Password"
                    onChangeText={txt => this.setState({ password: txt })}
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded' }}
                />
                <FormInput
                    onChangeText={txt => this.setState({ companyAddress: txt })}
                    value={this.state.companyAddress}
                    underlineColorAndroid='rgb(0,150,136)'
                    placeholder="Company address line 1"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded' }}
                />
                <FormInput
                    onChangeText={txt => this.setState({ companyAddress: txt })}
                    value={this.state.companyAddress}
                    underlineColorAndroid='rgb(0,150,136)'
                    placeholder="Company address line 2"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded' }}
                />
                <FormInput
                    onChangeText={txt => this.setState({ companyAddress: txt })}
                    value={this.state.companyAddress}
                    underlineColorAndroid='rgb(0,150,136)'
                    placeholder="Zip/Postal Code"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded' }}
                />
                <Picker
                    mode="dropdown"
                    placeholder="Select Country"
                    value={this.state.country}
                    selectedValue={this.state.country}
                    onValueChange={this.onValueChange4.bind(this)}
                    style={{ color: 'rgb(0,150,136)', width: 250, marginLeft: 15 }}>
                    <Item label="Select Country" value="key0" color='green' />
                    <Item label="United State" value="United State" />
                    <Item label="Australia" value="Australia" />
                    <Item label="England" value="England" />
                    <Item label="Afghanistan" value="Afghanistan" />
                    <Item label="Bahrain" value="Bahrain" />
                    <Item label="Canada" value="Canada" />
                    <Item label="Egypt" value="Egypt" />
                    <Item label="Georgia" value="Georgia" />
                </Picker>
                <Picker
                    mode="dropdown"
                    placeholder="Select Sectors"
                    value={this.state.sector}
                    selectedValue={this.state.sector}
                    onValueChange={this.onValueChange3.bind(this)}
                    style={{ color: 'rgb(0,150,136)', width: 250, marginLeft: 15 }}>
                    <Item label="Select Sectors" value="key0" color='green' />
                    <Item label="Automotive" value="Automotive" />
                    <Item label="Textile" value="Textile" />
                    <Item label="Resturants" value="Resturants" />
                    <Item label="Information Technology" value="Information Technology" />
                </Picker>
            </View>
        )
    }
    signup() {

        const { navigate } = this.props.navigation
        if (this.state.selected === "") {
            alert("please select user type")
        }
        else if (this.state.selected === "Business") {
            navigate('linkscreen', { data: this.state.selected })

        }
        else {

            navigate('SelectPaymentScreen', { data: this.state.selected })
            // navigate('linkscreen', { data: this.state.selected })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                    >
                        <View style={style.modalContainer}>
                            <View style={style.innerContainer}>
                                <PrivacyPolicy closeModel={() => { this.closeModal() }} />
                            </View>
                        </View>
                    </Modal>
                    <View style={{ alignItems: 'center' }}>
                        <View style={signupStyles.form}>
                            <View>
                                {this.state.selected === "Business" ? this.menu() :
                                    <View>
                                        <FormInput
                                            containerStyle={signupStyles.inputStyle}
                                            value={this.state.firstName}
                                            onChangeText={txt => this.setState({ firstName: txt })}
                                            underlineColorAndroid='rgb(0,150,136)'
                                            placeholder="First name"
                                            inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded', }}
                                        />
                                        <FormInput
                                            containerStyle={signupStyles.inputStyle}
                                            value={this.state.lastName}
                                            onChangeText={txt => this.setState({ lastName: txt })}
                                            underlineColorAndroid='rgb(0,150,136)'
                                            placeholder="Last name"
                                            inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded',}}
                                        />
                                        <FormInput
                                            keyboardType="email-address"
                                            containerStyle={signupStyles.inputStyle}
                                            value={this.state.email}
                                            onChangeText={txt => this.setState({ email: txt })}
                                            underlineColorAndroid='rgb(0,150,136)'
                                            placeholder="Email address"
                                            inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded', }}
                                        />
                                        <FormInput
                                            secureTextEntry={true}
                                            value={this.state.password}
                                            underlineColorAndroid='rgb(0,150,136)'
                                            placeholder="Password"
                                            onChangeText={txt => this.setState({ password: txt })}
                                            containerStyle={signupStyles.inputStyle}
                                            inputStyle={{ color: 'rgb(0,150,136)',fontFamily:'Gotham Rounded', }}
                                        />
                                    </View>
                                }
                                {/* {this.state.selected === "Business" ?
                                    null
                                    : */}
                                <Picker
                                    mode="dropdown"
                                    placeholder="User Type"
                                    value={this.state.selected}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange2.bind(this)}
                                    style={{ color: 'rgb(0,150,136)', width: 250, marginLeft: 15 }}>
                                    <Item label="Select User Type" value="key0" />
                                    <Item label="Individual" value="individual" />
                                    <Item label="Business" value="Business" />
                                </Picker>
                                {/* } */}
                            </View>
                            <Button
                                title="Next"
                                buttonStyle={signupStyles.SignupButton}
                                onPress={() => this.signup()}
                                textStyle={{ fontSize: 20, fontFamily:'Gotham Rounded' }}
                            />
                            <View style={signupStyles.registerSuggestionText}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        onPress={() => { this.setState({ checked: !this.state.checked }) }}
                                        checked={this.state.checked}
                                        containerStyle={{
                                            backgroundColor: 'white',
                                            borderColor: 'white',
                                            width: 50,
                                            marginLeft: -20

                                        }}
                                        checkedColor="rgb(0,150,136)"
                                    />
                                    <TouchableOpacity onPress={() => this.openModal()}>
                                        <Text style={signupStyles.privacy}> I AGREE TO T&C AND PRIVACY POLICY</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => navigate("LoginMenu")}>
                                    <Text style={{ fontWeight: "bold" }}>ALREADY REGISTERED? LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    bgImage: {
        width: 220,
        height: 170,
    },
    modalContainer: {
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        alignItems: 'center',
    },
    logo: {
        marginTop: 20,
        width: 180,
        height: 60,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
