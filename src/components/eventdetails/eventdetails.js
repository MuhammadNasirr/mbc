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
import Calender from 'react-native-vector-icons/EvilIcons'
import Gift from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class eventdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: []
        }
    }
    static navigationOptions = {
        headerTitle: ' Event Details ',
        headerTitleStyle: {
            color: '#ffff',
            marginLeft: -5,
            fontSize: 18
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#44592F'
        },
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>
                    <View style={styles.view1}>
                        <Image source={require('../../../images/icon3.png')} style={styles.logo} />
                    </View>
                    <View style={styles.view1}>
                        <View style={styles.view2}>
                            <Text style={styles.businessname}>{this.props.navigation.state.params.data.name}</Text>
                            <Text style={styles.businesstype}>{this.props.navigation.state.params.data.Network}</Text>
                            <Text style={styles.businesstype}><Calender name="calendar" size={30} />{this.props.navigation.state.params.data.subtitle}</Text>
                            <Text style={styles.businesstype}><Calender name="location" size={30} />{this.props.navigation.state.params.data.location}</Text>
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
        fontSize: 16,
        color: "#44592F",
        textAlign: "center"
    },
    businesstype: {
        color: "#44592F",
        paddingTop: 5,
        opacity: 0.5,
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

export default eventdetails