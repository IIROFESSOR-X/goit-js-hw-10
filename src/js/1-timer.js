
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minsTimer = document.querySelector('span[data-minutes]');
const secsTimer = document.querySelector('span[data-seconds]');

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btnStart.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};

const datePicker = flatpickr(input, options);

input.addEventListener('focus', () => {
  datePicker.config.defaultDate = new Date();
});

btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
  btnStart.disabled = true;
  input.disabled = true;
  const timer = setInterval(() => {
    const selectedDateTime = userSelectedDate.getTime();
    const currentDateTime = new Date().getTime();
    const different = selectedDateTime - currentDateTime - 1000;
    const result = convertMs(different);

    const { days, hours, minutes, seconds } = result;

    daysTimer.textContent = pad(days);
    hoursTimer.textContent = pad(hours);
    minsTimer.textContent = pad(minutes);
    secsTimer.textContent = pad(seconds);

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  
  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);
  
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.disabled = true;

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const endTime = selectedDate.getTime();

  startButton.disabled = true;
  startCountdown(endTime);
});