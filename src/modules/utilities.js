import Task from './class.js';
import { toDoList, container, newTaskInput } from './declarations.js';
import {
  updateStatus,
} from './interactivity.js';

const renderList = () => {
  container.innerHTML = '';
  toDoList.forEach((task) => {
    container.insertAdjacentHTML('beforeend',
      `<li data-id="${task.index}">
      <input type="checkbox" class="checkbox" data-id="${task.index}" ${(task.completed === true) ? 'checked' : ''}>
      <input type="text" class="task-description ${(task.completed === true) ? 'completed' : ''}" data-id="${task.index}" value="${task.description}" readonly>
      <span>
        <i class="las la-ellipsis-v" data-id="${task.index}"></i>
        <i class="las la-trash" data-id="${task.index}"></i>
      </span>
    </li>`);
  });

  // ----------- To-Do List Functionality ----------------
  const editTask = (id) => {
    const options = document.querySelector(`.las.la-ellipsis-v[data-id="${id}"]`);
    const remove = document.querySelector(`.las.la-trash[data-id="${id}"]`);
    const description = document.querySelector(`.task-description[data-id="${id}"]`);
    const task = document.querySelector(`li[data-id="${id}"]`);

    task.classList.add('editing');
    options.classList.add('hide');
    remove.classList.add('active');
    description.readOnly = false;
  };

  const updateTask = (id) => {
    const editedDescription = document.querySelector(`.task-description[data-id="${id}"]`);
    if (editedDescription.value.trim() === '') {
      return;
    }

    const index = toDoList.findIndex((task) => task.index === +id);

    toDoList[index].description = editedDescription.value;
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    renderList();
  };

  const removeTask = (index) => {
    const filteredList = toDoList.filter((task) => task.index !== +index);
    let i = 1;
    filteredList.forEach((task) => {
      task.index = i;
      i += 1;
    });

    localStorage.setItem('toDoList', JSON.stringify(filteredList));
    window.location.reload();
  };

  document.querySelectorAll('.la-ellipsis-v').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      editTask(e.target.dataset.id);
    });
  });
  document.querySelectorAll('.task-description').forEach((task) => {
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

  // ---------- To-Do List Interactivity -------------------
  const checkboxArr = document.querySelectorAll('.checkbox');
  checkboxArr.forEach((box) => {
    box.addEventListener('change', (e) => {
      updateStatus(e.target.dataset.id);
    });
  });
};

const addTask = () => {
  if (newTaskInput.value.trim() === '') {
    return;
  }

  const newTask = new Task({
    description: newTaskInput.value,
    index: toDoList.length + 1,
  });

  toDoList.push(newTask);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  newTaskInput.value = '';
  renderList();
};

export {
  addTask, renderList,
};