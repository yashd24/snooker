const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const calendarContainer = document.getElementById('calendar');
const monthYearElement = document.getElementById('month-year');
updateCalendar();

function updateCalendar() {
  calendarContainer.innerHTML = '';

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayIndex = new Date(currentYear, currentMonth, daysInMonth).getDay();

  const prevMonthDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const nextMonthDays = lastDayIndex === 0 ? 0 : 7 - lastDayIndex;

  const totalDays = prevMonthDays + daysInMonth + nextMonthDays;

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const prevMonthDaysArray = getDaysArray(prevYear, prevMonth).slice(-prevMonthDays);
  const currentMonthDaysArray = getDaysArray(currentYear, currentMonth);
  const nextMonthDaysArray = getDaysArray(nextYear, nextMonth).slice(0, nextMonthDays);

  const daysArray = [...prevMonthDaysArray, ...currentMonthDaysArray, ...nextMonthDaysArray];

  for (let i = 0; i < totalDays; i++) {
    const day = daysArray[i];

    const dayElement = document.createElement('div');
    dayElement.classList.add('day');

    if (day.month === currentMonth && day.year === currentYear && day.day === currentDate.getDate()) {
      dayElement.classList.add('current-day');
    }

    const dayNumberElement = document.createElement('span');
    dayNumberElement.textContent = day.day;
    dayElement.appendChild(dayNumberElement);

    if (day.tournament) {
      dayElement.classList.add('tournament-day'); 
      const tournamentInfoElement = document.createElement('div');
      tournamentInfoElement.classList.add('tournament-info');
      tournamentInfoElement.textContent = day.tournament;
      dayElement.appendChild(tournamentInfoElement);
    }

    const dayOfWeekElement = document.createElement('div');
    dayOfWeekElement.classList.add('day-of-week');
    dayOfWeekElement.textContent = getDayOfWeek(day.year, day.month, day.day);
    dayElement.appendChild(dayOfWeekElement);

    calendarContainer.appendChild(dayElement);
  }
  
  const monthYearString = monthNames[currentMonth] + ' ' + currentYear;
  monthYearElement.textContent = monthYearString;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getDaysArray(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = [];
  
    for (let day = 1; day <= daysInMonth; day++) {
      let tournament = null;
      let tournamentDuration = 1;
  
      // Add multiple days with tournaments based on your requirements
      if (month === 6 && day === 10) {
        tournament = 'Masters cup';
        tournamentDuration = 3; // Set the duration of the tournament
      } else if (month === 6 && day === 20) {
        tournament = 'Kings Cup';
        tournamentDuration = 2;
      } else if (month === 6 && day === 30) {
        tournament = 'Under-21 Championship';
        tournamentDuration = 1;
      }
  
      // Add the days to the array
      for (let i = 0; i < tournamentDuration; i++) {
        daysArray.push({
          day: day + i, 
          month,
          year,
          tournament,
          tournamentDuration
        });
      }
    }
  
    return daysArray;
}

function getDayOfWeek(year, month, day) {
  const dayOfWeek = new Date(year, month, day).getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[dayOfWeek];
}
