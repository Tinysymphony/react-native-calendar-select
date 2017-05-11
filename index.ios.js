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
    this.openCalendar = this.openCalendar.bind(this)
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
          minDate="20170502"
          maxDate="20170712"
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
