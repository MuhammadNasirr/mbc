import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal } from 'react-native';
import {
    Button,
    Header,
    FormInput,
    FormLabel,
    // Icon,
    Avatar,
    CheckBox
} from "react-native-elements";
import { Icon } from 'native-base';
import { Picker } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import styles from './style'
import { signupStyles } from "./style";
// import PrivacyPolicy from '../PrivacyContent/PrivacyContent';
import { base_url, sectorsList } from '../../constants/constant'
// import { BusinessCategory } from '..';
const Item = Picker.Item;

export default class BusinessSignUpMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectors: [],
        }
        axios.get(`${base_url}${sectorsList}`)
            .then((res) => {
                this.setState({
                    sectors: res.data.data
                })
            })
            .catch((error) => {
                console.log(error.response)
            })
    }
    render() {
        const props = this.props
        return (
            <View style={{ alignItems: 'center' }}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    selectedValue={props.selected}
                    onValueChange={(text) => props.SelectUserType(text)}
                    style={{ color: '#fff', width: 200, marginLeft: 15 }}>
                    <Item label="Select User Type" value="key0" color='rgb(0,150,136)' />
                    <Item label="Individual" value="individual" />
                    <Item label="Business" value="Business" />
                </Picker>

                <FormInput
                    onChangeText={(text) => props.onCompanyNameChange(text)}
                    value={props.companyName}
                    underlineColorAndroid='transparent'
                    placeholder="Company name"
                    containerStyle={signupStyles.inputStyle}
                    placeholderTextColor="#D3D3D3"
                    inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                />
                <FormInput
                    onChangeText={(text) => props.onCompanyAddressChange(text)}
                    value={props.companyAddress}
                    underlineColorAndroid='transparent'
                    placeholder="Company Address"
                    containerStyle={signupStyles.inputStyle}
                    placeholderTextColor="#D3D3D3"
                    inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                />
                <FormInput
                    onChangeText={(text) => props.setCompanyAddressLine1(text)}
                    value={props.lineAddress}
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#D3D3D3"
                    placeholder="line Address"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                />
                <FormInput
                    onChangeText={(text) => props.WriteCity(text)}
                    value={props.city}
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#D3D3D3"
                    placeholder="city"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                />
                <FormInput
                    onChangeText={txt => props.setZipPostalCode(txt)}
                    value={props.zipPostalCode}
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#D3D3D3"
                    placeholder="Zip/Postal Code"
                    containerStyle={signupStyles.inputStyle}
                    inputStyle={{ marginLeft: '3%', color: 'rgb(0,150,136)' }}
                />
                <Picker
                    mode="dropdown"
                    placeholder="Select Country"
                    value={this.props.country}
                    selectedValue={this.props.country}
                    onValueChange={(text) => this.props.SelectCountry(text)}
                    style={{ color: '#fff', width: 200, marginLeft: 15 }}>
                    <Item label="Select Country" value="key0" color='rgb(0,150,136)' />
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
                    placeholder="Select Business Sectors"
                    value={this.props.sectors}
                    selectedValue={this.props.sectors}
                    onValueChange={(text) => this.props.selectSectors(text)}
                    style={{ color: '#fff', width: 200, marginLeft: 15 }}>
                    {this.state.sectors && this.state.sectors.map((d, i) => {
                        return (
                            <Item key={i} label={d.attributes.name} value={d.id} color='rgb(0,150,136)' />
                        )
                    })}
                </Picker>

            </View>
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
