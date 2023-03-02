import { Save, Load } from './localStorage.js';

export const addTask = (updateList, value) => {
  let tasks = Load();
  tasks.push({
    completed: false,
    description: value,
    index: tasks.length,
  });
  Save(tasks);
  updateList();
};

export const removeTask = (taskIndex, updateList) => {
  let tasks = Load();
  const filteredTasks = tasks.filter((task) => task.index !== taskIndex)

  Save(filteredTasks);
  updateList();
};
