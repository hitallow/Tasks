import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Agenda from './screens/Agenda'

import Auth from './screens/Auth'

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen:  Auth
    },
    Home: {
        name: 'Home',
        screen:  Agenda
    }
}

const MainNavigator = createSwitchNavigator(mainRoutes, { initialRouteName: 'Auth' })
const navigator = createAppContainer(MainNavigator)

export default navigator