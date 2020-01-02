import Moment from 'moment'
export const _checkRange = (date, start, end) => {
    if (!date || !start) return false;
    if (!end) return date.year() === start.year() && date.month() === start.month();
    if (date.year() < start.year() || (date.year() === start.year() && date.month() < start.month())) return false;
    if (date.year() > end.year() || (date.year() === end.year() && date.month() > end.month())) return false;
    return true;
  }

 export const _getMonthList = (props) => {
    let minDate =props.minDate.clone().date(1);
    let maxDate = props.maxDate.clone();
    let monthList = [];
    if (!maxDate || !minDate) return monthList;
    while (maxDate > minDate || (
      maxDate.year() === minDate.year() &&
      maxDate.month() === minDate.month()
    )) {
      let month = {
        date: minDate.clone()
      };
      monthList.push(month);
      minDate.add(1, 'month');
    }
    return monthList;
  }
  
export const   _getWeekNums = (start, end) =>{
    let clonedMoment = Moment(start), date, day, num, y, m, total = 0;
    while (!clonedMoment.isSame(end, 'months')) {
      y = clonedMoment.year();
      m = clonedMoment.month();
      date = new Date(y, m, 1);
      day = date.getDay();
      num = new Date(y, m + 1, 0).getDate();
      total += Math.ceil((num + day) / 7);
      clonedMoment.add(1, 'months');
    }
    return total;
  }