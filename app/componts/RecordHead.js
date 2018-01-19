import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';


class RecordHead extends React.Component {
    render() {
        return <Text>详情</Text>;
    }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(RecordHead);