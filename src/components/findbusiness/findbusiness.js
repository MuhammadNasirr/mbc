import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, AsyncStorage, ImageBackground } from 'react-native';
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
    }
    componentDidMount() {
        let token = this.props.navigation.state.params.token
    }
    handleSearch(text) {
        this.setState({ email: txt })
    }
    static navigationOptions = {
        header: null,
    }
    companyDetails(id) {
        const { navigate } = this.props.navigation;
        axios.get(`${base_url}/${companies}/${id}`, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                navigate('CompanyDetailsScreen', { data: res.data.data })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    search(query) {
        let findquery = query.toLowerCase()
        var filterdata = this.props.navigation.state.params.data;
        var filterdata = filterdata.filter((data) => data.attributes.name && data.attributes.name.toLowerCase().indexOf(findquery) !== -1

        )
        this.setState({
            filter: true,
            companies: filterdata,
            loading: true
        })

    }
    render() {
        const { navigate } = this.props.navigation;
        const data = this.state.filter ? this.state.companies : this.props.navigation.state.params.data
        return (
            <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >
                <Header
                    outerContainerStyles={{ marginTop: '-3%',paddingBottom:'4%' }}
                    leftComponent={<Icon name='arrow-back' onPress={() => { this.props.navigation.goBack() }} color='#fff' style={{ marginLeft: 10, color: '#fff' }} />}
                    centerComponent={{ text: 'Find', style: { fontSize: 20, marginLeft: '-30%', fontWeight: 'bold', color: '#fff' } }}
                    rightComponent={
                        <SearchBar
                            containerStyle={{ marginBottom: '-14%', marginLeft: '-5%', backgroundColor: 'rgb(0,150,136)', width: 120, borderBottomColor: 'transparent', borderBottomWidth: 0, borderTopColor: 'rgb(0,150,136)' }}
                            inputStyle={{ color: 'rgb(0,150,136)', backgroundColor: '#fff' }}
                            loadingIcon={{ color: '#2BB673' }}
                            // value={this.state.filterText}
                            // showLoadingIcon={this.state.loading}
                            onChangeText={(e) => this.search(e)}
                            // onClearText={this.setState({loading:false})}
                            placeholder='Search..' />
                    }
                    backgroundColor='rgb(0,150,136)'
                />

                <ScrollView>
                    <KeyboardAwareScrollView>
                        <List containerStyle={{ backgroundColor: 'transparent', marginTop: 0 }}>
                            {
                                data && data.map((l, i) => {
                                    return (<TouchableOpacity
                                        onPress={() => this.companyDetails(l.id)}
                                        key={i}
                                    >
                                        <ListItem
                                            roundAvatar
                                            containerStyle={{ height: 100, borderBottomColor: '#fff' }}
                                            avatar={require('../../../images/icon3.png')}
                                            avatarContainerStyle={{ width: 80, height: 80 }}
                                            avatarStyle={{ width: 80, height: 80 }}
                                            key={i}
                                            title={l.attributes.name}
                                            titleStyle={{ color: '#fff' }}
                                            subtitleStyle={{ color: '#fff' }}
                                            subtitle={l.relationships.address.attributes.fullAddress}
                                            chevronColor="#fff"
                                        />
                                    </TouchableOpacity>)
                                }
                                )
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
