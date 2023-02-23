import './style.css';
import {
  form, addTask, renderList,
} from './modules/utilities.js';

renderList();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});