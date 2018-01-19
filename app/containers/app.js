import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Welcome from './Welcome';

import SumRecord from './navigation/SumRecord';
import DetailRecord from './navigation/DetailRecord';
import InputRecord from './navigation/InputRecord';
import MyInfo from './navigation/MyInfo';

import InfoEdit from './personInfo/edit';
import PersonInfo from './personInfo/Info';
import SignUp from './personInfo/signUp';
import Login from './personInfo/login';

const TabContainer = TabNavigator({
    SumRecord: {
        screen: SumRecord
    },
    DetailRecord: {
        screen: DetailRecord
    },
    InputRecord: {
        screen: InputRecord
    },
    MyInfo: {
        screen: MyInfo
    }
}, {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    });

const App = StackNavigator({
    Welcome: { screen: Welcome },
    HOME: {
        screen: TabContainer,
        navigationOptions: {
            headerTitle: '黄桃记账',
            headerBackTitle: '返回',
        }
    },
    InfoEdit: {
        screen: InfoEdit,
        navigationOptions: {
            headerTitle: '用户编辑',
            headerBackTitle: '返回',
        }
    },
    PersonInfo: {
        screen: PersonInfo,
        navigationOptions: {
            headerTitle: '个人信息',
            headerBackTitle: '返回',
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            headerTitle: '注册',
            headerBackTitle: '返回',
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerTitle: '登录',
            headerBackTitle: '返回',
        }
    }
}, {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    });

export default App;
