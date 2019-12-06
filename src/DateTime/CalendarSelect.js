import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import CommonFn from './commonFn'
import moment from 'moment'
import styles from './styles/CalendarSelectStyles'
import _ from 'lodash'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const width = Dimensions.get('window').width;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

class CalendarSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewMode: 'day'
    }
  }

  renderDay(day) {
    const { calendarMonth, date, warpDayStyle, dateSelectedWarpDayStyle,
      renderChildDay, textDayStyle, currentDayStyle, notCurrentDayOfMonthStyle } = this.props
    const isCurrentMonth = calendarMonth === CommonFn.ym()
    const isCurrent = isCurrentMonth && CommonFn.ymd() === day
    const dateSelected = date && CommonFn.ymd(date) === day
    const notCurrentMonth = day.indexOf(calendarMonth) !== 0
    return (
      <TouchableOpacity onPress={() => this.selectDate(day)}
        style={[styles.warpDay, warpDayStyle,
        dateSelected ? { backgroundColor: '#000', dateSelectedWarpDayStyle } : {}]}
      >
        <View>
          {renderChildDay(day)}
          <Text style={[styles.day, textDayStyle,
          isCurrent ? { color: 'red', ...currentDayStyle } : {},
          notCurrentMonth ? { color: '#493D40', ...notCurrentDayOfMonthStyle } : {}]}>
            {day.split('-')[2]}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  selectDate(date) {
    if (this.isDateEnable(date)) {
      this.props.selectDate(date)
    }
  }

  yearMonthChange(type, unit) {
    let { viewMode, currentYear } = this.state
    if (viewMode === 'day') {
      this.props.calendarChange(type, unit)
    } else {
      this.setState({
        currentYear: currentYear + (type < 0 ? -12 : 12)
      })
    }
  }

  isDateEnable(date) {
    const { minDate, maxDate } = this.props
    return date >= minDate && date <= maxDate
  }

  render() {
    const {
      calendarMonth, renderPrevYearButton, renderPrevMonthButton,
      renderNextYearButton, renderNextMonthButton,
      weekdayStyle, customWeekdays, warpRowWeekdays,
      warpRowControlMonthYear
    } = this.props
    const weekdays = customWeekdays || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const data = CommonFn.calendarArray(calendarMonth)
    var dayOfWeek = []
    _.forEach(weekdays, element => {
      dayOfWeek.push(<Text key={element} style={[styles.weekdays, weekdayStyle]}>{element}</Text>)
    })

    return (
      <View style={{ width: width }}>
        <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }, warpRowControlMonthYear]}>
          <TouchableOpacity onPress={() => this.yearMonthChange(-1, 'month')}>
            {renderPrevMonthButton ? renderPrevMonthButton() : <MCIcons name='arrow-left' size={20} color='#ffffff' />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.yearMonthChange(-1, 'year')}>
            {renderPrevYearButton ? renderPrevYearButton() : <MCIcons name='chevron-double-left' size={20} color='#ffffff' />}
          </TouchableOpacity>
          <Text style={styles.txtHeaderDate}>{months[parseInt(calendarMonth.split('-')[1])-1]}</Text>
          <Text style={styles.txtHeaderDate}>{calendarMonth.split('-')[0]}</Text>
          <TouchableOpacity onPress={() => this.yearMonthChange(1, 'year')}>
            {renderNextMonthButton ? renderNextMonthButton() : <MCIcons name='chevron-right' size={20} color='#ffffff' />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.yearMonthChange(1, 'month')}>
            {renderNextYearButton ? renderNextYearButton() : <MCIcons name='arrow-right' size={20} color='#ffffff' />}
          </TouchableOpacity>
        </View>
        <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }, warpRowWeekdays]}>
          {dayOfWeek}
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => this.renderDay(item)}
          extraData={this.state}
          numColumns={7}
        />
      </View>
    )
  }
}

const propTypes = {
  customWeekdays: PropTypes.array,
  renderPrevYearButton: PropTypes.func,
  renderPrevMonthButton: PropTypes.func,
  renderNextYearButton: PropTypes.func,
  renderNextMonthButton: PropTypes.func,
  //style
  warpRowControlMonthYear: PropTypes.object,
  warpRowWeekdays: PropTypes.object,
  weekdayStyle: PropTypes.object,
  textDayStyle: PropTypes.object,
  currentDayStyle: PropTypes.object,
  notCurrentDayOfMonthStyle: PropTypes.object,
  warpDayStyle: PropTypes.object,
  dateSelectedWarpDayStyle: PropTypes.object,

}

const defaultProps = {
  customWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

CalendarSelect.propTypes = propTypes
CalendarSelect.defaultProps = defaultProps
export default CalendarSelect;