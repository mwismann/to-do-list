import Task from './class.js';

// --------- Pre rendering variables ------------
let toDoList = localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : [];
const tasksContainer = document.querySelector('ul');
const newTaskInput = document.getElementById('new-task');
let indexCounter = 0;

// -------- Functions --------------------------
const renderList = () => {
  tasksContainer.innerHTML = '';
  toDoList.forEach((task) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const p = document.createElement('p');
    const editTaskField = document.createElement('input');
    const span = document.createElement('span');
    const options = document.createElement('i');
    const remove = document.createElement('i');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    p.textContent = `${task.description}`;
    p.classList.add('task-description');
    editTaskField.setAttribute('type', 'text');
    editTaskField.classList.add('edit-task');
    editTaskField.value = `${task.description}`;
    editTaskField.dataset.id = task.index;
    options.classList.add('las');
    options.classList.add('la-ellipsis-v');
    options.dataset.id = task.index;
    remove.classList.add('las');
    remove.classList.add('la-trash');
    remove.dataset.id = task.index;

    span.append(options, remove);
    li.append(checkbox, p, editTaskField, span);
    tasksContainer.appendChild(li);
  });
};

const addTask = () => {
  if (newTaskInput.value.trim() === '') {
    return;
  }

  const newTask = new Task({
    description: newTaskInput.value,
    index: toDoList.length,
  });

  toDoList.push(newTask);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  newTaskInput.value = '';
  renderList();
};

const editTask = (i) => {
  const options = document.querySelectorAll('.las.la-ellipsis-v')[i];
  const remove = document.querySelectorAll('.las.la-trash')[i];
  const currDescription = document.querySelectorAll('.task-description')[i];
  const editTaskField = document.querySelectorAll('.edit-task')[i];
  const currTask = document.querySelectorAll('li')[i];

  options.classList.add('hide');
  currDescription.classList.add('hide');
  currTask.classList.add('active');
  remove.classList.add('active');
  editTaskField.classList.add('active');
};

const updateTask = (i) => {
  const editTaskField = document.querySelectorAll('.edit-task')[+i];
  if (editTaskField.value.trim() === '') {
    return;
  }

  toDoList[i].description = editTaskField.value;
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  renderList();
};

const updateTaskIndex = () => {
  toDoList.forEach((task) => {
    task.index = indexCounter;
    indexCounter += 1;
  });
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  indexCounter = 0;
};

const removeTask = (index) => {
  toDoList = toDoList.filter((task) => task.index !== +index);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  updateTaskIndex();
  renderList();
};

export {
  tasksContainer, newTaskInput, addTask, removeTask, renderList, editTask, updateTask,
};