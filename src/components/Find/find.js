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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class Find extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialMedia: []
        }
    }
    static navigationOptions = {
        headerTitle: ' FIND ',
        headerTitleStyle: {
            color: '#ffff',
            textAlign: 'center',
        },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2BB673'
        },
        headerRight: (
            <View style={{flexDirection:'row'}}>
        <SearchBar
                containerStyle={{backgroundColor:'#2BB673',width:120}}
                inputStyle={{backgroundColor:'#fff'}}
                loadingIcon={{color:'#2BB673'}}
                round
                placeholder='Search..' />
                <Icon
                    name='filter-list'
                    color='#fff'
                    size={24}
                    iconStyle={{ marginRight: 20 }}
                />
            </View>
          
                
        ) // custom compon1ent

    }
    submit() {

    }



    render() {
        const list = [
            {
                name: 'Mubashir Enterprises',
                subtitle: 'Business Type'
            },
            {
                name: 'Nasir Innovations',
                subtitle: 'Business Type'
            },
            {
                name: 'Ali Enterprises',
                subtitle: 'Business Type'
            },
            {
                name: 'Habib Innovations',
                subtitle: 'Business Type'
            },
            {
                name: 'Qasim Enterprises',
                subtitle: 'Business Type'
            },
            {
                name: 'Rifni Enterprises',
                subtitle: 'Business Type'
            },
            {
                name: 'Ajeed Innovations',
                subtitle: 'Business Type'
            },
            {
                name: 'Vortechs Innovations',
                subtitle: 'Business Type'
            },
        ]
        const { navigate } = this.props.navigation;
        return (

            <ScrollView style={{ backgroundColor: 'white' }}>

                <KeyboardAwareScrollView>
               
                    <List containerStyle={{ marginBottom: 20,marginTop:0 }}>
                        {
                            list.map((l, i) => (
                                <TouchableOpacity onPress={() => navigate('CompanyDetailsScreen',{ data: l })}>
                                <ListItem
                                    roundAvatar
                                    containerStyle={{ height: 100 }}
                                    avatar={require('../../../images/icon2.png')}
                                    avatarContainerStyle={{ width: 80, height: 80 }}
                                    avatarStyle={{ width: 80, height: 80 }}
                                    key={i}
                                    title={l.name}
                                    titleStyle={{ color: '#2BB673' }}
                                    subtitle={l.subtitle}
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

export default Find
