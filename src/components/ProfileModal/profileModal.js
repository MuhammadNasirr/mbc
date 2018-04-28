import React from 'react';
import { View, style, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
export default class ProfileModal extends React.Component {

    render() {
        console.log(this.props.feedBacks)
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <ImageBackground source={require('../../../images/login.png')} style={styles.loginimage} >
                    <ScrollView >
                        <Card
                            containerStyle={{
                                display: 'flex',
                                marginTop: '5%', padding: 10, justifyContent: 'flex-start', marginBottom: 20
                            }}
                            title="User Feedback and Rating" >
                            {this.props.feedBacks && this.props.feedBacks.map((d, i) => {
                                console.log(d.attributes)
                                return (
                                    <View
                                        style={{ alignItems: 'center' }}
                                    >
                                        <StarRating
                                            showRating
                                            type="custom"
                                            fractions={1}
                                            rating={d.attributes.rating}
                                            readonly
                                            fullStarColor="rgb(0,150,136)"
                                            containerStyle={{}}
                                            ratingTextColor='#fff'
                                            showReadOnlyText='#fff'
                                            ratingBackgroundColor="transparent"
                                            ratingColor='rgb(0,150,136)'
                                            readonly={true}
                                        />
                                        <Text>{d.attributes.person}</Text>
                                        <Text>{d.attributes.feedback}</Text>
                                        <Text>{d.attributes.createdDate}</Text>
                                    </View>
                                )
                            })}

                        </Card>
                    </ScrollView>
                    <Button
                        containerViewStyle={{ margin: '3%', alignItems: 'center', justifyContent: 'flex-end' }}
                        onPress={() => this.props.closeModel()}
                        title="Okay"
                        buttonStyle={{ width: 200, borderRadius: 5, backgroundColor: 'rgb(0,150,136)' }}
                    />
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loginimage: {
        flex:1,
        justifyContent: 'center',
        width: null,
        height: null,
        resizeMode: 'stretch',
    },
})