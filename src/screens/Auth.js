import React, { Component } from 'react'

import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput, Alert } from 'react-native'

import backgroundImg from '../../assets/imgs/login.jpg'

import commonStyles from '../commonStyles'


export default class Auth extends Component {

    state = {
        stageNew: false,
        password: '',
        email: '',
        name: '',
        confirmPassword: ''
    }
    signinOrSignup = () => {
        if (this.state.stageNew) {
            Alert.alert("Você está fazendo login",
                `Nome: ${this.state.name} 
                Email : ${this.state.email} 
                Senha : ${this.state.password} 
                confirmação : ${this.state.confirmPassword}`)
        } else {
            Alert.alert("Você está para se cadastrar",
                `Email : ${this.state.email}
                Senha : ${this.state.password}`)
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImg} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text>{this.state.stageNew ? 'Informe seus dados' : 'Crie sua conta'}</Text>
                    {this.state.stageNew && <TextInput style={styles.input} placeholder='Nome' value={this.state.name}
                        onChangeText={(name) => { this.setState({ name }) }} />}
                    <TextInput placeholder='E-mail'
                        style={styles.input} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                    <TextInput placeholder='Senha'
                        style={styles.input} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
                    {this.state.stageNew && <TextInput style={styles.input} placeholder='Confirme sua senha' value={this.state.confirmPassword}
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />}
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text styles={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Login'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui uma conta ? ' : 'Ainda não possui uma conta? '}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20
    }

})