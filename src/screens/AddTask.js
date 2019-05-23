import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    DatePickerIOS,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    DatePickerAndroid,
    Platform
} from 'react-native'
import commomStyles from '../commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'

//import moment from 'moment'




initialState = {
    desc: '',
    date: new Date()
}
export default class AddTask extends Component {
    state = { ...initialState }

    save = () => {
        if (!this.state.desc.trim()) {
            Alert.alert('Dados inválidos', 'Infome uma descrição válida amigão')
            return
        }
        const data = { ...this.state }
        this.props.onSave(data)
        this.setState({ ...initialState })
    }

    handleDataAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const date = moment(this.state.date)
                date.date(e.day)
                date.month(e.month)
                date.year(e.year)
                this.setState({ date: date.toDate() })
            }
        })
    }

    render() {
        let dataPicker
        if (Platform.OS === 'ios') {
            dataPicker = <DatePickerIOS value={this.state.date} onDateChange={(date) => this.setState({ date })} />
        } else {
            dataPicker = (
                <TouchableOpacity  onPress={this.handleDataAndroidChanged}>
                    <Text style={styles.date}> {moment(this.state.date).locale('pt-br').format('ddd,D [de] MMMM [de] YYYY')}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal onRequestClose={this.props.onCancel} visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel} >
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>

                <View style={styles.container} >
                    <Text style={styles.header}>
                        Nova Tarefa!
                    </Text>
                    <TextInput style={styles.button} value={this.state.desc} onChangeText={(desc) => this.setState({ desc })}
                        placeholder='Descrição da atividade' />

                    {dataPicker}

                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}> Cancelar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}> Salvar </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <TouchableWithoutFeedback onPress={this.props.onCancel} >
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>


            </Modal>)
    }

}
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.7)'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commomStyles.colors.default,
    },
    header: {
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.default,
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        width: '90%',
        fontFamily: commomStyles.fontFamily,
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    },
    date :{
        fontFamily : commomStyles.fontFamily,
        textAlign : 'center',
        fontSize: 20,
        marginLeft : 10,
        marginTop : 10
    }
})