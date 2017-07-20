/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';
import styles from './style';
import Day from '../Day';

export default class Month extends Component {
  constructor (props) {
    super(props);
    this._getDayList = this._getDayList.bind(this);
    this._renderDayRow = this._renderDayRow.bind(this);
    this._getMonthText = this._getMonthText.bind(this);
  }
  static DEFAULT_I18N_MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  _getMonthText () {
    const {
      month,
      today,
      customI18n
    } = this.props;
    let y = month.year();
    let m = month.month();
    let year = today.year();
    let monthNames = Month.DEFAULT_I18N_MONTH_NAMES;
    if (customI18n && customI18n['m']) {
      monthNames = customI18n['m'];
    }
    if (year === y) {
      return monthNames[m] || Month.DEFAULT_I18N_MONTH_NAMES[m];
    } else {
      return `${monthNames[m] || Month.DEFAULT_I18N_MONTH_NAMES[m]}, ${y}`;
    }
  }
  _getDayList (date) {
    let dayList;
    let month = date.month();
    let weekday = date.isoWeekday();
    if (weekday === 7) {
      dayList = [];
    } else {
      dayList = new Array(weekday).fill({
        empty: date.clone().subtract(1, 'h')
      });
    }
    while (date.month() === month) {
      dayList.push({
        date: date.clone()
      });
      date.add(1, 'days');
    }
    date.subtract(1, 'days');
    weekday = date.isoWeekday();
    if (weekday === 7) {
      return dayList.concat(new Array(6).fill({
        empty: date.clone().hour(1)
      }));
    }
    return dayList.concat(new Array(Math.abs(weekday - 6)).fill({
      empty: date.clone().hour(1)
    }));
  }
  _renderDayRow (dayList, index) {
    const {
      startDate,
      endDate,
      today
    } = this.props;
    return (
      <View style={styles.dayRow} key={'row' + index}>
        {dayList.map((item, i) =>
          <Day
            date={item.date}
            empty={item.empty}
            {...this.props}
            key={'day' + i}/>
        )}
      </View>
    );
  }
  render () {
    const {
      month,
      today,
      color
    } = this.props;
    let subColor = {color: color.subColor};
    let titleText = this._getMonthText();
    let dayList = this._getDayList(month.clone());
    let rowArray = new Array(dayList.length / 7).fill('');
    return (
      <View style={styles.month}>
        <View style={styles.monthTitle}>
          <Text style={[styles.monthTitleText, subColor]}>{titleText}</Text>
        </View>
        <View style={styles.days}>
          {rowArray.map((item, i) =>
            this._renderDayRow(dayList.slice(i * 7, i * 7 + 7), i)
          )}
        </View>
      </View>
    );
  }
}
