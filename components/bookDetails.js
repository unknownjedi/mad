import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
export default class BookDetails extends Component {
    static navigationOptions = {
        title: '',
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: '#23bcc4',
        },
        headerTitleStyle: {
            fontFamily: "Nexa-Bold"
        }
    };

    render() {
        let data = this.props.navigation.getParam('data')
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white', marginHorizontal: 10, margin: 5, paddingVertical: 10 }}>
                    <Image
                        style={{ width: 175, height: 250, alignSelf: 'center' }}
                        source={{ uri: data.image }}
                    />
                    <View style={{ marginHorizontal: 15, marginVertical: 10, marginTop: 20 }}>
                        <Text style={{ fontFamily: 'Nexa-Bold' }}>{data.name}</Text>
                        <Text style={{ fontFamily: 'Nexa-Light', color: 'gray' }}>{data.author.firstname + ' ' + data.author.lastname}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', marginHorizontal: 10, margin: 5, paddingVertical: 10 }}>
                    <View style={{ marginHorizontal: 15, margin: 5 }}>
                        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                            <Text style={{ fontFamily: 'Nexa-Bold' }}>ID :  </Text><Text style={{ fontFamily: 'Nexa-Light' }}>{data.id}</Text>
                        </View>
                        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                            <Text style={{ fontFamily: 'Nexa-Bold' }}>Location :  </Text><Text style={{ fontFamily: 'Nexa-Light' }}>{data.location}</Text>
                        </View>


                    </View>

                </View>
                <View style={{ backgroundColor: 'white', marginHorizontal: 10, margin: 5, paddingVertical: 10 }}>
                    <View style={{ marginHorizontal: 15, margin: 5 }}>
                        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                            <Text style={{ fontFamily: 'Nexa-Bold' }}>No. of Books :  </Text><Text style={{ fontFamily: 'Nexa-Light' }}>{data.count}</Text>
                        </View>
                        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                            <Text style={{ fontFamily: 'Nexa-Bold' }}>Edition :  </Text><Text style={{ fontFamily: 'Nexa-Light' }}>{data.edition}</Text>
                        </View>


                    </View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})