/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';
import styles from './style';

export default class Day extends Component {
  static propTypes = {
    onChoose: PropTypes.func
  }
  constructor (props) {
    super(props);
    this._chooseDay = this._chooseDay.bind(this);
    this._statusCheck = this._statusCheck.bind(this);
    this._statusCheck();
  }
  _chooseDay () {
    this.props.onChoose && this.props.onChoose(this.props.date);
  }
  _statusCheck (props) {
    const {
      startDate,
      endDate,
      today,
      date = null,
      minDate,
      maxDate,
      empty
    } = props || this.props;
    this.isToday = today.isSame(date, 'd');
    this.isValid = date &&
      (date >= minDate || date.isSame(minDate, 'd')) &&
      (date <= maxDate || date.isSame(maxDate, 'd'));
    this.isMid = date > startDate && date < endDate ||
      (!date && empty >= startDate && empty <= endDate);
    this.isStart = date && date.isSame(startDate, 'd');
    this.isStartPart = this.isStart && endDate;
    this.isEnd = date && date.isSame(endDate, 'd');
    this.isFocus = this.isMid || this.isStart || this.isEnd;
    return this.isFocus;
  }
  shouldComponentUpdate (nextProps) {
    let prevStatus = this.isFocus;
    let nextStatus = this._statusCheck(nextProps);
    if (prevStatus || nextStatus) return true;
    return false;
  }
  render () {
    const {
      date,
      color
    } = this.props;
    let text = date ? date.date() : '';
    let mainColor = {color: color.mainColor};
    let subColor = {color: color.subColor};
    let mainBack = {backgroundColor: color.mainColor};
    let subBack = {backgroundColor: color.subColor};
    return (
      <View
        style={[
          styles.dayContainer,
          this.isMid && subBack,
          this.isStartPart && styles.startContainer,
          this.isEnd && styles.endContainer,
          (this.isStartPart || this.isEnd) && subBack
        ]}>
        {this.isValid ?
          <TouchableHighlight
            style={[styles.day, this.isToday && styles.today, this.isFocus && subBack]}
            underlayColor="rgba(255, 255, 255, 0.35)"
            onPress={this._chooseDay}>
            <Text style={[styles.dayText, subColor, this.isFocus && mainColor]}>{text}</Text>
          </TouchableHighlight> :
          <View style={[styles.day, this.isToday && styles.today]}>
            <Text style={styles.dayTextDisabled}>{text}</Text>
          </View>
        }
      </View>
    );
  }
}
