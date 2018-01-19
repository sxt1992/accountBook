import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  constructor(props){
    super(props);
    let t = new Date();
    this.state = {date: t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()}
  }

  render(){
    return (
      <DatePicker
        style={this.props.style}
        date={this.state.date}
        mode="date"
        placeholder="select date"
       
        showIcon={this.props.showIcon ? true : false}
        androidMode='spinner'
        confirmBtnText="确定"
        cancelBtnText="取消"
        customStyles={{
            dateIcon: {
                // position: 'absolute',
                // left: 0,
                // top: 4,
                // marginLeft: 0
            },
            dateInput: {
                borderWidth: 0
            }
        }}
        onDateChange={date => {
            this.setState({date: date});
            if(this.props.onChange){
                this.props.onChange(date);
            }
        }}
      />
    )
  }
}