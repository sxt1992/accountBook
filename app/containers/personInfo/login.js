import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, Alert, ScrollView, TouchableOpacity, TouchableHighlight, Image, View, TextInput } from 'react-native';

import actions from '../../actions';

let goBack = ()=>{};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: '',
            pwd: '',
            loginIng: false
        };
    }
    loginUsr() {
        let req = {
            usr: this.state.usr,
            pwd: this.state.pwd
        };
        this.setState({
            loginIng: true
        });
        fetch('http://app.30uz.com/ht920App/checkUsr.php',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then(res => {
            return res.json();
        }).then(data => {
            this.setState({
                loginIng: false
            });
            if(data.flag){
                this.props.saveUsrData(data.data);

                // ----- 获取 data start ------
                fetch('http://app.30uz.com/ht920App/getData.php',{
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({usrId: data.data.usrId})
                }).then(res => {
                    return res.json();
                }).then(data => {
                    if(data.flag){
                        this.props.saveAllData(data.data);
                    }else{
                        Alert.alert('提示',data.msg);
                    }
                    goBack();
                }).catch(data=>{
                    goBack();
                });
                // ----- 获取 data end ------


            }else{
                Alert.alert('提示',data.msg);
            }
        }).catch(data=>{
            this.setState({
                loginIng: false
            });
            Alert.alert('提示','数据连接错误');
        });
    }
    render() {
        let { navigate,goBack:_goBack } = this.props.navigation;
        goBack = _goBack;
        return <View style={styles.root}>
                    <View style={styles.item}>
                        <Text style={styles.label}>账户</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='输入账户名'
                            defaultValue={this.state.usr}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({usr:text});
                            }}
                          />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>密码</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            autoCorrect={false}
                            placeholder='输入密码'
                            defaultValue={this.state.pwd}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({pwd:text});
                            }}
                          />
                    </View>
                    <TouchableOpacity
                            onPress={() => {
                                if(this.state.loginIng){
                                    return;
                                }
                                this.loginUsr.call(this);
                            }}
                            activeOpacity={0.6}>
                            <View style={[styles.loginBtn].concat(this.state.loginIng ? styles.loginIng:[])}>
                                <Text style={styles.loginWord}>登&nbsp;录</Text>
                            </View>
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <TouchableHighlight
                            underlayColor='transparent'
                            onPress={() => navigate('SignUp')}
                            activeOpacity={0.6}>
                            <Text style={styles.blueWord}>新用户注册</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor='transparent'
                            onPress={() => {}}
                            activeOpacity={0.6}>
                            <Text style={styles.blueWord}>找回密码</Text>
                        </TouchableHighlight>
                    </View>
                </View>
    }
}

const styles = StyleSheet.create({
    root: {
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#ccc'
    },
    label: {
        width: '20%',
        color: '#111',
        fontSize: 16
    },
    input: {
        width: '80%',
        color: '#444',
        fontSize: 15
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#3e9ce9'
    },
    loginWord: {
        color: '#fff'
    },
    loginIng: {
        backgroundColor: '#a9a9a9'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    blueWord: {
        color: '#3e9ce9'
    }
});

const mapStateToProps = (state) => {
    const { allData,usrData } = state;
    return {
        allData,
        usrData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUsrData: (data) => dispatch(actions.saveUsrData({usrData:data})),
        saveAllData: (data) => dispatch(actions.saveAllData({allData:data}))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);