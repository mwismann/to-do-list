import { toDoList } from './declarations.js';

const updateStatus = (id) => {
  const checkbox = document.querySelector(`.checkbox[data-id="${id}"]`);
  const index = toDoList.findIndex((task) => task.index === +id);

  toDoList[index].completed = checkbox.checked;
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  window.location.reload();
};

const clearCompleted = () => {
  const filteredList = toDoList.filter((task) => task.completed !== true);
  let i = 1;
  filteredList.forEach((task) => {
    task.index = i;
    i += 1;
  });

  localStorage.setItem('toDoList', JSON.stringify(filteredList));
  window.location.reload();
};

export { updateStatus, clearCompleted };