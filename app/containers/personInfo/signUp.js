import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, Alert, ScrollView, TouchableOpacity, TouchableHighlight, Image, View, TextInput } from 'react-native';

//图片选择器
import ImagePicker from 'react-native-image-picker';
import actions from '../../actions';

let goBack = ()=>{};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginIng: false,
            usr: '',
            pwd: '',
            secPwd: '',
            nickname: '',
            email: '',
            phone: '',
            headImgUrl: require('../../images/head/noHead.png'),
            headImgLocal: require('../../images/head/noHead.png')
        };
    }
    createUsr() {
        if(this.state.pwd !== this.state.secPwd){
            Alert.alert('提示','密码输入不一致');
            return;
        }
        if(this.state.usr == '' || this.state.pwd == ''){
            Alert.alert('提示','用户名和密码不能为空');
            return;
        }

        var req = {
            usr: this.state.usr.trim(),
            pwd: this.state.pwd.trim(),
            nickname: this.state.nickname.trim(),
            email: this.state.email.trim(),
            phone: this.state.phone.trim()
        };
        this.setState({
            loginIng: true
        });
        fetch('http://app.30uz.com/ht920App/createUsr.php',{
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
                Alert.alert('提示','注册成功',[{text: '好的', onPress: () => goBack()}]);
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
    //选择照片按钮点击
    choosePic() {
        //图片选择器参数设置
        let options = {
            title: '请选择图片来源',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'相册图片',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('用户取消了选择！');
            }else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
            }else {
                let source = { uri: response.uri };
                this.setState({
                    headImgLocal: source
                });
            }
        });
    }
    render() {
        let { navigate,goBack:_goBack } = this.props.navigation;
        goBack = _goBack;
        return <ScrollView style={styles.root}>
                    <View style={styles.item}>
                        <Text style={styles.key}><Text style={styles.red}>*</Text>账户</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='输入账户'
                            defaultValue={this.state.usr}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({usr:text});
                            }}
                          />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.key}><Text style={styles.red}>*</Text>密码</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            placeholder='输入密码'
                            defaultValue={this.state.pwd}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({pwd:text});
                            }}
                          />
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.key}><Text style={styles.red}>*</Text>再次输入密码</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            placeholder='再次输入密码'
                            defaultValue={this.state.secPwd}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({secPwd:text});
                            }}
                          />
                    </View>

                    <TouchableHighlight
                            underlayColor='transparent'
                            onPress={this.choosePic.bind(this)}
                            activeOpacity={0.6}>
                        <View style={[styles.item,styles.marginTop20,styles.height70,styles.borderTopWidth0]}>
                            <Text style={styles.key}>头像</Text>
                            <Image style={styles.img} source={this.state.headImgLocal} />
                        </View>
                    </TouchableHighlight>
                    <View style={styles.item}>
                        <Text style={styles.key}>昵称</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='输入昵称'
                            defaultValue={this.state.nickname}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({nickname:text});
                            }}
                          />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.key}>邮箱</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='输入邮箱'
                            defaultValue={this.state.email}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({email:text});
                            }}
                          />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.key}>手机号</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='输入手机号'
                            defaultValue={this.state.phone}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                text=text.trim();
                                this.setState({phone:text});
                            }}
                          />
                    </View>


                    <TouchableOpacity
                            onPress={this.createUsr.bind(this)}
                            activeOpacity={0.6}>
                            <View style={[styles.logoutBtn].concat(this.state.loginIng ? styles.loginIng:[])}>
                                <Text style={styles.logoutWord}>立即注册</Text>
                            </View>
                    </TouchableOpacity>
                </ScrollView>
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
        paddingLeft: '3.2%',
        paddingRight: '3.2%',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#ccc',
        backgroundColor: '#fcfcfc'
    },
    height70: {
        height: 70
    },
    marginTop20: {
        marginTop: 20
    },
    borderTopWidth0: {
        borderTopWidth: 0
    },
    img: {
        width: 50,
        height: 50
    },
    red: {
        color: '#f00'
    },
    key: {
        width: '30%',
        color: '#111'
    },
    input: {
        minWidth: '70%',
        color: '#444',
        fontSize: 15
    },
    logoutBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#3e9ce9'
    },
    logoutWord: {
        color: '#fff'
    },
    loginIng: {
        backgroundColor: '#a9a9a9'
    }
});

const mapStateToProps = (state) => {
    const { allData } = state;
    return {
        allData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUsrData: (data) => dispatch(actions.saveUsrData({usrData:data}))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);