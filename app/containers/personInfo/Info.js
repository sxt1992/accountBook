import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, ScrollView, TouchableOpacity, TouchableHighlight, Image, View } from 'react-native';

//图片选择器
import ImagePicker from 'react-native-image-picker';

import actions from '../../actions';

let goBack = ()=>{};

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: '',
            nickname: '',
            email: '',
            phone: '',
            headImgUrl: require('../../images/head/noHead.png'),
            headImgLocal: require('../../images/head/noHead.png')
        };
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
                /* {
                    data:"",
                    fileName:"IMG_20170906_212335.jpg",
                    fileSize:5915115,
                    height:5152,
                    isVertical:true,
                    originalRotation:0,
                    path:"/storage/emulated/0/DCIM/Camera/IMG_20170906_212335.jpg"
                    timestamp:"2017-09-06T13:23:36Z"
                    type:"image/jpeg"
                    uri:"content://media/external/images/media/17664"
                    width:2896
                    }
                */
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    headImgLocal: source
                });
                // let formData = new FormData();
                // let file = {uri: response.uri, type: 'multipart/form-data', name: response.fileName};
                // formData.append("images",file); 

                // formData.append("lingshi",JSON.stringify([
                //         {
                //             name: "农夫山泉",
                //             price: 2
                //         }
                //     ]));
                // fetch('http://app.30uz.com/ht920App/upload.php',{
                //     method: 'POST',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'multipart/form-data'
                //     },
                //     body: formData
                // }).then(res => {
                //     return res.json();
                // }).then(data => {
                //     console.log(data);
                // }).catch(data=>{
                //     console.log(data)
                // });


            }
        });
    }
    logout(){
        this.props.clearData();
        goBack();
    }
    render() {
        let { navigate,goBack:_goBack } = this.props.navigation;
        goBack = _goBack;
        return <ScrollView style={styles.root}>
                    <TouchableHighlight
                            style={[styles.bgWhite,styles.marginTop20]}
                            underlayColor='transparent'
                            onPress={this.choosePic.bind(this)}
                            activeOpacity={0.6}>
                            <View style={[styles.item,styles.height70,styles.borderTopWidth0]}>
                                <Text style={styles.key}>头像</Text>
                                <Image style={styles.img} source={this.state.headImgLocal} />
                            </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                            style={styles.bgWhite}
                            underlayColor='transparent'
                            onPress={() => navigate('InfoEdit')}
                            activeOpacity={0.6}>
                            <View style={styles.item}>
                                <Text style={styles.key}>账户</Text>
                                <Text style={styles.value}>{this.props.usrData.usr}</Text>
                            </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                            style={styles.bgWhite}
                            underlayColor='transparent'
                            onPress={() => navigate('InfoEdit')}
                            activeOpacity={0.6}>
                            <View style={styles.item}>
                                <Text style={styles.key}>昵称</Text>
                                <Text style={styles.value}>{this.props.usrData.nickname}</Text>
                            </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                            style={styles.bgWhite}
                            underlayColor='transparent'
                            onPress={() => navigate('InfoEdit')}
                            activeOpacity={0.6}>
                            <View style={styles.item}>
                                <Text style={styles.key}>手机</Text>
                                <Text style={styles.value}>{this.props.usrData.phone}</Text>
                            </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                            style={styles.bgWhite}
                            underlayColor='transparent'
                            onPress={() => navigate('InfoEdit')}
                            activeOpacity={0.6}>
                            <View style={styles.item}>
                                <Text style={styles.key}>邮箱</Text>
                                <Text style={styles.value}>{this.props.usrData.email}</Text>
                            </View>
                    </TouchableHighlight>


                    <TouchableOpacity
                            onPress={this.logout.bind(this)}
                            activeOpacity={0.6}>
                            <View style={styles.logoutBtn}>
                                <Text style={styles.logoutWord}>退出登录</Text>
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
        marginLeft: '3.2%',
        marginRight: '3.2%',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: '#ccc'
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
    bgWhite: {
        backgroundColor: '#fcfcfc'
    },
    img: {
        width: 50,
        height: 50
    },
    key: {},
    value: {
        color: '#666'
    },
    logoutBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    logoutWord: {
        color: '#ce1212'
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
        clearData: (data) => dispatch(actions.clearData())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Info);