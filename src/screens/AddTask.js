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
    Alert
} from 'react-native'
import commomStyles from '../commonStyles'

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

    render() {
        return (
            <Modal onRequestClose={this.props.OnCancel} visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.OnCancel} >
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>

                <View style={styles.container} >
                    <Text style={styles.header}>
                        Nova Tarefa!
            </Text>
                    <TextInput style={styles.button} value={this.state.desc} onChangeText={(desc) => this.setState({ desc })}
                        placeholder='Descrição da atividade' />
                    <DatePickerIOS value={this.state.date} onDateChange={(date) => this.setState({ date })} />
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.props.OnCancel}>
                            <Text style={styles.button}> Cancelar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSave}>
                            <Text style={styles.button}> Salvar </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <TouchableWithoutFeedback onPress={this.props.OnCancel} >
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
    }
})