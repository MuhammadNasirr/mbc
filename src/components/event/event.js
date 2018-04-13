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
import Calender from 'react-native-vector-icons/EvilIcons'

// import { Picker } from 'native-base'
// import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// const Item = Picker.Item;
export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: []
        }
    }
    static navigationOptions = {
        // header:null,
        headerTitle: ' Events ',
        headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(0,150,136)'
        },

    }
    render() {
        const { navigate } = this.props.navigation;
        const list = this.props.navigation.state.params.data
        return (

            <ScrollView style={{ backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>
                    <List containerStyle={{ marginBottom: 20, marginTop: 0 }}>
                        {
                            list && list.map((l, i) => (
                                <TouchableOpacity key={i} >
                                    <ListItem
                                        titleNumberOfLines={2}
                                        subtitleNumberOfLines={2}
                                        hideChevron={true}
                                        containerStyle={{ height: 100 }}
                                        avatar={require('../../../images/icon3.png')}
                                        avatarContainerStyle={{ width: 80, height: 80, marginRight:'5%'}}
                                        avatarStyle={{ width: 80, height: 80 }}
                                        title={<View>
                                            <Text>{l.attributes.name}</Text>
                                        </View>}
                                        titleStyle={{ color: '#2BB673' }}
                                        subtitle=
                                        {
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Calender name="calendar" size={30} />
                                                    <Text>{l.attributes.eventDate}</Text>
                                                </View>
                                                <Text>Created At</Text>
                                                <Text>
                                                    {l.attributes.createdDate}
                                                </Text>
                                            </View>
                                        }
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </List>
                </KeyboardAwareScrollView>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({

})
