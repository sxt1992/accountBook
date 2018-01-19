import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sW: '好名字可以让你朋友更容易记住你',
            dV: '帅小陶'
        };
    }
    render() {
        return <View style={styles.root}>
                    <View style={styles.border}>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            defaultValue={this.state.dV}
                            placeholder='输入内容'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {}}
                          />
                    </View>
                    <Text style={styles.showWord}>{this.state.sW}</Text>
            </View>;
    }
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
    },
    border: {
        marginTop: 10,
        marginLeft: '3%',
        marginRight: '3%',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#ccc'
    },
    input: {
        height: 30,
        marginLeft: 8,
        fontSize: 14
    },
    showWord: {
        marginTop: 8,
        marginLeft: '4%',
        color: '#666'
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


export default connect(mapStateToProps, mapDispatchToProps)(Edit);