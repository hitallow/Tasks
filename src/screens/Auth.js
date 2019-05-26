import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import backgroundImg from '../../assets/imgs/login.jpg'
import AuthInput from '../components/AuthInput'
import commonStyles from '../commonStyles'
import axios from 'axios'
import {showError, server} from '../common'

export default class Auth extends Component {

    state = {
        stageNew: false,
        password: '',
        email: '',
        name: '',
        confirmPassword: ''
    }
    signinOrSignup = async () => {
        if (this.state.stageNew) {
            try{
                await axios.post(`${server}/signup`,{
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
                Alert.alert("Sucesso",`${this.state.name} foi cadastrado!`)
                this.setState({stageNew : false})
            }catch(err){
                showError(err)
            }
        } else {
            try{
                const res = await axios.post(`${server}/signin`,{
                    email: this.state.email,
                    password : this.state.password
                })
                axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
                this.props.navigation.navigate('Home')
            }catch(err){
                showError(err)
            }
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImg} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text>{this.state.stageNew ? 'Informe seus dados' : 'Crie sua conta'}</Text>
                    {this.state.stageNew && <AuthInput secureTextEntry={false} icon='user' style={styles.input} placeholder='Nome' value={this.state.name}
                        onChangeText={(name) => { this.setState({ name }) }} />}
                    <AuthInput icon='at' placeholder='E-mail' secureTextEntry={false}
                        style={styles.input} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                    <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha'
                        style={styles.input} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
                    {this.state.stageNew && <AuthInput style={styles.input} placeholder='Confirme sua senha' value={this.state.confirmPassword}
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />}
                    <TouchableOpacity icon='asterisk' secureTextEntry={true} onPress={this.signinOrSignup}>
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