import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal,Linking } from 'react-native';
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
    Rating,
    SocialIcon
} from "react-native-elements";
import { connect } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import style from './style';
import ProfileModal from '../ProfileModal/profileModal';
import { base_url, companies, feedBacks } from '../../constants/constant'
import  Gift  from 'react-native-vector-icons/MaterialCommunityIcons';

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: [],
            modalVisible: false,
            feedBacks: [],
            postfeedback: ''
        }
    }
    static navigationOptions = {
        // header:null,
        headerTitle: ' Company Details ',
        headerTitleStyle: {
            color: '#ffff',
            // textAlign: 'center',
            marginLeft: -5,
            fontSize: 18
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)',
        },

    }
    submit() {
        const obj = {
            attributes: {
                rating: 4,
                feedback: this.state.postfeedback
            }
        }

        axios.post(`${base_url}/${companies}/${1}${feedBacks}`, obj, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                console.log("feedback", res)
                alert('thank you for your feedback')
            })
            .catch((err) => {
                alert(err.response.data.errors[0].message)
                // alert(err.response)
            })

        // navigate('FindBusineesScreen')
        this.setState({
            postfeedback: ''
        })

    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    closeModal() {
        this.setState({ modalVisible: false });
    }
    openModal() {
        axios.get(`${base_url}/${companies}/${1}${feedBacks}`, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                console.log("feedback", res)
                this.setState({
                    feedBacks: res.data.data,
                    modalVisible: true
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    render() {

        const { navigate } = this.props.navigation;
        const address = this.props.navigation.state.params.data.relationships.address.attributes
        const sector = this.props.navigation.state.params.data.relationships.sector.attributes.name
        const socialMedia = this.props.navigation.state.params.data.relationships.socialMediaLink.attributes
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.ToggleModal()}

                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <ProfileModal
                                closeModel={() => { this.closeModal() }}
                                feedBacks={this.state.feedBacks}
                            />
                        </View>
                    </View>
                </Modal>
                        <Image source={require('../../../images/icon3.png')} style={styles.logo} />
                <KeyboardAwareScrollView>
                    <View style={styles.view1}>
                        <View style={styles.view2}>
                            <Text style={styles.businessname}>{this.props.navigation.state.params.data.attributes.name} ({sector})</Text>
                            <Text style={styles.businesstype}>{address && address.country}</Text>
                            <Text style={styles.businesstype}>{address && address.city}</Text>
                            <Text style={styles.businesstype}>line :{address && address.line}</Text>
                            <Text style={styles.businesstype}>postalCode :{address && address.postalCode}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center' }}>
                    <SocialIcon
                            type='facebook'
                            onPress={() => Linking.openURL(`${socialMedia && socialMedia.facebook}`)}
                        />
                        <SocialIcon
                            type='twitter'
                            onPress={() => Linking.openURL(`${socialMedia && socialMedia.twitter}`)}
                        />
                        <SocialIcon
                            type='linkedin'
                            onPress={() => Linking.openURL(`${socialMedia && socialMedia.linkedin}`)}
                        />
                        <Gift
                            name='web'
                            color='#fff'
                            size={48}
                            style={{backgroundColor:'#000', borderRadius:100, marginLeft:5 }}
                            onPress={() => Linking.openURL(`${socialMedia && socialMedia.website}`)}
                        />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                        <Text style={styles.businessrating}>Rating This Business</Text>
                    </View>
                    <Rating
                        type='custom'
                        showRating
                        // rating={this.state.rating}
                        fractions={1}
                        // ratingCount={3}
                        ratingColor='rgb(0,150,136)'
                        onFinishRating={() => this.ratingCompleted()}
                        imageSize={30}
                        style={{ alignItems: 'center' }}
                    />
                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                        <TouchableOpacity onPress={() => this.openModal()} >
                            <Text style={styles.businessrating}>FeedBack</Text>
                        </TouchableOpacity>
                        <FormInput
                            value={this.state.postfeedback}
                            containerStyle={{ width: 250 }}
                            placeholder='Write your feedback'
                            underlineColorAndroid='rgb(0,150,136)'
                            inputStyle={{ color: 'rgb(0,150,136)' }}
                            onChangeText={(text) => this.setState({ postfeedback: text })}
                            placeholderTextColor="#D3D3D3"
                        />
                        <Button
                            title="Submit"
                            buttonStyle={styles.submitButton}
                            onPress={() => this.submit()}
                            textStyle={{ fontFamily: 'arial', fontSize: 18 }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    view2: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    businessname: {
        fontSize: 18,
        color: "rgb(0,150,136)"
    },
    businesstype: {
        color: "rgb(0,150,136)",
        opacity: 0.5

    },

    businessrating: {
        color: "rgb(0,150,136)",
        fontSize: 20
    },
    submitButton: {
        backgroundColor: 'rgb(0,150,136)',
        marginTop: 15,
        width: 250,
    },
    logo: {
        width: 100,
        height: 100,
        alignItems: 'center',
        marginTop: 25,
       
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    modalContainer: {
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        alignItems: 'center',
    },


})
const mapStateToProps = (state) => {
    return {
        token: state.AuthReducers.token,
    }
}
export default connect(mapStateToProps, null)(CompanyDetails)
//  CompanyDetails