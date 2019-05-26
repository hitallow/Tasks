import { Alert, Platform } from 'react-native'


//const server = Platform.OS === 'ios' ?'http://localhost:3000' : 'http://10.0.2.2:3000'
const server = 'http://192.168.1.6:3000'
function showError(err){
    Alert.alert("Ops, ocorreu um erro ",`Mensagem: ${err}`)
}

export {server, showError}