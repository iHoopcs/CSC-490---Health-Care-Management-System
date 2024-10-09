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

module.exports = { formatDate, parseDate, getDaysFromDate };
