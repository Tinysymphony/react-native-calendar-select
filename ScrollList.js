/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import Moment from 'moment';
import styles from './CalendarStyle';
import Month from './Month';

export default class ScrollList extends Component {
  constructor (props) {
    super(props);
    this._monthList = this._getMonthList();
  }
  shouldComponentUpdate () {
    // return ['minDate', 'maxDate'].reduce((prev, next) => {
    //   if (prev || nextProps[next] !== this.props[next]) return true;
    //   return prev;
    // }, false);
    return false;
  }
  _getMonthList () {
    let minDate = this.props.minDate.clone();
    let maxDate = this.props.maxDate.clone();
    let monthList = [];
    if (!maxDate || !minDate) return monthList;
    while (maxDate > minDate || (
      maxDate.year() === minDate.year() &&
      maxDate.month() === minDate.month()
    )) {
       monthList.push(minDate.format('YYYY-MM'));
       minDate.add(1,'month');
    }
    return monthList;
  }
  render () {
    console.log('render scroll list');
    return (
      <ScrollView style={styles.scrollArea}>
        {this._getMonthList().map((item, index) =>
          <Month
            key={'month' + index}
            timeStr={item}
            {...this.props}
            />
        )}
      </ScrollView>
    );
  }
}
