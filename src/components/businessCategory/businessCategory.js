import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal } from 'react-native';
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
// import styles from './style'

// import { Picker } from 'native-base'
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
    submit() {

    }
    companiesForSector(id) {
        const { navigate } = this.props.navigation
        console.log(this.props.navigation.state.params.token, id)
        axios.get(`${base_url}/${companies}?filter=sector&id=${id}`, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                console.log("success", res.data.data)
                navigate('FindBusineesScreen', { data: res.data.data })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    render() {
        const { navigate } = this.props.navigation;
        const token = this.props.navigation.state.params.token
        console.log(this.props.token)
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>
                    <List containerStyle={{ marginBottom: 20, marginTop: 0 }}>
                        {
                            this.state.data.map((l, i) => {
                                console.log(l.id)
                                return (
                                    <TouchableOpacity onPress={() => this.companiesForSector(l.id)}>
                                        <ListItem
                                            containerStyle={{ height: 50, borderBottomColor: 'rgb(0,150,136)' }}
                                            key={i}
                                            title={l.attributes.name}
                                            titleStyle={{ color: 'rgb(0,150,136)' }}
                                            chevronColor="rgb(0,150,136)"
                                        />
                                    </TouchableOpacity>

                                )
                            })
                        }
                    </List>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({

})
const mapStateToProps = (state) => {
    return {
        token: state.AuthReducers.token,
    }
}

export default connect(mapStateToProps, null)(Find)