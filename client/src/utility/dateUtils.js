// Function to convert a Date object to dd/mm/yy format
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
}

// Function to convert a dd/mm/yy string to a Date object
const parseDate = (dateString) => {
  let parts = dateString.split('-');

  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]) - 1;
  let day = parseInt(parts[2]);

  return new Date(year, month, day);
}

const getDaysFromDate = (formattedDate, amount) => {
  let date = parseDate(formattedDate);
  let dates = [];

  dates.push(formattedDate);

  for (let i = 1; i <= amount; i++) {
    date.setDate(date.getDate() + 1);
    dates.push(formatDate(date));
  }

  return dates;
}

const filterDateDays = (dates, days) => {
  const allDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday',
    'friday', 'saturday'];

  return dates.filter(dateString => {
    let date = parseDate(dateString);
    let dayOfWeek = date.getDay();
    let dayName = allDays[dayOfWeek];
    return days.includes(dayName);
  });
}

const removeDatesBefore = (dates, date) => {
  let thresholdDate = parseDate(date);

  return dates.filter(dateString => {
    let currentDate = parseDate(dateString);
    return currentDate >= thresholdDate;
  });
}

const getDayOfWeek = (formattedDate) => {
  const date = parseDate(formattedDate);
  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  const dayOfWeek = date.getDay();

  return dayNames[dayOfWeek];
}

const getNextDay = (formattedDate) => {
  let date = parseDate(formattedDate);
  date.setDate(date.getDate() + 1);
  return formatDate(date);
}

const getPreviousDay = (formattedDate) => {
  let date = parseDate(formattedDate);
  date.setDate(date.getDate() + - 1);
  return formatDate(date);
}

module.exports = { formatDate, parseDate, getDaysFromDate, filterDateDays, removeDatesBefore, getDayOfWeek, getNextDay, getPreviousDay }; 
