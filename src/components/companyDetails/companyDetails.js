import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, Linking, ImageBackground } from 'react-native';
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
import Gift from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: [],
            modalVisible: false,
            feedBacks: [],
            postfeedback: '',
            starCount: null
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
                rating: this.state.starCount,
                feedback: this.state.postfeedback
            }
        }
        axios.post(`${base_url}/${companies}/${1}${feedBacks}`, obj, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
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
    closeModal() {
        this.setState({ modalVisible: false });
    }
    openModal() {
        axios.get(`${base_url}/${companies}/${1}${feedBacks}`, { 'headers': { 'Authorization': this.props.token } })
            .then((res) => {
                this.setState({
                    feedBacks: res.data.data,
                    modalVisible: true
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const address = this.props.navigation.state.params.data.relationships.address.attributes
        const sector = this.props.navigation.state.params.data.relationships.sector.attributes.name
        const socialMedia = this.props.navigation.state.params.data.relationships.socialMediaLink.attributes
        return (
            <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >
                <ScrollView>
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
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
                    <KeyboardAwareScrollView>
                        <View style={styles.view1}>
                            <Image source={require('../../../images/icon3.png')} style={styles.logo} />
                        </View>
                        <View style={styles.view2}>
                            <Text style={styles.businessname}>{this.props.navigation.state.params.data.attributes.name}</Text>
                            <Text style={styles.businesstype}>{this.props.navigation.state.params.data.subtitle}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                                size={25}
                                style={{ width: 50, height: '77%', padding: '3.5%', backgroundColor: '#3B92BD', borderRadius: 100, marginLeft: 5 }}
                                onPress={() => Linking.openURL(`${socialMedia && socialMedia.website}`)}
                            />

                        </View>
                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <Text style={styles.businessrating}>Rating This Business</Text>
                        </View>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            emptyStarColor='#fff'
                            fullStarColor="rgb(0,150,136)"
                            containerStyle={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        <View style={{ alignItems: 'center', marginTop: 25 }}>
                            <TouchableOpacity onPress={() => this.openModal()} >
                                <Text style={styles.businessrating}>FeedBack</Text>
                            </TouchableOpacity>
                            <FormInput
                                value={this.state.postfeedback}
                                containerStyle={{
                                    width: 250,
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    marginBottom: 0,
                                    borderColor: '#d6d7da',
                                    backgroundColor: '#fff'
                                }}
                                placeholder='Write your feedback'
                                underlineColorAndroid='transparent'
                                inputStyle={{ marginLeft: '3%', fontFamily: 'Gotham Rounded', color: "rgb(0,150,136)" }}
                                onChangeText={(text) => this.setState({ postfeedback: text })}
                                placeholderTextColor="#D3D3D3"
                            />
                            <Button
                                title="Submit"
                                containerViewStyle={{marginBottom:'5%'}}
                                buttonStyle={styles.submitButton}
                                onPress={() => this.submit()}
                                textStyle={{ fontFamily: 'arial', fontSize: 18 }}
                            />

                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginimage: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'stretch',
    },
    view2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    businessname: {
        fontSize: 18,
        color: '#fff'
    },
    businesstype: {
        color: '#fff',
        opacity: 0.5

    },

    businessrating: {
        color: '#fff',
        fontFamily: 'Gotham Rounded',
        fontSize: 20,
        marginBottom: '5%'
    },
    submitButton: {
        backgroundColor: 'rgb(0,150,136)',
        marginTop: 15,
        borderRadius: 5,
        justifyContent:'center',
        width: 250,
    },
    logo: {
        width: 100,
        height: 100,
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '3%',
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