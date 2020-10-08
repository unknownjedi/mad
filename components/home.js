import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, YellowBox, ToastAndroid, ActivityIndicator, AsyncStorage, Alert } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import BookDetails from './bookDetails';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Home",
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: '#23bcc4',
        },
        headerTitleStyle: {
            fontFamily: "Nexa-Bold"
        },
        headerRight: () => <Text onPress={() => {
            Alert.alert('Log out', 'Are you sure you want to log out?',
                [{ text: 'NO', style: 'cancel' },
                {
                    text: 'YES', onPress: async () => {
                        await AsyncStorage.removeItem('token')
                        await navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'login' })
                            ]
                        }))
                    }
                }
                ], { cancelable: false })

        }} style={{ fontFamily: 'Nexa-Light', color: 'white', marginHorizontal: 10 }}>Log out</Text>
    })
    constructor() {
        super()
        YellowBox.ignoreWarnings([
            "'ListItem"
        ])
    }
    state = {
        data: [],
        keyword: '',
        visible: false,
        haveData: false
    }
    arrayholder = []
    componentDidMount = () => {
        database()
            .ref('/books')
            .once('value')
            .then(snapshot => {
                console.log(snapshot.val());
                this.setState({

                    visible: true,
                    haveData: true
                })
                this.arrayholder = snapshot.val()
                ToastAndroid.show("You're good to go!", 500)
            });
    }
    searchFilterFunction = text => {
        if (text !== '') {
            this.setState({
                keyword: text
            })
            const newData = this.arrayholder.filter(item => {
                const itemName = `${item.name.toUpperCase()}`;
                const itemFN = `${item.author.firstname.toUpperCase()}`
                const itemLN = `${item.author.lastname.toUpperCase()}`
                const textName = text.toUpperCase();
                const textFN = text.toUpperCase()
                const textLN = text.toUpperCase()




                return itemName.indexOf(textName) > -1 || itemFN.indexOf(textFN) > -1 || itemLN.indexOf(textLN) > -1;
            });

            this.setState({ data: newData });
        } else {
            this.setState({ keyword: text, data: [] })
        }

    };
    render() {
        if (!this.state.visible) {
            return (

                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size='large' color='#23bcc4' />
                    <Text style={{ fontFamily: 'Nexa-Light', margin: 5, color: 'black' }}>Please wait...</Text>
                </View>
            )
        } else {
            if (!this.state.haveData) {
                return (

                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ fontFamily: 'Nexa-Light', color: 'black' }}>There is nothing to show, just yet!</Text>
                    </View>


                )
            } else {
                return (
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <ListItem
                                        title={item.name}
                                        titleStyle={{ fontFamily: 'Nexa-Bold' }}
                                        subtitle={
                                            <View>
                                                <Text style={{ fontFamily: 'Nexa-Light', color: 'gray' }}>Author: <Text style={{ fontFamily: 'Nexa-Light' }}>{item.author.firstname} {item.author.lastname}</Text></Text>
                                            </View>
                                        }
                                        containerStyle={{
                                            marginHorizontal: 10,
                                            margin: 5,
                                        }}
                                        onPress={() => this.props.navigation.navigate('book_details', { data: item })}
                                    />
                                )
                            }}
                            ListHeaderComponent={
                                <SearchBar
                                    placeholder='Search Books'
                                    inputStyle={{ fontFamily: 'Nexa-Light' }}
                                    lightTheme
                                    value={this.state.keyword}
                                    onChangeText={text => this.searchFilterFunction(text)}
                                    searchIcon={
                                        <Icon name='search' size={20} color={'gray'} style={{ marginLeft: 5, marginBottom: 5 }}
                                        />
                                    }


                                />
                            }
                        />
                    </View>
                )
            }
        }
    }
}
const AppNavigator = createStackNavigator({
    home: {
        screen: Home,

    },
    book_details: BookDetails
})
export default createAppContainer(AppNavigator)
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})