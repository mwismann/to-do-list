import { Save } from './localStorage.js';

export const editTask = (tasks, index, value) => {
  tasks[index].description = value;
  Save(tasks);
};

export const updateStatus = (tasks, index, checked) => {
  tasks[index].completed = checked;
  Save(tasks);
};

export const clearCompleted = (tasks, updateList) => {
  const filteredTasks = tasks.filter((task) => task.completed !== true);
  let i = 1;

  filteredTasks.forEach((task) => {
    task.index = i;
    i += 1;
  });

  Save(filteredTasks);
  updateList();
};