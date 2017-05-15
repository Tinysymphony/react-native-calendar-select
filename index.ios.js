/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Calendar from './Calendar';

export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.calendar = null;
    this.state = {
      startDate: '20170523',
      endDate: '20170702'
    };
    this.openCalendar = this.openCalendar.bind(this);
    this.confirmDate = this.confirmDate.bind(this);
  }
  confirmDate (startDate, endDate) {
    this.setState({
      startDate,
      endDate
    });
  }
  openCalendar() {
    !!this.calendar && this.calendar.open();
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="press"
          onPress={this.openCalendar}
          />
        <Calendar
          ref={(calendar) => {this.calendar = calendar;}}
          format="YYYYMMDD"
          minDate="20170510"
          maxDate="20180812"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onConfirm={this.confirmDate}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('calendar', () => calendar);
