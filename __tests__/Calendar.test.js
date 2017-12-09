/* eslint-disable */

import {
  View,
  Text,
  Easing,
  Dimensions
} from 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Moment from 'moment';

import Calendar from '../Calendar';
import Day from '../Day';
import Month from '../Month';
import MonthList from '../MonthList';

Enzyme.configure({
  adapter: new Adapter()
});

const shallow = Enzyme.shallow;

let start = {};
let end = {};
let color = {
  mainColor: '#15aaaa',
  subColor: '#fff',
  borderColor: 'rgba(255, 255, 255, 0.50)'
};

let cal = shallow(
  <Calendar
    i18n="en"
    ref="cal"
    format="YYYYMMDD"
    minDate="20161210"
    maxDate="20171104"
    startDate="20170512"
    endDate="20170520"
    onConfirm={({startDate, endDate}) => {start = startDate; end = endDate;}}
  />
);

let invalidDateCalA = shallow(
  <Calendar
    minDate="aaa"
    maxDate="2016-10-04"
  />
);

let invalidDateCalB = shallow(
  <Calendar
    minDate="2016-12-10"
    maxDate="cccc"
  />
);

let invalidDateCalC = shallow(
  <Calendar
    minDate="gg"
    maxDate="bb"
  />
);

test('It renders calendar correctly', done => {
  let instance = cal.instance();
  expect(cal.state('isModalVisible')).toEqual(false);
  instance.componentDidMount();
  expect(instance._minDate.isSame(Moment('20161210', 'YYYYMMDD'))).toEqual(true);
  expect(instance._maxDate.isSame(Moment('20171104', 'YYYYMMDD'))).toEqual(true);
  instance.open();
  expect(cal.state('isModalVisible')).toEqual(true);
  expect(cal.state('startDate').isSame(Moment('20170512', 'YYYYMMDD'))).toEqual(true);
  expect(cal.state('endDate').isSame(Moment('20170520', 'YYYYMMDD'))).toEqual(true);
  expect(cal.state('startDateText')).toEqual('12 / 05');
  expect(cal.state('endDateText')).toEqual('20 / 05');
  expect(cal.state('startWeekdayText')).toEqual('Friday');
  expect(cal.state('endWeekdayText')).toEqual('Saturday');
  instance.clear();
  expect(cal.state('startDate')).toEqual(null);
  expect(cal.state('endDate')).toEqual(null);
  expect(cal.state('startDateText')).toEqual('');
  expect(cal.state('endDateText')).toEqual('');
  expect(cal.state('startWeekdayText')).toEqual('');
  expect(cal.state('endWeekdayText')).toEqual('');
  instance.confirm();
  expect(cal.state('isModalVisible')).toEqual(false);
  expect(start).toEqual(null);
  expect(end).toEqual(null);
  instance.open();
  instance._onChoose(Moment('20170412', 'YYYYMMDD'));
  expect(cal.state('startDate').isSame(Moment('20170412', 'YYYYMMDD'))).toEqual(true);
  instance._onChoose(Moment('20170410', 'YYYYMMDD'));
  expect(cal.state('startDate').isSame(Moment('20170410', 'YYYYMMDD'))).toEqual(true);
  instance._onChoose(Moment('20170502', 'YYYYMMDD'));
  expect(cal.state('endDate').isSame(Moment('20170502', 'YYYYMMDD'))).toEqual(true);
  instance.cancel();
  done();
});

test('It renders calendar correctly when min & max Date is incorrect.', done => {
  let instanceA = invalidDateCalA.instance();
  let instanceB = invalidDateCalB.instance();
  let instanceC = invalidDateCalC.instance();
  done();
});

let startDate = Moment('20170811', 'YYYYMMDD');
let endDate = Moment('20170914', 'YYYYMMDD');
let minDate = Moment('20170302', 'YYYYMMDD');
let maxDate = Moment('20180122', 'YYYYMMDD');
let today = Moment('20170801', 'YYYYMMDD');

let monthList = shallow(
  <MonthList
    today={today}
    minDate={minDate}
    maxDate={maxDate}
    startDate={startDate}
    endDate={endDate}
    i18n="en"
    onChoose={() => {}}
    color={color}
  />
);

test('It renders MonthList correctly', done => {
  let instance = monthList.instance();
  instance.componentDidMount();
  instance._shouldUpdate({date: Moment('20170519', 'YYYYMMDD')}, {
    startDate,
    endDate
  });
  instance._shouldUpdate({date: Moment('20170819', 'YYYYMMDD')}, {
    startDate,
    endDate
  });
  instance.componentWillReceiveProps({
    startDate,
    endDate,
    minDate,
    maxDate
  });
  instance.componentWillReceiveProps({
    startDate: startDate.clone().subtract(1, 'days'),
    endDate: endDate.clone().add(1, 'days'),
    minDate,
    maxDate
  });
  var month = instance._renderMonth({
    date: Moment('20170819', 'YYYYMMDD')
  });
  done();
});

let month = shallow(
  <Month
    i18n="en"
    month={Moment('20170801', 'YYYYMMDD')}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
  />
);

let monthAnotherYear = shallow(
  <Month
    i18n="en"
    month={Moment('20180101', 'YYYYMMDD')}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
  />
);

let jpMonth = shallow(
  <Month
    i18n="jp"
    month={Moment('20180101', 'YYYYMMDD')}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
  />
);

test('It renders Month correctly', done => {
  let instance = month.instance();
  let anthorInstance = monthAnotherYear.instance();
  let jpInstance = jpMonth.instance();
  done();
});

let dateOut = Moment('20170712', 'YYYYMMDD');
let dateStart = Moment('20170811', 'YYYYMMDD');
let dateEnd = Moment('20170914', 'YYYYMMDD');
let dateMid = Moment('20170910', 'YYYYMMDD');
let dateChoose = null;

let dayOut = shallow(
  <Day
    i18n="en"
    date={dateOut}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
    onChoose={(date) => {dateChoose = date;}}
  />
);

let dayStart = shallow(
  <Day
    i18n="en"
    date={dateStart}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
  />
);

let dayEnd = shallow(
  <Day
    i18n="en"
    date={dateEnd}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
  />
);

let dayMid = shallow(
  <Day
    i18n="en"
    date={dateMid}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
  />
);

let dayEmpty = shallow(
  <Day
    i18n="en"
    date={null}
    empty={Moment('20170901', 'YYYYMMDD')}
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    today={today}
    color={color}
  />
);

test('It renders Day correctly', done => {
  let instanceOut = dayOut.instance();
  instanceOut._chooseDay();
  expect(dateChoose.isSame(dateOut));
  instanceOut.shouldComponentUpdate({
    startDate: startDate.clone().subtract(1, 'days'),
    endDate,
    minDate,
    maxDate,
    today,
    date: dateOut
  });
  let instanceStart = dayStart.instance();
  instanceStart.shouldComponentUpdate({
    startDate: startDate.clone().subtract(1, 'days'),
    endDate,
    minDate,
    maxDate,
    today,
    date: dateStart
  });
  let instanceEnd = dayEnd.instance();
  let instanceMid = dayMid.instance();
  let instanceEmpty = dayEmpty.instance();
  done();
});
