import './style.css';
import { form, clearBtn } from './modules/declarations.js';
import {
  addTask, renderList,
} from './modules/utilities.js';
import {
  clearCompleted,
} from './modules/interactivity.js';

renderList();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});
clearBtn.addEventListener('click', () => {
  clearCompleted();
});