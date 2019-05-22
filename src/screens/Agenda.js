import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Text, FlatList, TouchableOpacity } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'

import Task from '../components/Task'
import { platform } from 'os';

export default class Agenda extends Component {

    state = {
        tasks: [
            {
                id: Math.random(), desc: 'Projeto de reac-native', doneAt: new Date(), estimateAt: new Date()
            },
            {
                id: Math.random(), desc: 'Concluir curso', doneAt: null, estimateAt: new Date()
            },

        ],
        showDoneAtTask: false,
        visibleTask =[]
    }

    toggleTask = (id) => {
        const tasks = this.state.tasks.map(task => {
            if (id === task.id) {
                task.doneAt = task.doneAt === null ? new Date() : null
            }
            return task
        })
        this.setState({ tasks }, this.filterTask())
    }

    toggleFilter = () => {
        this.setState({ showDoneAtTask: !this.state.showDoneAtTask }, this.filterTask())
    }

    filterTask = () => {
        const visibleTask = null
        if (this.state.showDoneAtTask) {
            visibleTask = this.state.tasks
        } else {
            visibleTask = this.state.tasks.filter(task => {
                if (task.doneAt !== null) {
                    return task
                }
            })

        }
        this.setState({ visibleTask })

    }
    componentDidMount = () => {
        this.filterTask()
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter} >
                            <Icon name={this.state.showDoneAtTask ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd,D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.visibleTask}
                        keyExtractor={i => `${i.id}`}
                        renderItem={({ item }) => <Task {...item} onSelectTask={this.toggleTask} />} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    tasksContainer: {
        flex: 7,

    },
    iconBar :{
        marginTop : platform.OS === 'ios'? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent : 'flex-end'
    }
})