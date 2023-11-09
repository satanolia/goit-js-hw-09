
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const satrtBtn = document.querySelector('[data-start]');
const remainingDays = document.querySelector('[data-days]');
const remainingHours = document.querySelector('[data-hours]');
const remainingMinutes = document.querySelector('[data-minutes]');
const remainingSeconds = document.querySelector('[data-seconds]');

let deadline = 0;
let formatDate = null;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    differenceDate(selectedDates[0]);
  },
};
satrtBtn.disabled = true;

flatpickr('#datetime-picker', options);

satrtBtn.addEventListener('click', onClick);

function onClick() {
  timerId = setInterval(() => {
    btnStart.disabled = true;
    deadline -= 1000;
    if (
      remainingSeconds.textContent <= 0 &&
      remainingMinutes.textContent <= 0
    ) {
      Notiflix.Notify.success('Time end');
      clearInterval(timerId);
    } else {
      formatDate = convertMs(deadline);
      renderDate(formatDate);
    }
  }, 1000);
}

function differenceDate(selectedDates) {
  const currentDate = Date.now();
  if (selectedDates < currentDate) {
    satrtBtn.disabled = true;
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  deadline = selectedDates - currentDate;
  formatDate = convertMs(deadline);
  renderDate(formatDate);
  satrtBtn.disabled = false;
}

function renderDate(formatDate) {
  remainingSeconds.textContent = formatDate.seconds;
  remainingMinutes.textContent = formatDate.minutes;
  remainingHours.textContent = formatDate.hours;
  remainingDays.textContent = formatDate.days;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  addLeadingZero();
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
