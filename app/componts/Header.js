import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import DatePicker from './DatePicker';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }
    }
    onDateChange(dateStr) {
        let ymd = dateStr.split('-');
        this.setState({
            year: ymd[0],
            month: +ymd[1]
        });
        this.props.onChange(+ymd[0], +ymd[1]);
    }
    render() {
        return <View style={styles.root}>
            <View style={styles.year}>
                <Text style={styles.title}>{this.state.year}年</Text>
                <View style={styles.yearWordShow}>
                    <Text style={styles.wordMonth1}>{this.state.month}</Text>
                    <Text style={styles.wordMonth2}>月</Text>
                    <Icon style={styles.yearIcon} name="md-arrow-dropdown" size={18} color='#fff' />
                    <DatePicker style={styles.datePicker} onChange={this.onDateChange.bind(this)} />
                </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.expenditure}>
                <Text style={styles.title}>支出(元)</Text>
                <Text style={styles.word}>{this.props.mOut.toFixed(2)}</Text>
            </View>
            <View style={styles.income}>
                <Text style={styles.title}>收入(元)</Text>
                <Text style={styles.word}>{this.props.mIn.toFixed(2)}</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#3e9ce9'
    },
    year: {
        flex: 0.6,
        paddingLeft: 30
    },
    line: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 0.3,
        borderStyle: 'dashed',
        borderColor: '#fff'
    },
    expenditure: {
        flex: 1.2
    },
    income: {
        flex: 1.3
    },
    title: {
        height: 20,
        color: '#ddd',
        fontSize: 12
    },
    word: {
        color: '#fff',
        fontSize: 16
    },
    yearWordShow: {
        flexDirection: 'row'
    },
    wordMonth1: {
        color: '#fff',
        fontSize: 20
    },
    wordMonth2: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 24
    },
    yearIcon: {},
    datePicker: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0
    }
});

const mapStateToProps = (state) => {
    const { read } = state;
    return {
        read
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
