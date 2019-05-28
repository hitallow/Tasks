import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'
import axios from 'axios'
import { server, showError } from '../common'
import Task from '../components/Task'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
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
    saveTask = async (task) => {
        
        try {
            await axios.post(`${server}/tasks`, {
                desc: task.desc,
                estimateAt: task.date
            })
            this.setState({ showAddTask: false }, this.loadTasks)

        } catch (e) {
            showError(e)
        }

    }
    loadTasks = async () => {
        try {
            const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTask)
        } catch (e) {
            showError(e)
        }
    }

    // altera o estado da atividade
    toggleTask = async (id) => {
        try {
            await axios.put(`${server}/tasks/${id}/toggle`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }

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
        //AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))

    }
    // ciclo de vida do react, primeiro método que é executado quando o componente é montado
    componentDidMount = async () => {
        this.loadTasks()
    }

    deleteTask = async (id) => {
        // const tasks = this.state.tasks.map( task => {
        //     if(task.id!==id)
        //         return task
        // }) 

        // const tasks = this.state.tasks.filter(t => t.id !== id)
        // this.setState({ tasks }, this.filterTask)
        try {
            await axios.delete(`${server}/tasks/${id}`)
            await this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    render() {
        let color = null
        let image = null
        switch(this.props.dayAhead){
            case 0:
                color = commonStyles.colors.today
                image = todayImage
                break
            case 1:
                color = commonStyles.colors.tomorrow
                image = tomorrowImage
                break
            case 7:
                color = commonStyles.colors.week
                image = weekImage
                break
            default:
                color = commonStyles.colors.month
                image = monthImage
        }


        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.saveTask}
                    onCancel={() => this.setState({ showAddTask: false })} />
                <ImageBackground source={image} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter} >
                            <Icon name={this.state.showDoneAtTask ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
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
                <ActionButton buttonColor={color} onPress={() => this.setState({ showAddTask: true })} />
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
        justifyContent: 'space-between'
    }
})