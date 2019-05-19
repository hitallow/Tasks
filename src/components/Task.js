import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles';


export default props => {
    let check = null

    if (props.doneAt != null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={commonStyles.colors.secondary} />

            </View>
        )
    } else {
        check = <View style={styles.pedding} />
    }
    const descStyle = props.doneAt != null ? { textDecoration: 'line-through' } : {}

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>{check} </View>
            <View style={[styles.description, descStyle]}>
                {props.desc}
            </View>
            <Text> {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderColor: '#aaa',
        borderBottomWidth: 1
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    pedding: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555'
    },
    done: {
        height : 25,
        width :25,
        borderRadius : 15,
        backgroundColor: '#4d7031'
    },
    description : {
        fontFamily : commonStyles.fontFamily,
        color : commonStyles.colors.mainText,
        fontSize:  15,
    },
    date: {
        fontFamily : commonStyles.fontFamily,
        width : 25,
        borderRadius : 15,
        backgroundColor : '#4d7031',
        alignItems : 'center'
    },
    description : {
        fontFamily : commonStyles.fontFamily,
        color : commonStyles.colors.mainText,
        fontSize : 15

    }
})