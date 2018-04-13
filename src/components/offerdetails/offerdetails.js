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
import Gift from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class offerdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: []
        }
    }
    static navigationOptions = {
        headerTitle: ' Offer Details ',
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
    submit() {

    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    render() {

        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>
                    <View style={styles.view1}>
                    {/* <Gift name="gift"size={30}color="#44592F" /> */}
                    <Gift name="gift" size={160} color="#44592F" style={styles.logo} />
                    </View>
                    <View style={styles.view1}>
                        <View style={styles.view2}>
                            <Text style={styles.businessname}>{this.props.navigation.state.params.data.name}</Text>
                            <Text style={styles.businesstype}>{this.props.navigation.state.params.data.subtitle}</Text>
                            {/* <Text style={styles.businesstype}>m.nasir_14@hotmail.com</Text> */}
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
        marginBottom:20
    },
    view2: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    businessname: {
        fontSize: 14,
        color: "#44592F",
        // alignItems: 'center'
        textAlign:"center"
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    }
})

export default offerdetails