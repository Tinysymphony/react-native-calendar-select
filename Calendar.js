/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';
import styles from './CalendarStyle';
import { customStylesProvider } from './CustomStylesProvider';
import MonthList from './MonthList';
const ICON = {
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADGklEQVR4Xu3b3XXTMBTAcV1Leu8I3YAyAWECygSlE9BOQJmAdAK6QWGCphNQNmAE+mzZl6Mc5xzXtiLJ1r0STfLqJM3/Z9muPwTiwF9w4P3iCHAcAQ4BRDxt2/aDEOKkqqqfAPD0P2EZYy6EEJ/sbwaATVVVtwDwd9gwuQkYY+wHv9n43QcQca21vi4dARFPmqa5F0Ks+r8VEZ+UUu+HCCMAu+abpvnVj+990Z1S6rJUBBtvjHkAgLOp34iIX7XWN/1lI4Cmaa4Q0a5916tIBF+8jUHER631i5ExAqjr+gYAvnjWclEIIfHBAIh41m0CvpFeBEJofBdzqZS627sJ2IV1Xa8B4LNPQAiRFSEmfmr4b48QrkhjjJWyhxLfKwtCZPxvpdQq+DC4Ky4VIVX83hFQKkLK+CAA+6ZSRkLq+GCAEhAo4qMAciJQxUcD5ECgjJ8FwIlAHT8bgAOBI34RACUCV/xiAAoEzvgkACkRuOOTAaRAyBGfFGAJQq745ABzEHLGkwDEItgLMK5reP3zcER0ntL6ztf3LSe7MRJxAuX9/VTxZCNgxqm0E4EynhwgcnMYIVDHswDMReCIZwOIReCKZwOIOdR12wHbhVayo8Bug54Rv/soCwIpwIJ4NgQygATxLAgkAAnjyRGSA8TE27199+BFtjtQSQFi43e3qyL+bU6+Y0wGMDd+xr/NSRGSACyNz4mwGCBVfC6ERQCp43MgzAagiudGmAVAHc+JEA3AFc+FEAXAHc+BEAyQK54aIQggdzwlgheglHgqhL0ApcVTIDgBSo1PjTAJUHp8SgTXfIGH4fP2U3cuOK/euu6chJ5KI+Kt1vpq+D0jgG6yxHfnrZpuQQnxsSNBSvl2OPNl6nH5DQC82wdQUnwMAgBcSynX/bZogBLjIxA+KqV++ACcEyZKjg9AeJZSnobMGbLzbuxm8KYvZZ+3V0qdTz1y7ttfcC+fmO/wjIjnWuuNdydo39AdBu0eczu/BgDsdbgXMy24o2L/nn3wom3bFSL+kVLaFTqaMrdti/3i1/b+I8BrW6OxPQc/Av4BDSZYbnPWwJkAAAAASUVORK5CYII='
};
export default class Calendar extends Component {
  static propTypes = {
    format: PropTypes.string,
    customI18n: PropTypes.object,
    customStyles: PropTypes.object,
    dateRangeValidator: PropTypes.object,
    color: PropTypes.object,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  }
  static defaultProps = {
    format: 'YYYY-MM-DD',
    customI18n: {},
    customStyles: {},
    dateRangeValidator: null,
    color: {}
  }
  static DEFAULT_I18N_MAP = {
    'firstWeekday': 7,
    'w': ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    'weekday': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'text': {
      'start': 'Start',
      'end': 'End',
      'date': 'Date',
      'save': 'Save',
      'clear': 'Reset'
    },
    'date': 'DD / MM'
  }
  constructor (props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    this._today = Moment();
    this._year = this._today.year();
    this._i18n = this._i18n.bind(this);
    this._getDateRange = this._getDateRange.bind(this);
    this._onChoose = this._onChoose.bind(this);
    this._resetCalendar = this._resetCalendar.bind(this);
    this._getFirstWeekday = this._getFirstWeekday.bind(this);
    this.close = this.close.bind(this);
    this.cancel = this.cancel.bind(this);
    this.open = this.open.bind(this);
    this.clear = this.clear.bind(this);
    this.confirm = this.confirm.bind(this);
    this._getDateRange();
  }
  componentDidMount () {
    this._resetCalendar();
  }
  _i18n (data, type) {
    const {
      customI18n
    } = this.props;
    if (~['w', 'weekday', 'text'].indexOf(type)) {
      return (customI18n[type] || {})[data] || Calendar.DEFAULT_I18N_MAP[type][data];
    }
    if (type === 'date') {
      return data.format(customI18n[type] || Calendar.DEFAULT_I18N_MAP[type]);
    }
  }
  _resetCalendar () {
    const {
      startDate,
      endDate,
      format
    } = this.props;
    let start = Moment(startDate, format);
    let end = Moment(endDate, format);
    let isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate;
    let isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate;
    this.setState({
      startDate: isStartValid ? start : null,
      startDateText: isStartValid ? this._i18n(start, 'date') : '',
      startWeekdayText: isStartValid ? this._i18n(this._getIsoWeekdayForI18n(start), 'weekday') : '',
      endDate: isEndValid ? end: null,
      endDateText: isEndValid ? this._i18n(end, 'date') : '',
      endWeekdayText: isEndValid ? this._i18n(this._getIsoWeekdayForI18n(end), 'weekday') : ''
    });
  }
  _getIsoWeekdayForI18n (day) {
    return day.isoWeekday() - 1;
  }
  _getDateRange () {
    const {
      maxDate,
      minDate,
      format
    } = this.props;
    let max = Moment(maxDate, format);
    let min = Moment(minDate, format);
    let maxValid = max.isValid();
    let minValid = min.isValid();
    if (!maxValid && !minValid) {
      max = Moment().add(3, 'months');
      min = Moment();
    }
    if (!maxValid && minValid) {
      max = min.add(3, 'months');
    }
    if (maxValid && !minValid) {
      min = max.subtract(3, 'months');
    }
    if (min.isSameOrAfter(max)) return {};
    this._minDate = min;
    this._maxDate = max;
  }
  _onChoose (day) {
    const {
      startDate,
      endDate
    } = this.state;
    if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
      this.setState({
        startDate: day,
        endDate: null,
        startDateText: this._i18n(day, 'date'),
        startWeekdayText: this._i18n(this._getIsoWeekdayForI18n(day), 'weekday'),
        endDateText: '',
        endWeekdayText: '',
      });
    } else if (startDate && !endDate && day > startDate) {
      this.setState({
        endDate: day,
        endDateText: this._i18n(day, 'date'),
        endWeekdayText: this._i18n(this._getIsoWeekdayForI18n(day), 'weekday')
      });
    }
  }
  _getFirstWeekday () {
    let defaultFirstWeekday = Calendar.DEFAULT_I18N_MAP['firstWeekday'];
    let firstWeekday = this.props.customI18n['firstWeekday'] || defaultFirstWeekday;
    return ((firstWeekday <= 7) ? firstWeekday : defaultFirstWeekday);
  }
  _getWeeknums () {
    let firstWeekday = this._getFirstWeekday();
    if (firstWeekday > 7) {
      firstWeekday = Calendar.DEFAULT_I18N_MAP['firstWeekday'];;
    }
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(firstWeekday - 1);
      firstWeekday++;
      if (firstWeekday > 7) {
        firstWeekday = 1;
      }
    }
    return days;
  }
  cancel () {
    this.close();
    this._resetCalendar();
  }
  close () {
    this.setState({
      isModalVisible: false
    });
  }
  open () {
    this.setState({
      isModalVisible: true
    });
  }
  clear () {
    this.setState({
      startDate: null,
      endDate: null,
      startDateText: '',
      startWeekdayText: '',
      endDateText: '',
      endWeekdayText: ''
    });
  }
  confirm () {
    const {
      startDate,
      endDate
    } = this.state;
    let startMoment = startDate ? startDate.clone() : null;
    let endMoment = endDate ? endDate.clone() : null;
    if (startMoment != null && endMoment != null && this.props.dateRangeValidator != null) {
      const daysBetween = endMoment.diff(startMoment, 'days');
      if (daysBetween < (this.props.dateRangeValidator.minDaysBetween || 1)
       || daysBetween > (this.props.dateRangeValidator.maxDaysBetween || 30)) {
        Alert.alert(
          this.props.dateRangeValidator.msg || 'Invalid range'
        );
        return false;
      }
    }
    this.props.onConfirm && this.props.onConfirm({
      startDate: startMoment ? startMoment.toDate() : null,
      endDate: endMoment ? endMoment.toDate() : null,
      startMoment,
      endMoment
    });
    this.close();
  }
  render () {
    const {
      startDate,
      endDate,
      startDateText,
      startWeekdayText,
      endDateText,
      endWeekdayText
    } = this.state;
    const {
      mainColor = '#15aaaa',
      subColor = '#fff',
      borderColor = 'rgba(255, 255, 255, 0.50)'
    } = this.props.color;
    const {
      customI18n,
      customStyles
    } = this.props;
    let color = {mainColor, subColor, borderColor};
    let mainBack = {backgroundColor: mainColor};
    let subBack = {backgroundColor: subColor};
    let mainFontColor = {color: mainColor};
    let subFontColor = {color: subColor};
    let isValid = !startDate || endDate;
    let isClearVisible = startDate || endDate;
    return (
      <Modal
        animationType={'slide'}
        visible={this.state.isModalVisible}
        onRequestClose={this.close}>
        <View style={[styles.container, mainBack]}>
          <View style={styles.ctrl}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.cancel}
              >
              <Image
                style={styles.closeIcon}
                source={{uri: ICON.close}}
                resizeMode="cover"/>
            </TouchableHighlight>
            {isClearVisible && <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0.8}
              onPress={this.clear}>
              <Text style={[styles.clearText, subFontColor, customStylesProvider(customStyles, 'clearText')]}>{this._i18n('clear', 'text')}</Text>
            </TouchableHighlight>}
          </View>
          <View style={styles.result}>
            <View style={styles.resultPart}>
              <Text style={[styles.resultText, styles.startText, subFontColor, customStylesProvider(customStyles, 'selectedDate')]}>
                {startDateText || this._i18n('start', 'text')}
              </Text>
              <Text style={[styles.resultText, styles.startText, subFontColor, customStylesProvider(customStyles, 'selectedDateDayName')]}>
                {startWeekdayText || this._i18n('date', 'text')}
              </Text>
            </View>
            <View style={[styles.resultSlash, subBack]}/>
            <View style={styles.resultPart}>
              <Text style={[styles.resultText, styles.endText, subFontColor, customStylesProvider(customStyles, 'selectedDate')]}>
                {endDateText || this._i18n('end', 'text')}
              </Text>
              <Text style={[styles.resultText, styles.endText, subFontColor, customStylesProvider(customStyles, 'selectedDateDayName')]}>
                {endWeekdayText || this._i18n('date', 'text')}
              </Text>
            </View>
          </View>
          <View style={styles.week}>
            {this._getWeeknums().map(item =>
              <Text style={[styles.weekText, subFontColor, customStylesProvider(customStyles, 'weekDay')]}　key={item}>{this._i18n(item, 'w')}</Text>
            )}
          </View>
          <View style={[styles.scroll, {borderColor}]}>
            <MonthList
              today={this._today}
              firstWeekday={this._getFirstWeekday()}
              minDate={this._minDate}
              maxDate={this._maxDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChoose={this._onChoose}
              customI18n={customI18n}
              customStyles={customStyles}
              color={color}
            />
          </View>
          <View style={[styles.btn, customStylesProvider(customStyles, 'confirmBtnWrapper')]}>
            {isValid ?
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.45)"
                style={[styles.confirmContainer, customStylesProvider(customStyles, 'confirmBtn')]}
                onPress={this.confirm}>
                <View style={styles.confirmBtn}>
                  <Text
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, subFontColor, customStylesProvider(customStyles, 'confirmBtnText')]}>
                    {this._i18n('save', 'text')}
                  </Text>
                </View>
              </TouchableHighlight> :
              <View style={[styles.confirmContainer, styles.confirmContainerDisabled, customStylesProvider(customStyles, 'confirmBtn')]}>
                <View style={styles.confirmBtn}>
                  <Text
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, styles.confirmTextDisabled, customStylesProvider(customStyles, 'confirmBtnText')]}>
                    {this._i18n('save', 'text')}
                  </Text>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }
}
