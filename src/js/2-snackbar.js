
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDelay = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onGeneratePromise);

function onGeneratePromise(event) {
  event.preventDefault();

  const delay = form.delay.value;
  const userChoice = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userChoice === 'fulfilled') {
        resolve(delay);
      } else if (userChoice === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(delay =>
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );

  inputDelay.value = '';
}