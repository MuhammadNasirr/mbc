import React from 'react';
import { View, style, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';


export default class PrivacyCard extends React.Component {

    render() {
        return (
            <ScrollView >
                <Card containerStyle={{ padding: 0, justifyContent: 'flex-start',marginBottom:20 }} title="privacy Policy" >

                    <Text style={{ height: "auto" }}>
                        When you use Google services, you trust us with your information.
                         This Privacy Policy is meant to help you understand what data we collect,
                          why we collect it, and what we do with it.
                           This is important; we hope you will take time to read it carefully.
                           And remember, you can find
                         controls to manage your information and protect your privacy and security at My Account
                         When you use Google services, you trust us with your information.
                         This Privacy Policy is meant to help you understand what data we collect,
                          why we collect it, and what we do with it.
                           This is important; we hope you will take time to read it carefully.
                           And remember, you can find
                         controls to manage your information and protect your privacy and security at My Account
                    </Text>

                </Card>
                <Button
                    containerViewStyle={{ alignItems: 'center', justifyContent: 'flex-end' }}
                    onPress={() => this.props.closeModel()}
                    title="ok"
                    buttonStyle={{ width: 200, backgroundColor: 'rgb(0,150,136)' }}
                />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // flex: 1,
        justifyContent: 'center'
    }
})