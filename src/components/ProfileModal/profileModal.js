import React from 'react';
import { View, style, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Rating } from 'react-native-elements';

export default class ProfileModal extends React.Component {

    render() {
        console.log(this.props.feedBacks)
        return (
            <View>
                <ScrollView >
                    <Card containerStyle={{ padding: 0, justifyContent: 'flex-start', marginBottom: 20, width: 350 }} title="User Feedback and Raiting" >
                        {this.props.feedBacks && this.props.feedBacks.map((d, i) => {
                            console.log(d.attributes)
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                    <Rating
                                        showRating
                                        type="star"
                                        fractions={1}
                                        startingValue={d.attributes.rating}
                                        readonly
                                        imageSize={40}
                                        ratingColor='rgb(0,150,136)'
                                        style={{ paddingVertical: 10 }}
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
                    containerViewStyle={{ alignItems: 'center', justifyContent: 'flex-end', borderRadius: 5, marginBottom: 10, }}
                    onPress={() => this.props.closeModel()}
                    title="Back"
                    buttonStyle={{ width: 200, backgroundColor: 'rgb(0,150,136)', borderRadius: 5, }}
                />
            </View>
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