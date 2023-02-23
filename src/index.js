import './style.css';
import {
  form, addTask, renderList,
} from './modules/utilities.js';
import {
  clearBtn, clearCompleted,
} from './modules/interactivity.js';

renderList();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});
clearBtn.addEventListener('click', () => {
  clearCompleted();
});