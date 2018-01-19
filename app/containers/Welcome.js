import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated, Easing, Dimensions, StyleSheet, Image, Text, View } from 'react-native';
import store from '../dataStorage/storage';
import NavigationUtil from '../util/NavigationUtil';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const welcomeImg = require('../images/horse.png');


class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1)
    }
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    Animated.timing(this.state.scale, {
      toValue: 1.2, // 目标值
      duration: 1000, // 动画时间
      easing: Easing.linear // 缓动函数
    }).start();
    this.timer = setTimeout(() => {
      store.get('isInit').then((isInit) => {
        console.log(isInit);
      }).catch(err => {
        console.log(err);
      });
      NavigationUtil.reset(this.props.navigation, 'HOME');
    }, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return <View style={styles.wrap} >
      <Animated.Image
        source={welcomeImg}
        style={[styles.logo, {
          transform: [{ scale: this.state.scale }]
        }]}
      />
      <Animated.Text
        style={[styles.word, {
          transform: [{ scale: this.state.scale }]
        }]}
      >黄桃记账</Animated.Text>
    </ View>;
  }
}


const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: maxWidth,
    height: maxHeight,
    backgroundColor: '#01adff',
  },
  logo: {
    width: 200,
    height: 200
  },
  word: {
    marginTop: 50,
    color: '#fff',
    fontSize: 30,
  },
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


export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
