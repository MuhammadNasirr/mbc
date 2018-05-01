import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    Modal,
    ToastAndroid,
    ImageBackground
} from 'react-native';
import {
    Button,
    Header,
    FormInput,
    FormLabel,
    Icon,
    Avatar,
    CheckBox,
    FormValidationMessage
} from "react-native-elements";
import { Picker } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import { signupStyles } from "./style";
import { PrivacyPolicy, BusinessSignUpMenu } from '../../components';
import { base_url, CustomerSignup } from '../../constants/constant';

const Item = Picker.Item;
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
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
            modalVisible: false,
            userType: 'individual',
            sectors: '',
            lineAddress: '',
            city: '',
            zipPostalCode: '',
            country: ''
        }
    }
    static navigationOptions = {
        headerTitle: ' SIGNUP ',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        }
    }
    SelectUserType(value) {
        this.setState({
            selected: value
        });
    }
    SelectCountry(value) {
        this.setState({
            country: value
        })
    }
    selectSectors(value) {
        console.log(value)
        this.setState({
            sectors: value
        })
    }
    toggleModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    componentDidMount() {
        let email = this.props.navigation.state.params.user.email;
        let firstName = this.props.navigation.state.params.user.givenName;
        let lastName = this.props.navigation.state.params.user.familyName;

        this.setState({
            email,
            firstName,
            lastName
        })
    }

    signup() {
        const { navigate } = this.props.navigation;
        const obj = {
            userType: "CUSTOMER",
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        const alllstate = {
            name: this.state.companyName,
            id: this.state.sectors,
            line: this.state.lineAddress,
            city: this.state.city,
            postcode: this.state.zipPostalCode,
            country: this.state.country,
            email: this.state.email,
            password: this.state.password,
        }
        if (this.state.selected === "") {
            alert("please select user type")
        }
        else if (this.state.selected === "individual" && this.state.firstName.length < 1) {
            alert("first name require")
        }
        else if (this.state.selected === "individual" && this.state.lastName.length < 1) {
            alert("last name require")
        }
        else if (this.state.email.length < 1) {
            alert(" email require")
        }
        else if (this.state.password.length < 1) {
            alert("password require")
        }
        else if (this.state.selected === "Business" && this.state.companyName.length < 1) {
            alert("companyName is require")
        }
        else if (this.state.selected === "Business" && this.state.companyAddress.length < 1) {
            alert("companyAddress is  require")
        }

        else if (this.state.selected === "individual") {
            this.state.checked ?
                axios.post(`${base_url}${CustomerSignup}`, { attributes: obj })
                    .then((res) => {
                        const { navigate } = this.props.navigation;
                        navigate('SelectPaymentScreen', { data: this.state.selected })
                    })
                    .catch((error) => {
                        ToastAndroid.show(error.response.data.errors[0].message, ToastAndroid.SHORT);
                    }) : ToastAndroid.show("You have to Agree the Privacy policy of MBC", ToastAndroid.SHORT);
        }

        else {
            navigate('linkscreen', { data: this.state.selected, alllstate })
        }
    }
    setCompanyName(text) {
        this.setState({
            companyName: text
        })
    }
    setCompanyAddress(text) {
        this.setState({
            companyAddress: text
        })
    }
    setCompanyAddressLine1(text) {
        this.setState({
            lineAddress: text
        })
    }
    WriteCity(text) {
        this.setState({
            city: text
        })
    }
    setZipPostalCode(value) {
        this.setState({
            zipPostalCode: value
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        console.log("user params", this.props.navigation.state.params && this.props.navigation.state.params.user)

        return (
            <ImageBackground source={require('../../../images/login.png')} style={style.loginimage} >

                <ScrollView >
                    <KeyboardAwareScrollView>
                        <Modal
                            visible={this.state.modalVisible}
                            animationType={'slide'}
                            onRequestClose={() => this.toggleModal()}
                        >
                            <View style={style.modalContainer}>
                                <View style={style.innerContainer}>
                                    <PrivacyPolicy closeModel={() => { this.toggleModal() }} />
                                </View>
                            </View>
                        </Modal>
                        <View style={{ alignItems: 'center' }}>
                            <View style={signupStyles.form}>
                                {this.state.selected === "Business" ?
                                    null
                                    :
                                    <Picker
                                        mode="dropdown"
                                        placeholder="User Type"
                                        value={this.state.selected}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.SelectUserType.bind(this)}
                                        style={{ color: '#fff', width: 200, marginLeft: 15, }}>
                                        <Item label="Select User Type" value="key0" />
                                        <Item label="Individual" value="individual" />
                                        <Item label="Business" value="Business" />
                                    </Picker>
                                }
                                <View>
                                    {this.state.selected === "Business" ?
                                        <BusinessSignUpMenu
                                            selectSectors={(text) => this.selectSectors(text)}
                                            companyName={this.state.companyName}
                                            companyAddress={this.state.companyAddress}
                                            lineAddress={this.state.lineAddress}
                                            setCompanyAddressLine1={(text) => this.setCompanyAddressLine1(text)}
                                            city={this.state.city}
                                            WriteCity={(text) => this.WriteCity(text)}
                                            zipPostalCode={this.state.zipPostalCode}
                                            setZipPostalCode={(text) => this.setZipPostalCode(text)}
                                            onCompanyNameChange={(text) => { this.setCompanyName(text) }}
                                            onCompanyAddressChange={(text) => { this.setCompanyAddress(text) }}
                                            selected={this.state.selected}
                                            country={this.state.country}
                                            sectors={this.state.sectors}
                                            SelectUserType={(text) => this.SelectUserType(text)}
                                            SelectCountry={(text) => { this.SelectCountry(text) }}
                                        /> :
                                        <View>
                                            <FormInput
                                                containerStyle={signupStyles.inputStyle}
                                                value={this.state.firstName}
                                                onChangeText={txt => this.setState({ firstName: txt })}
                                                underlineColorAndroid='transparent'
                                                placeholder="First name"
                                                placeholderTextColor="#D3D3D3"
                                                inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                                            />
                                            <FormInput
                                                containerStyle={signupStyles.inputStyle}
                                                value={this.state.lastName}
                                                onChangeText={txt => this.setState({ lastName: txt })}
                                                underlineColorAndroid='transparent'
                                                placeholder="Last name"
                                                placeholderTextColor="#D3D3D3"
                                                inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                                            />
                                        </View>
                                    }
                                    <View>
                                        <FormInput
                                            keyboardType="email-address"
                                            containerStyle={signupStyles.inputStyle}
                                            value={this.state.email}
                                            onChangeText={txt => this.setState({ email: txt })}
                                            underlineColorAndroid='transparent'
                                            placeholder="Email address"
                                            placeholderTextColor="#D3D3D3"
                                            inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                                        />
                                        <FormInput
                                            secureTextEntry={true}
                                            value={this.state.password}
                                            underlineColorAndroid='transparent'
                                            placeholder="Password"
                                            onChangeText={txt => this.setState({ password: txt })}
                                            containerStyle={signupStyles.inputStyle}
                                            placeholderTextColor="#D3D3D3"
                                            inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)', }}
                                        />
                                    </View>
                                </View>
                                <Button
                                    title="Next"
                                    buttonStyle={signupStyles.SignupButton}
                                    onPress={() => this.signup()}
                                    textStyle={{ fontSize: 20, fontFamily: 'Gotham Rounded' }}
                                />
                                <View style={signupStyles.registerSuggestionText}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <CheckBox
                                            onPress={() => { this.setState({ checked: !this.state.checked }) }}
                                            checked={this.state.checked}
                                            containerStyle={{
                                                backgroundColor: 'transparent',
                                                borderColor: 'transparent',
                                                width: 45,
                                                marginLeft: -10

                                            }}
                                            checkedColor="rgb(0,150,136)"
                                        />
                                        <TouchableOpacity onPress={() => this.toggleModal()}>
                                            <Text style={signupStyles.privacy}>I AGREE TO T&C AND PRIVACY POLICY</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => navigate("LoginScreen")}>
                                        <Text style={{ color: '#fff', fontFamily: 'Gotham Rounded', fontWeight: "bold" }}>ALREADY REGISTERED? <Text style={{ color: 'rgb(0,150,136)' }}>LOGIN</Text></Text>
                                    </TouchableOpacity>
                                </View>
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
    },
    loginimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    }
})
