import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, ImageBackground } from 'react-native';
import {
    Button,
    Header,
    FormInput,
    FormLabel,
    Icon,
    Avatar,
    CheckBox,
    SearchBar,
    List,
    ListItem
} from "react-native-elements";
import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { base_url, companies } from '../../constants/constant'
// const Item = Picker.Item;
class Find extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: [],
            data: []
        }
    }
    componentWillMount() {
        const data = this.props.navigation.state.params.data
        this.setState({
            data: data
        })
    }
    static navigationOptions = {
        // header:null,
        headerTitle: ' Business Categories ',
        headerTitleStyle: {
            color: '#fff',
            fontSize: 18,
            // marginLeft: 'auto',
            // marginRight: 'auto'
        },
        containerStyle: {
            // alignItems: 'center'
        },

        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        },

    }
    companiesForSector(id) {
        const { navigate } = this.props.navigation
        axios.get(`${base_url}/${companies}?filter=sector&id=${id}`, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                navigate('FindBusineesScreen', { data: res.data.data })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    render() {
        const { navigate } = this.props.navigation;
        const token = this.props.navigation.state.params.token
        return (
            <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <List containerStyle={{ backgroundColor: 'transparent', marginBottom: 20, marginTop: 0 }}>
                            {
                                this.state.data.map((l, i) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.companiesForSector(l.id)} key={i}>
                                            <ListItem
                                                containerStyle={{ height: 50, borderBottomColor: '#fff' }}
                                                key={i}
                                                title={l.attributes.name}
                                                titleStyle={{ color: '#fff' }}
                                                chevronColor="#fff"
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </List>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    loginimage: {
        flex: 1,
        justifyContent: 'center',
        width: null,
        height: null,
        resizeMode: 'stretch',
    },
})
const mapStateToProps = (state) => {
    return {
        token: state.AuthReducers.token,
    }
}

export default connect(mapStateToProps, null)(Find)