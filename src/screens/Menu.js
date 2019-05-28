import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'


export default props => {
    const logout = async () => {
        AsyncStorage.removeItem('userData')
        delete axios.defaults.headers.common['Authorization']
        props.navigation.navigate('Loading')
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }} />

                <View style={styles.userInfo}>
                    <View >
                        <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
                        <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
                    </View>
                    <TouchableOpacity onPress={logout}>
                        <View style={styles.logoutIcon}>
                            <Icon name='sign-out' size={30} color='#800' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    header: {
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        backgroundColor: '#fff',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: 30,
        padding: 10,
        textAlign: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#aaa',
        borderRadius: 30,
        margin: 10,
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        marginLeft: 10,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10,
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoutIcon:{
        justifyContent :'center',
        alignItems: 'center',
        marginRight: 20,
    }
})