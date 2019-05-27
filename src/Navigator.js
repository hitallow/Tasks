import React from 'react'

import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'

import Agenda from './screens/Agenda'

import Auth from './screens/Auth'
import commonStyles from './commonStyles'


const MenuRoutes = {
    Today: {
        name: 'Today',
        screen: (props) => <Agenda title="Hoje" dayAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje'
        },
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: (props) => <Agenda title='Amanhã' dayAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã'
        },
    },
    Week: {
        name: 'Week',
        screen: (props) => <Agenda title='Semana' dayAhead={7} {...props} />,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Moth: {
        name: 'Moth',
        screen: (props) => <Agenda title='Mês' dayAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês'
        }
    }
}
const MenuConfig = {
    initialRouteName: 'Today',
    
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
        },
        activeLabelStyle: {
            color: '#080'
        }
    }
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig)


const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: MenuNavigator
    }
}


const MainNavigator = createSwitchNavigator(mainRoutes, { initialRouteName: 'Auth' })
const navigator = createAppContainer(MainNavigator)

export default navigator