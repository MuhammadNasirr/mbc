import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, AsyncStorage } from 'react-native';
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
    ListItem,

} from "react-native-elements";
import { SearchBar as _SearchBar } from 'react-native-elements'
// import styles from './style'

// import { Picker } from 'native-base'
// import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { base_url, companies } from '../../constants/constant'
import { connect } from 'react-redux';
// const Item = Picker.Item;
class Find extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: [],
            token: '',
            companies: [],
            email: '',
            filter: false,
            filterText: '',
            loading: false
        }
        // this.handleSearch = this.handleSearch.bind(this)
    }
    componentDidMount() {
        let token = this.props.navigation.state.params.token

        // axios.get('http://159.65.25.141:4001/v1/companies?filter=sector&id=1', { 'headers': { 'Authorization': token } })
        //     .then((res) => {
        //         console.log('business', res.data.data)
        //         this.setState({
        //             companies: res.data.data
        //         })
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }
    handleSearch(text) {
        console.log(text)

        this.setState({ email: txt })

    }
    static navigationOptions = {
        header: null,
        // headerTitle: ' FIND ',
        // headerTitleStyle: {
        //     color: '#ffff',
        //     textAlign: 'center',
        // },
        // headerTintColor: 'white',
        // headerStyle: {
        //     backgroundColor: 'rgb(0,150,136)'
        // },
        // headerRight: (
        //     <View style={{ flexDirection: 'row' }}>
        //         <SearchBar
        //             containerStyle={{ backgroundColor: 'rgb(0,150,136)', width: 120 }}
        //             inputStyle={{ backgroundColor: '#fff' }}
        //             loadingIcon={{ color: '#2BB673' }}
        //             round
        //             placeholder='Search..' />
        //     </View>
        // )
    }
    companyDetails(id) {
        const { navigate } = this.props.navigation;
        axios.get(`${base_url}/${companies}/${id}`, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                console.log("constructor", res.data.data)
                navigate('CompanyDetailsScreen', { data: res.data.data })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    search(query) {
        // console.log(text)
        let findquery = query.toLowerCase()
        var filterdata = this.props.navigation.state.params.data;
        // this.setState({ filterText: text })
        var filterdata = filterdata.filter((data) => data.attributes.name && data.attributes.name.toLowerCase().indexOf(findquery) !== -1

        )
        this.setState({
            filter: true,
            companies: filterdata,
            loading: true
        })

    }
    render() {
        console.log(this.state.email)
        const { navigate } = this.props.navigation;
        console.log("oooo", this.props.navigation.state.params.data)
        const data = this.state.filter ? this.state.companies : this.props.navigation.state.params.data
        return (
            <View>
                <Header
                    leftComponent={<Text style={{ marginLeft: 10, color: '#fff' }} ></Text>}
                    rightComponent={
                        <View style={{ flexDirection: 'row' }}>
                           <SearchBar
                                containerStyle={{ backgroundColor: 'rgb(0,150,136)', width: 120, borderBottomColor: "rgb(0,150,136)" }}
                                inputStyle={{ backgroundColor: '#fff' }}
                                loadingIcon={{ color: '#2BB673' }}
                                round
                                // value={this.state.filterText}
                                // showLoadingIcon={this.state.loading}
                                onChangeText={(e) => this.search(e)}
                                // onClearText={this.setState({loading:false})}
                                placeholder='Search..' />
                        </View>
                    }
                    backgroundColor='rgb(0,150,136)'
                />
                <ScrollView style={{ backgroundColor: 'white' }}>

                    <KeyboardAwareScrollView>
                        <List containerStyle={{ marginTop: 0 }}>
                            {
                                 data && data.map((l, i) => {
                                    console.log(l.attributes.name)
                                    return (<TouchableOpacity
                                        onPress={() => this.companyDetails(l.id)}
                                        key={i}
                                    >
                                        <ListItem
                                            roundAvatar
                                            containerStyle={{ height: 100, marginBottom: 20, borderBottomColor: 'rgb(0,150,136)' }}
                                            avatar={require('../../../images/icon3.png')}
                                            avatarContainerStyle={{ width: 80, height: 80 }}
                                            avatarStyle={{ width: 80, height: 80 }}
                                            key={i}
                                            title={l.attributes.name}
                                            titleStyle={{ color: 'rgb(0,150,136)' }}
                                            subtitleStyle={{ color: 'rgb(0,150,136)' }}
                                            subtitle={l.relationships.address.attributes.fullAddress}
                                            chevronColor="rgb(0,150,136)"
                                        />
                                    </TouchableOpacity>)

                                }
                                )

                            }
                        </List>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
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