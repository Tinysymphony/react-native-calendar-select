/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, { Component } from "react"
import { ListView, Dimensions } from "react-native"
import Moment from "moment"
import styles from "./CalendarStyle"
import Month from "./Month"
const { width } = Dimensions.get("window")
export default class MonthList extends Component {
	constructor (props) {
		super(props)
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => {
				return r2.shouldUpdate
			}
		})
		this.monthList = []
		this.state = {
			dataSource: this.ds.cloneWithRows(this._getMonthList())
		}
		this._renderMonth = this._renderMonth.bind(this)
		this._shouldUpdate = this._shouldUpdate.bind(this)
		this._checkRange = this._checkRange.bind(this)
		this._getWeekNums = this._getWeekNums.bind(this)
		this._scrollToSelectedMonth = this._scrollToSelectedMonth.bind(this)
	}
	componentWillReceiveProps (nextProps) {
		const isDateUpdated = ["startDate", "endDate", "minDate", "maxDate"].reduce(
			(prev, next) => {
				if (prev || nextProps[next] !== this.props[next]) {
					return true
				}
				return prev
			},
			false
		)
		if (isDateUpdated) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this._getMonthList(nextProps))
			})
		}
	}
	_renderMonth (month) {
		return <Month month={month.date || {}} {...this.props} />
	}
	_checkRange (date, start, end) {
		if (!date || !start) {
			return false
		}
		if (!end) {
			return date.year() === start.year() && date.month() === start.month()
		}
		if (
			date.year() < start.year() ||
			(date.year() === start.year() && date.month() < start.month())
		) {
			return false
		}
		if (
			date.year() > end.year() ||
			(date.year() === end.year() && date.month() > end.month())
		) {
			return false
		}
		return true
	}
	_shouldUpdate (month, props) {
		if (!props) {
			return false
		}
		const { startDate, endDate } = props
		const { date } = month
		const next = this._checkRange(date, startDate, endDate)
		const prev = this._checkRange(date, this.props.startDate, this.props.endDate)
		if (prev || next) {
			return true
		}
		return false
	}
	_getMonthList (props) {
		const minDate = (props || this.props).minDate.clone().date(1)
		const maxDate = (props || this.props).maxDate.clone()
		const monthList = []
		if (!maxDate || !minDate) {
			return monthList
		}
		while (
			maxDate > minDate || // eslint-disable-line no-unmodified-loop-condition
			(maxDate.year() === minDate.year() && maxDate.month() === minDate.month())
		) {
			const month = {
				date: minDate.clone()
			}
			month.shouldUpdate = this._shouldUpdate(month, props)
			monthList.push(month)
			minDate.add(1, "month")
		}
		return monthList
	}
	_getWeekNums (start, end) {
		const clonedMoment = Moment(start)
		let date
		let day
		let num
		let y
		let m
		let total = 0
		while (!clonedMoment.isSame(end, "months")) {
			y = clonedMoment.year()
			m = clonedMoment.month()
			date = new Date(y, m, 1)
			day = date.getDay()
			num = new Date(y, m + 1, 0).getDate()
			total += Math.ceil((num + day) / 7)
			clonedMoment.add(1, "months")
		}
		return total
	}
	_scrollToSelectedMonth () {
		const { startDate, minDate } = this.props
		const monthOffset =
			12 * (startDate.year() - minDate.year()) + startDate.month() - minDate.month()
		const weekOffset = this._getWeekNums(minDate, startDate)
		setTimeout(() => {
			this.list &&
				this.list.scrollTo({
					x: 0,
					y:
						monthOffset * (24 + 25) +
						(monthOffset ? weekOffset * Math.ceil(width / 7 + 10) : 0),
					animated: true
				})
		}, 400)
	}
	componentDidMount () {
		this.props.startDate && this._scrollToSelectedMonth()
	}
	render () {
		return (
			<ListView
				ref={list => {
					this.list = list
				}}
				style={styles.scrollArea}
				dataSource={this.state.dataSource}
				renderRow={this._renderMonth}
				pageSize={2}
				initialListSize={2}
				showsVerticalScrollIndicator={false}
			/>
		)
	}
}
