import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import actions from '../../actions';
import storage from '../../dataStorage/storage';

import Header from '../../componts/Header';

let allData2Preview = (allData, year, month) => {
    let types = {};
    allData.type.forEach(function (item) {
        types[item.id] = item;
    });

    let allTypePrice = {};
    for (let prop in allData.data) {
        let y = + prop.substr(0, 4), m = + prop.substr(4, 2), d = + prop.substr(6);
        if (year == y && month == m) {
            for (let i = 0; i < allData.data[prop].length; i++) {
                let oneItem = allData.data[prop][i];
                if (!allTypePrice[oneItem.typeId]) {
                    allTypePrice[oneItem.typeId] = 0;
                }
                for (let j = 0; j < oneItem.detail.length; j++) {
                    allTypePrice[oneItem.typeId] += oneItem.detail[j].price * 100; // 乘一百,为了小数精确
                }
            }
        }
    }

    let resData = [];
    for (let typeId in allTypePrice) {
        resData.push(Object.assign(
            {
                sumPrice: allTypePrice[typeId] / 100  // 除一百,为了小数精确,还原
            },
            types[typeId]));
    }
    return resData;
};

class SumRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }
        storage.get('state').then(d => {
            this.props.saveUsrData(d.usrData);
            this.props.saveAllData(d.allData);
        }).catch(() => { });
    }
    static navigationOptions = {
        title: "总览",
        tabBarIcon: ({ tintColor }) => <Icon name="md-bookmarks" size={25} color={tintColor} />
    }
    onDateChange(y, m) {
        this.setState({
            year: y,
            month: m
        });
    }
    render() {
        let data = allData2Preview(this.props.allData, this.state.year, this.state.month);
        let mIn = 0, mOut = 0;
        for (let prop in data) {
            if (data[prop].inOrOut == 1) {
                mOut += data[prop].sumPrice * 100;
            } else {
                mIn += data[prop].sumPrice * 100;
            }
        }
        mOut /= 100;
        mIn /= 100;
        return <View>
            <Header onChange={this.onDateChange.bind(this)} mIn={mIn} mOut={mOut} />
            <FlatList
                style={styles.items}
                data={data}
                keyExtractor={(item, index) => ('mykey' + index)}
                renderItem={({ item, index }) => {
                    return <View style={styles.itemWrap}>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <View style={styles.toRight}>
                            <Icon style={[styles.itemIcon].concat(item.inOrOut == 1 ? styles.outColor : styles.inColor)} name="logo-yen" />
                            <Text style={styles.itemCont}>{item.inOrOut == 1 ? '-' : '+'} {item.sumPrice.toFixed(2)}</Text>
                        </View>
                    </View>;
                }}
            />
        </View >;
    }
}


const styles = StyleSheet.create({
    items: {
    },
    itemWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ddd'
    },
    itemTitle: {
        color: '#666'
    },
    toRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        fontSize: 14
    },
    inColor: {
        color: 'rgba(255, 101, 0, 0.86)'
    },
    outColor: {
        color: 'rgba(72, 204, 85, 0.7)'
    },
    itemCont: {
        marginLeft: 8,
        color: '#444'
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
        saveUsrData: (data) => dispatch(actions.saveUsrData({ usrData: data })),
        saveAllData: (data) => dispatch(actions.saveAllData({ allData: data }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SumRecord);
