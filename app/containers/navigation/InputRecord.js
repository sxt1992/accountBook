import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions, Alert, TouchableHighlight, FlatList, StyleSheet, TextInput, Text, ScrollView, View, TouchableOpacity, Switch, Modal, TouchableWithoutFeedback } from 'react-native';

import DatePicker from '../../componts/DatePicker';

import storage from '../../dataStorage/storage';

import actions from '../../actions';

const initDataStr = JSON.stringify({isOut: true, typeId: -2, typeName: '', showType: true, name: '', price: ''});
const that = null;

class InputRecord extends React.Component {
    constructor(props) {
        super(props);
        that = this;

        let t = new Date();
        let str = t.getFullYear()+'';
        if(t.getMonth()<9){
            str += '0';
        }
        str+=(t.getMonth()+1);
        if(t.getDate()<10){
            str += '0';
        }
        str+=t.getDate();

        this.state = {
            modalVisible: false,
            modalPanleStyle: {
                top: 0,
                left: 0,
                width: 120
            },
            activeDataIndex: 0,
            date: str,
            inputType: '',
            saveData: [JSON.parse(initDataStr)]
        };
    }
    static navigationOptions = {
        title: "录入",
        tabBarIcon: ({ tintColor }) =>
            <Icon name="ios-create" size={25} color={tintColor} />
    };
    addSaveData() {
        let nArr = this.state.saveData.slice();
        nArr.push(JSON.parse(initDataStr));
        this.setState({saveData: nArr });
    }
    delSaveData(index) {
        let nArr = this.state.saveData.slice();
        nArr.splice(index, 1);
        this.setState({saveData: nArr });
    }
    addNewType(inOrOut,cb) {
        if(typeof this.props.usrData!='object' || !(this.props.usrData.id>0)){
            Alert.alert('提示','请登录',[{text: '好的'}]);
            return;
        }

        fetch('http://app.30uz.com/ht920App/getData.php',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usrId: this.props.usrData.id,
                typeName: this.state.inputType,
                inOrOut: inOrOut
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            if(data.flag){
                this.props.saveAllData(data.data);
                cb();
                Alert.alert('提示','创建类型成功');
            }else{
                Alert.alert('提示',data.msg);
            }
        }).catch(data=>{
            Alert.alert('提示','数据连接错误');
        });
    }
    submitData() {
        if(typeof this.props.usrData!='object' || !(this.props.usrData.id>0)){
            Alert.alert('提示','请登录',[{text: '好的'}]);
            return;
        }
        let data = [];
        this.state.saveData.forEach(function(item){
            data.push({
                typeId: item.typeId,
                name: item.name,
                price: item.price,
                inOrOut: item.isOut ? 1 : 0
            });
        });

        var req = {
            date: this.state.date,
            usrId: this.props.usrData.id,
            detail: JSON.stringify(data)
        };
        fetch('http://app.30uz.com/ht920App/getData.php',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then(res => {
            return res.json();
        }).then(data => {
            if(data.flag){
                this.props.saveAllData(data.data);
            }else{
                Alert.alert('提示',data.msg);
            }
        }).catch(data=>{
            Alert.alert('提示','数据连接错误');
        });
    }
    render() {
        return <ScrollView>
                    <View style={styles.wrapper}>
                        <View style={styles.item}>
                            <Text style={styles.label}>时间</Text>
                            <DatePicker showIcon={true} onChange={date=>this.setState({date:date.replace(/-/g,'')})} style={styles.time} />
                        </View>

                        {
                            this.state.saveData.map(function(mValue, mIndex){
                                return (<View key={'mykey'+mIndex}>
                                    <View style={[styles.item,styles.itemTitle]}>
                                        <Text style={styles.itemTitleWord}>记录{ mIndex+1 }</Text>
                                        { 
                                            mIndex !== 0 ?
                                                <TouchableOpacity
                                                    activeOpacity={0.6}
                                                    onPress={() => that.delSaveData.call(that,mIndex)}>
                                                    <Text style={styles.itemTitleDel}>删除</Text>
                                                </TouchableOpacity>
                                                : null
                                        }
                                    </View>
                                    <View style={styles.item}>
                            <Text style={styles.label}>类型</Text>
                            <View style={styles.inOrout}>
                                <Text style={styles.inOroutWord}>{mValue.isOut ? '支出':'收入'}</Text>
                                {
                                    mValue.typeId>0? null:
                                    <Switch
                                        style={styles.inOroutSwitch}
                                        onTintColor = '#3e9ce9'
                                        tintColor = '#abb0b3'
                                        onValueChange={ (value) => {
                                            let nArr = that.state.saveData.slice();
                                            nArr[mIndex].isOut = value;
                                            that.setState({saveData: nArr });
                                          } }
                                        value={mValue.isOut} />
                                }
                            </View>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>条目</Text>
                            { 
                                mValue.showType ?
                                    <TouchableHighlight
                                        style={styles.clausesWidth}
                                        ref={e => {
                                            mValue._elem=e;
                                        }}
                                        activeOpacity={0.8}
                                        underlayColor='transparent'
                                        onPress={() => {
                                            // this 是为了获取当前元素
                                            // width,height 宽高
                                            // px,py 距离左上 距离
                                            mValue._elem.measure((fx, fy, width, height, px, py) => {

                                                let newModelPanelStyle = {
                                                                    left: px,
                                                                    width: width
                                                                };
                                                let {width:screenW, height:screenH} = Dimensions.get('window');
                                                let eDownHeight = screenH - py - height;
                                                if(py > eDownHeight) {
                                                    newModelPanelStyle.bottom = eDownHeight + height;
                                                }else{
                                                    newModelPanelStyle.top = py + height;
                                                }
                                                that.setState({
                                                    modalVisible: true,
                                                    activeDataIndex: mIndex,
                                                    modalPanleStyle: newModelPanelStyle
                                                });
                                                
                                            });

                                        }}
                                    >
                                        <View style={styles.clauses}>
                                            <Text style={styles.clausesWord}>{mValue.typeName}</Text>
                                            <View style={styles.clausesIcons}>
                                                <Icon name="md-arrow-dropup" size={14} color="#555" />
                                                <Icon name="md-arrow-dropdown" size={14} color="#555" />
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                    : <TextInput
                                        style={styles.clausesInput}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        maxLength={6}
                                        defaultValue={that.state.inputType}
                                        placeholder='条目(限制6字)'
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => {
                                            text=text.trim();
                                            that.setState({inputType:text});
                                        }}
                                      />

                            }
                            {
                                !mValue.showType ? null:<TouchableOpacity
                                        style={styles.clausesCancel}
                                        onPress={()=>{
                                            let nArr = that.state.saveData.slice();
                                            nArr[mIndex].showType = false;
                                            that.setState({ inputType: '', saveData: nArr});
                                        }}
                                        activeOpacity={0.6}>
                                        <Text style={styles.clausesAdd}>新增</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        { mValue.showType ? null:
                        <View style={[styles.item,styles.addType]}>
                            <TouchableOpacity
                                style={{width: '30%'}}
                                onPress={()=>{
                                        that.addNewType(mValue.isOut ? 1:0,()=>{
                                            let nArr = that.state.saveData.slice();
                                            nArr[mIndex].showType = true;
                                            that.setState({saveData: nArr });
                                        });
                                    }}
                                activeOpacity={0.6}>
                                <View style={styles.addTypeBtn}><Text style={styles.addTypeBtnWord}>确定</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{width: '30%'}}
                                onPress={()=>{
                                    let nArr = that.state.saveData.slice();
                                    nArr[mIndex].showType = true;
                                    that.setState({saveData: nArr });
                                }}
                                activeOpacity={0.6}>
                                <View style={styles.addTypeBtn}><Text style={styles.addTypeBtnWord}>取消</Text></View>
                            </TouchableOpacity>
                        </View>
                        }
                        <View style={styles.item}>
                            <Text style={styles.label}>消费内容</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder='输入消费内容'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => {
                                    let nArr = that.state.saveData.slice();
                                    nArr[mIndex].name = text;
                                    that.setState({saveData: nArr });
                                }}
                                value={mValue.name}
                              />
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>金额</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder='输入消费金额'
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    let nArr = that.state.saveData.slice();
                                    nArr[mIndex].price = text;
                                    that.setState({saveData: nArr });
                                }}
                                value={mValue.price}
                              />
                        </View></View>);
                            })
                        }

                        <TouchableOpacity
                            style={styles.add}
                            activeOpacity={0.6}
                            onPress={this.addSaveData.bind(this)}>
                            <View style={styles.item}>
                                <Icon style={styles.addIcon} name="md-add-circle" />
                                <Text style={styles.addWord}>添加更多</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={this.submitData.bind(this)}>
                            <View style={styles.btn}><Text style={styles.btnWord}>提交</Text></View>
                        </TouchableOpacity>
               </View>

                <Modal
                    animationType="none"
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <TouchableWithoutFeedback
                        onPress={ ()=>this.setState({ modalVisible: false}) }
                    >
                        <View style={{flex:1}}>
                            <View style={[styles.selectPanel,this.state.modalPanleStyle]}>
                            <FlatList
                                data={ this.props.allData.type }
                                keyExtractor={ (item, index) => ('key-' + index)}
                                renderItem={({item}) => (<TouchableHighlight
                                        activeOpacity={0.3}
                                        underlayColor='#3e9ce908'
                                        onPress={()=>{
                                            let nArr = this.state.saveData.slice();
                                            nArr[this.state.activeDataIndex].typeId = item.id;
                                            nArr[this.state.activeDataIndex].typeName = item.name;
                                            this.setState({ saveData: nArr, modalVisible: false});
                                        }}
                                        >
                                        <View style={styles.selectItem}>
                                        <Icon style={[styles.selectItemIcon, this.state.saveData[this.state.activeDataIndex].typeId == item.id ? styles.selectItemWord:{}]} name="md-checkmark" />
                                        <Text style={styles.selectItemWord}>{item.name}</Text>
                                        </View>
                                        </TouchableHighlight>)
                                }
                            />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

               </ScrollView>;
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30,
        marginRight: '6%',
        marginBottom: 30,
        marginLeft: '6%',
        padding: '8%',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: '#674c41',
        borderRadius: 4,
        backgroundColor: 'rgba(62, 156, 233, 0.05)'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 36,
    },
    itemTitle: {
        justifyContent: 'space-between',
        marginTop: 20
    },
    itemTitleWord: {
        fontSize: 18,
        color: '#444'
    },
    itemTitleDel: {
        color: '#3e9ce9'
    },
    label: {
        width: '30%',
        fontSize: 14,
        color: '#333'
    },
    time: {
        width: '60%',
        height: 40,
        marginLeft: -8
    },
    inOrout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%'
    },
    inOroutWord: {
        fontSize: 14
    },
    inOroutSwitch: {
    },
    clausesWidth: {
        width: '44%'
    },
    clauses: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 32,
        paddingLeft: 6,
        paddingRight: 6,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        overflow: 'hidden' 
    },
    clausesWord: {
        color: '#333'
    },
    clausesIcons: {
        justifyContent: 'space-around'
    },
    clausesInput: {
        alignSelf: 'center',
        width: '44%',
        height: 32,
        padding: 0,
        paddingLeft: 6,
        paddingRight: 6,
        fontSize: 14,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc'
    },
    clausesAdd: {
        marginLeft: '12%',
        marginBottom: 2,
        color: '#3e9ce9',
        textAlign: 'right'
    },
    addType: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8
    },
    addTypeBtn: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        height: 30,
        borderRadius: 4,
        backgroundColor: '#3e9ce9'
    },
    addTypeBtnWord: {
        color: '#fff',
        textAlign: 'center'
    },
    input: {
        alignSelf: 'center',
        width: '70%',
        height: 32,
        padding: 0,
        paddingLeft: 6,
        paddingRight: 6,
        fontSize: 14,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc'
    },
    add: {
        width: '32%',
        marginTop: 10
    },
    addIcon: {
        marginTop: 2,
        marginRight: 6,
        fontSize: 14,
        color: '#3e9ce9'
    },
    addWord: {
        color: '#3e9ce9'
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '30%',
        height: 30,
        marginTop: 10,
        backgroundColor: '#3e9ce9',
        borderRadius: 4
    },
    btnWord: {
        color: '#fff',
        textAlign: 'center'
    },
    selectPanel: {
        position: 'absolute',
        maxHeight: 200,
        padding: 9,
        borderRadius: 4,
        backgroundColor: '#f7f7f7'
    },
    selectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 23
    },
    selectItemIcon: {
        marginTop: 2,
        marginRight: 4,
        fontSize: 16,
        color: 'transparent'
    },
    selectItemWord: {
        color: '#333'
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
        saveAllData: (data) => dispatch(actions.saveAllData({allData:data}))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(InputRecord);