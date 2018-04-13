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
    ListItem,
    Rating,
    SocialIcon
} from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: [],
            role: ''
        }
    }
    componentDidMount() {
        const profileInfo = this.props.navigation.state.params.profileData.attributes;
        const role = profileInfo.role
        this.setState({
            role
        })

    }
    static navigationOptions = {
        headerTitle: ' Profile ',
        headerTitleStyle: {
            color: '#ffff',
            marginLeft: -5,
            fontSize: 18
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        },
    }
    submit() {

    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    render() {
        const { navigate } = this.props.navigation;
        const profileInfo = this.props.navigation.state.params.profileData.attributes
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>
                    <View style={styles.view1}>
                        <Image source={require('../../../images/icon3.png')} style={styles.logo} />
                    </View>
                    <View style={styles.view1}>
                        <View style={styles.view2}>
                            <Text style={styles.businessname}>{profileInfo.firstName + profileInfo.lastName}</Text>
                            {this.state.role && this.state.role === "CUSTOMER" ? null : <Text style={styles.businesstype}>Vortechs Innovations</Text>}

                            <Text style={styles.businesstype}>{profileInfo && profileInfo.email}</Text>
                        </View>
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
        marginBottom: 20
    },
    view2: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    businessname: {
        fontSize: 18,
        color: "#44592F",
        alignItems: 'center'
    },
    businesstype: {
        color: "#44592F",
        opacity: 0.5,
        justifyContent: 'center'
    },
    businessrating: {
        color: "#44592F",
        fontSize: 20
    },
    logo: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    }
})

export default Profile