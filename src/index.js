import './style.css';
import {
  newTaskInput, addTask, removeTask, renderList, editTask, updateTask,
} from './modules/utilities.js';

renderList();
newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
document.querySelectorAll('.la-ellipsis-v').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    editTask(e.target.dataset.id);
  });
});
document.querySelectorAll('.edit-task').forEach((task) => {
  task.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateTask(e.target.dataset.id);
    }
  });
});
document.querySelectorAll('.la-trash').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    removeTask(e.target.dataset.id);
  });
});