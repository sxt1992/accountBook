import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import store from 'react-native-simple-store';
import { StyleSheet, Text, ScrollView, TouchableOpacity, TouchableHighlight, Image, View } from 'react-native';

import actions from '../../actions';

class MyInfo extends React.Component {
    static navigationOptions = {
        title: "我的",
        tabBarIcon: ({ tintColor }) =>
            <Icon name="md-contacts" size={25} color={tintColor} />
    };
    render() {
        const { navigate } = this.props.navigation;
        let usrData = this.props.usrData;
        if(!(usrData.usrId>0)){
            usrData = {
                headImgLocal: require('../../images/head/noHead.png'),
                nickname: '未登录',
                email: ''
            };
        };
        return <View style={styles.root}>
                <TouchableHighlight
                    activeOpacity={0.8}
                    underlayColor='transparent'
                    onPress={() => {
                        let nStr = 'Login';
                        if(usrData.usrId>0){
                            nStr = 'PersonInfo';
                        }
                        navigate(nStr);
                    }}>
                    <View style={styles.head}>
                        <View style={styles.headLeft}>
                            <View style={styles.headImgWrap}>
                                <Image style={styles.headImg} source={usrData.headImgLocal?usrData.headImgLocal:require('../../images/head/noHead.png')} />
                            </View>
                            <View>
                                <Text style={styles.headName}>{usrData.nickname}</Text>
                                <Text style={styles.headEmail}>{usrData.email}</Text>
                            </View>
                        </View>
                        <Icon style={styles.headRight} name="ios-arrow-forward-outline" />
                    </View>
                </TouchableHighlight>
                <ScrollView style={styles.main}>

                    <View style={[styles.items]}>
                        <View style={styles.flexRow}>
                            <MCIcons style={styles.itemIcon} name="file-document-box" />
                            <Text style={styles.itemName}>账单</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.itemPreview}>0.00元</Text>
                            <Icon style={styles.itemRightArrow} name="ios-arrow-forward-outline" />
                        </View>
                    </View>
                    <View style={[styles.items,styles.marginTop]}>
                        <View style={styles.flexRow}>
                            <MCIcons style={styles.itemIcon} color='#19a7ac' name="format-align-right" />
                            <Text style={styles.itemName}>暂无</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.itemPreview}>0.00元</Text>
                            <Icon style={styles.itemRightArrow} name="ios-arrow-forward-outline" />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.foot}>
                    <Text style={styles.footWord}>Copyright &copy; {new Date().getFullYear()} 陶雪焦 版权所有</Text>
                    <Text style={styles.footWord}>Power by Tao Xuejiao</Text>
                </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    root: {
        height: '100%'
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: '#3e9ce9'
    },
    headLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headImgWrap: {
        width: 58,
        height: 58,
        padding: 3,
        backgroundColor: '#rgba(255,255,255,0.5)',
        borderRadius: 3
    },
    headImg: {
        width: 52,
        height: 52,
        borderRadius: 3
    },
    headName: {
        height: 24,
        marginLeft: 13,
        color: '#fff',
        fontSize: 16
    },
    headEmail: {
        marginLeft: 13,
        color: '#ccc',
        fontSize: 12
    },
    headRight: {
        color: '#ccc',
        fontSize: 25
    },
    main: {
        flex: 1
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#eee',
        backgroundColor: '#fff'
    },
    itemIcon: {
        width: 30,
        fontSize: 30,
        color: '#d67c16'
    },
    itemName: {
        marginLeft: 10,
        color: '#333'
    },
    itemPreview: {
        color: '#666'
    },
    itemRightArrow: {
        marginLeft: 12,
        color: '#ccc',
        fontSize: 22
    },
    foot: {
        alignItems: 'center',
        marginBottom: 10
    },
    footWord: {
        color: '#333',
        fontSize: 12
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    marginTop: {
        marginTop: 18,
        borderTopWidth: 0
    }
});

const mapStateToProps = (state) => {
    const { usrData, allData } = state;
    return {
        usrData,
        allData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyInfo);