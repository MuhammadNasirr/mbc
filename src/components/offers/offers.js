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
import Gift from 'react-native-vector-icons/FontAwesome'
// import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Find extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: []
        }
    }
    static navigationOptions = {
        headerTitle: ' Offers ',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        },
    }
    render() {
        const list = this.props.navigation.state.params.data
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>
                    <List containerStyle={{ marginBottom: 20, marginTop: 0 }}>
                        {
                            list && list.map((l, i) => {
                                return (
                                    <TouchableOpacity key={i} >
                                        <ListItem
                                            roundAvatar
                                            containerStyle={{ height: 100, borderBottomColor: 'rgb(0,150,136)' }}
                                            leftIcon={<Gift name="gift" size={30} color="rgb(0,150,136)" />}
                                            key={i}
                                            titleNumberOfLines={2}
                                            title={l.attributes.code}
                                            titleStyle={{ color: 'rgb(0,150,136)', marginLeft: 20 }}
                                            subtitle={l.attributes.description}
                                            subtitleNumberOfLines={3}
                                            subtitleStyle={{ color: 'rgb(0,150,136)' }}
                                            hideChevron={true}
                                            subtitleContainerStyle={{ marginLeft: 20 }}
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

