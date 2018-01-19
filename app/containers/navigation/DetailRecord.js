import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native';

import Header from '../../componts/Header';

const WEEK = ['日', '一', '二', '三', '四', '五', '六'];

// 把 所有数据,转化成当前页面 所需要的数据
let allData2Detail = (allData, year, month) => {
    let types = {};
    allData.type.forEach(function (item) {
        types[item.id] = item;
    });
    let resData = [];
    let kcnt = 0;
    for (let prop in allData.data) {
        if (prop.substr(0, 4) != year || prop.substr(4, 2) != month) {
            continue;
        }
        let oneDay = {
            key: 'key' + (kcnt++),
            date: new Date(year, month - 1, +prop.substr(6)),
            showDay: '',
            out: 0, // 支出
            in: 0, // 收入
            data: []
        };
        for (let i = 0; i < allData.data[prop].length; i++) {
            let typeId = allData.data[prop][i].typeId;
            oneDay.data = oneDay.data.concat(allData.data[prop][i].detail.map(item => {
                item.inOrOut = types[typeId].inOrOut;
                return item;
            }));
        }
        resData.push(oneDay);
    }
    resData.forEach(function (item) {
        item.showDay = `${item.date.getDate()}日-星期${WEEK[item.date.getDay()]}`;
        for (let i = 0; i < item.data.length; i++) {
            if (item.data[i].inOrOut == 1) {
                item.out += item.data[i].price * 100;
            } else {
                item.in += item.data[i].price * 100;
            }
        }
        item.out /= 100;
        item.in /= 100;
    });
    resData.sort(function (a, b) { return b.date - a.date; });
    return resData;
};


class DetailRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }
    }
    static navigationOptions = {
        title: "详情",
        tabBarIcon: ({ tintColor }) => {
            console.log(Icon);
            console.log(tintColor);
            return <Icon name="md-list-box" size={25} color={tintColor} />
        }

    };
    _renderItem = ({ item }) => {
        return <View style={styles.item}>
            <View style={styles.itemLeft}>
                <MaterialIcon style={[styles.itemIcon].concat(item.inOrOut == 1 ? styles.outColor : styles.inColor)} name="attach-money" />
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.inOrOut == 1 ? '-' : '+'} {item.price.toFixed(2)}</Text>
        </View>
    };
    _sectionHead = ({ section }) => {
        return <View style={styles.section}>
            <Text style={styles.sectionWord}>{section.showDay}</Text>
            <Text style={styles.sectionWord}>支出:{section.out.toFixed(2)} 收入:{section.in.toFixed(2)}</Text>
        </View>
    };
    onDateChange(y, m) {
        this.setState({
            year: y,
            month: m
        });
    }
    render() {
        let data = allData2Detail(this.props.allData, this.state.year, this.state.month);
        let mIn = 0, mOut = 0;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].data.length; j++) {
                let item = data[i].data[j];
                if (item.inOrOut == 1) {
                    mOut += item.price * 100;
                } else {
                    mIn += item.price * 100;
                }
            }
        }
        mOut /= 100;
        mIn /= 100;
        return <View style={styles.root}>
            <Header onChange={this.onDateChange.bind(this)} mIn={mIn} mOut={mOut} />
            <SectionList
                keyExtractor={(item, index) => ('key-' + index)}
                renderItem={this._renderItem}
                renderSectionHeader={this._sectionHead}
                sections={data}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 24,
        marginLeft: 16,
        paddingRight: 16,
        backgroundColor: '#e9e9ef'
    },
    sectionWord: {
        color: '#666',
        lineHeight: 24
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 42,
        marginLeft: 16,
        paddingRight: 16,
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#ccc'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        fontSize: 24
    },
    itemName: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },
    itemPrice: {
        color: '#666'
    },
    inColor: {
        color: 'rgba(255, 101, 0, 0.86)'
    },
    outColor: {
        color: 'rgba(72, 204, 85, 0.7)'
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailRecord);
