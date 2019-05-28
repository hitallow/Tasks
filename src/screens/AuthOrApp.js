import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'
import axios from 'axios';


export default class AuthOrApp extends Component {

    componentWillMount = async () => {

        const data = await AsyncStorage.getItem('userData')
        const user = JSON.parse(data) || {}
        
        if (user.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            this.props.navigation.navigate('Home', user)
        } else {
            this.props.navigation.navigate('Auth')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={20} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})