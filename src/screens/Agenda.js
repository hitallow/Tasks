import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Text, FlatList, TouchableOpacity, Platform, AsyncStorage } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'

import Task from '../components/Task'

import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'


export default class Agenda extends Component {

    state = {
        tasks: [],
        showDoneAtTask: true,
        visibleTask: [],
        showAddTask: false
    }

    // salva uma nova atividade 
    saveTask = (task) => {

        const tasks = [...this.state.tasks]

        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimateAt: task.date,
            doneAt: null
        })
        this.setState({ tasks, showAddTask: false }, this.filterTask)
    }

    // altera o estado da atividade
    toggleTask = (id) => {
        const tasks = this.state.tasks.map(task => {
            if (id === task.id) {
                task.doneAt = task.doneAt === null ? new Date() : null
            }
            return task
        })
        this.setState({ tasks }, this.filterTask())
    }

    // altera o filtro para ver atividades fechadas
    toggleFilter = () => {
        this.setState({ showDoneAtTask: !this.state.showDoneAtTask }, this.filterTask)
    }

    // busca todo as atividades dependendo do estado
    filterTask = () => {
        let visibleTask = null
        if (this.state.showDoneAtTask) {
            visibleTask = this.state.tasks
        } else {
            visibleTask = this.state.tasks.filter(task => {
                if (task.doneAt === null) {
                    return task
                }
            })
        }
        this.setState({ visibleTask })
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))

    }
    // ciclo de vida do react, primeiro método que é executado quando o componente é montado
    componentDidMount = async () => {
        const data = await AsyncStorage.getItem('tasks')
        const tasks = JSON.parse(data) || []
        this.setState({ tasks }, this.filterTask)
    }

    deleteTask = (id) => {
        // const tasks = this.state.tasks.map( task => {
        //     if(task.id!==id)
        //         return task
        // }) 

        const tasks = this.state.tasks.filter(t => t.id !== id)
        this.setState({ tasks }, this.filterTask)
    }

    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.saveTask}
                    onCancel={() => this.setState({ showAddTask: false })} />
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
                            {moment().locale('pt-br').format('ddd,D [de] MMMM [de] YYYY')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.visibleTask}
                        keyExtractor={i => `${i.id}`}
                        renderItem={({ item }) => <Task onDelet={this.deleteTask} {...item} onSelectTask={this.toggleTask} />} />
                </View>
                <ActionButton onPress={() => this.setState({ showAddTask: true })} />
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
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})