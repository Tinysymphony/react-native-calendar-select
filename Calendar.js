/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';
import styles from './CalendarStyle';
import MonthList from './MonthList';
const ICON = {
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADGklEQVR4Xu3b3XXTMBTAcV1Leu8I3YAyAWECygSlE9BOQJmAdAK6QWGCphNQNmAE+mzZl6Mc5xzXtiLJ1r0STfLqJM3/Z9muPwTiwF9w4P3iCHAcAQ4BRDxt2/aDEOKkqqqfAPD0P2EZYy6EEJ/sbwaATVVVtwDwd9gwuQkYY+wHv9n43QcQca21vi4dARFPmqa5F0Ks+r8VEZ+UUu+HCCMAu+abpvnVj+990Z1S6rJUBBtvjHkAgLOp34iIX7XWN/1lI4Cmaa4Q0a5916tIBF+8jUHER631i5ExAqjr+gYAvnjWclEIIfHBAIh41m0CvpFeBEJofBdzqZS627sJ2IV1Xa8B4LNPQAiRFSEmfmr4b48QrkhjjJWyhxLfKwtCZPxvpdQq+DC4Ky4VIVX83hFQKkLK+CAA+6ZSRkLq+GCAEhAo4qMAciJQxUcD5ECgjJ8FwIlAHT8bgAOBI34RACUCV/xiAAoEzvgkACkRuOOTAaRAyBGfFGAJQq745ABzEHLGkwDEItgLMK5reP3zcER0ntL6ztf3LSe7MRJxAuX9/VTxZCNgxqm0E4EynhwgcnMYIVDHswDMReCIZwOIReCKZwOIOdR12wHbhVayo8Bug54Rv/soCwIpwIJ4NgQygATxLAgkAAnjyRGSA8TE27199+BFtjtQSQFi43e3qyL+bU6+Y0wGMDd+xr/NSRGSACyNz4mwGCBVfC6ERQCp43MgzAagiudGmAVAHc+JEA3AFc+FEAXAHc+BEAyQK54aIQggdzwlgheglHgqhL0ApcVTIDgBSo1PjTAJUHp8SgTXfIGH4fP2U3cuOK/euu6chJ5KI+Kt1vpq+D0jgG6yxHfnrZpuQQnxsSNBSvl2OPNl6nH5DQC82wdQUnwMAgBcSynX/bZogBLjIxA+KqV++ACcEyZKjg9AeJZSnobMGbLzbuxm8KYvZZ+3V0qdTz1y7ttfcC+fmO/wjIjnWuuNdydo39AdBu0eczu/BgDsdbgXMy24o2L/nn3wom3bFSL+kVLaFTqaMrdti/3i1/b+I8BrW6OxPQc/Av4BDSZYbnPWwJkAAAAASUVORK5CYII='
};
export default class Calendar extends Component {
  static propTypes = {
    i18n: PropTypes.string,
    format: PropTypes.string,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  }
  static defaultProps = {
    format: 'YYYY-MM-DD',
    i18n: 'en'
  }
  static I18N_MAP = {
    'zh': {
      'w': ['', '一', '二', '三', '四', '五', '六', '日'],
      'weekday': ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      'text': {
        'start': '开 始',
        'end': '结 束',
        'date': '日 期',
        'save': '保 存',
        'clear': '清除'
      }
    },
    'en': {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'Start',
        'end': 'End',
        'date': 'Date',
        'save': 'Save',
        'clear': 'Reset'
      }
    },
    'jp': {
      'w': ['', '月', '火', '水', '木', '金', '土', '日'],
      'weekday': ['', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
      'text': {
        'start': 'スタート',
        'end': '終わり',
        'date': '時　間',
        'save': '確　認',
        'clear': 'クリア'
      }
    }
  }
  constructor (props) {
    super(props);
    const {
      startDate,
      endDate,
      format
    } = this.props;
    let start = Moment(startDate, format);
    let end = Moment(endDate, format);
    this.state = {
      isModalVisible: false,
      startDate: start.isValid() ? start : null,
      endDate: end.isValid() ? end: null
    };
    this._today = Moment();
    this._year = this._today.year();
    this._i18n = this._i18n.bind(this);
    this._getDayList = this._getDayList.bind(this);
    this._getDateRange = this._getDateRange.bind(this);
    this._onChoose = this._onChoose.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.clear = this.clear.bind(this);
    this.confirm = this.confirm.bind(this);
    this._getDateRange();
  }
  _i18n (data, type) {
    const {
      i18n
    } = this.props;
    if (~['w', 'weekday', 'text'].indexOf(type)) {
      return Calendar.I18N_MAP[i18n][type][data];
    }
    if (type === 'date') {
      if (i18n === 'zh' || i18n === 'jp') {
        return data.month() + 1 + '月' + data.date() + '日';
      }
      if (i18n === 'en') {
        return data.format('DD / MM');
      }
    }
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
  _getDayList (date) {
    let dayList;
    let month = date.month();
    let weekday = date.isoWeekday();
    if (weekday === 7) {
      dayList = [];
    } else {
      dayList = new Array(weekday).fill('');
    }
    while(date.month() === month) {
      dayList.push(date.clone());
      date.add(1, 'days');
    }
    date.subtract(1, 'days');
    weekday = date.isoWeekday();
    if (weekday === 7) {
      return dayList.concat(new Array(6).fill(''));
    }
    return dayList.concat(new Array(Math.abs(weekday - 6)).fill(''));
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
        startWeekdayText: this._i18n(day.isoWeekday(), 'weekday'),
        endDateText: '',
        endWeekdayText: '',
      });
    } else if (startDate && !endDate && day > startDate) {
      this.setState({
        endDate: day,
        endDateText: this._i18n(day, 'date'),
        endWeekdayText: this._i18n(day.isoWeekday(), 'weekday')
      });
    }
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
    this.props.onConfirm && this.props.onConfirm(
      this.state.startDate, this.state.endDate
    );
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
    let isValid = startDate && endDate;
    let isClearVisible = startDate || endDate;
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.isModalVisible}
        onRequestClose={this.close}>
        <View style={styles.container}>
          <View style={styles.ctrl}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.close}
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
              <Text style={styles.clearText}>{this._i18n('clear', 'text')}</Text>
            </TouchableHighlight>}
          </View>
          <View style={styles.result}>
            <View style={styles.resultPart}>
              <Text style={[styles.resultText, styles.startText]}>
                {startDateText || this._i18n('start', 'text')}
              </Text>
              <Text style={[styles.resultText, styles.startText]}>
                {startWeekdayText || this._i18n('date', 'text')}
              </Text>
            </View>
            <View style={styles.resultPart}>
              <Text style={[styles.resultText, styles.endText]}>
                {endDateText || this._i18n('end', 'text')}
              </Text>
              <Text style={[styles.resultText, styles.endText]}>
                {endWeekdayText || this._i18n('date', 'text')}
              </Text>
            </View>
          </View>
          <View style={styles.week}>
            {[7, 1, 2, 3, 4, 5, 6].map(item =>
              <Text style={styles.weekText}　key={item}>{this._i18n(item, 'w')}</Text>
            )}
          </View>
          <View style={styles.scroll}>
            <MonthList
              today={this._today}
              minDate={this._minDate}
              maxDate={this._maxDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChoose={this._onChoose}
              i18n={this.props.i18n}
            />
          </View>
          <View style={styles.btn}>
            {isValid ?
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.45)"
                style={styles.confirmContainer}
                onPress={this.confirm}>
                <View style={styles.confirmBtn}>
                  <Text style={styles.confirmText}>{this._i18n('save', 'text')}</Text>
                </View>
              </TouchableHighlight> :
              <View style={[styles.confirmContainer, styles.confirmContainerDisabled]}>
                <View style={styles.confirmBtn}>
                  <Text style={[styles.confirmText, styles.confirmTextDisabled]}>{this._i18n('save', 'text')}</Text>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }
}
