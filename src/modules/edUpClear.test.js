import { JSDOM } from 'jsdom';
import { Load } from './localStorage.js';
import { addTask } from './addRemove.js';
import { editTask, updateStatus, clearCompleted } from './edUpClear.js';
import 'jest-localstorage-mock';

const updateList = () => {
  const tasks = Load();
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.description;

    const li = document.createElement('li');
    li.appendChild(input);
    list.appendChild(li);
  });
};

describe('Tests for editTask, updateStatus and clearCompleted functions', () => {
  test('Test: editTask should edit a task description', () => {
    const dom = new JSDOM('<ul class="list" id="list"></ul>');
    global.document = dom.window.document;
    addTask(updateList, 'task 1');
    const tasks = Load();

    expect(tasks[0].description).toBe('task 1');
    editTask(tasks, 0, 'task 1 edited');

    expect(tasks[0].description).toBe('task 1 edited');
  });

  test('Test: updateStatus should update a task from the list', () => {
    const dom = new JSDOM('<ul class="list" id="list"></ul>');
    global.document = dom.window.document;
    const tasks = Load();

    expect(tasks.length).toBe(1);
    expect(tasks[0].completed).toBe(false);
    updateStatus(tasks, 0, true);

    expect(tasks[0].completed).toBe(true);
  });

  test('Test: clearCompleted should clear all completed tasks from the list', () => {
    const dom = new JSDOM('<ul class="list" id="list"></ul>');
    global.document = dom.window.document;
    addTask(updateList, 'task 1');
    addTask(updateList, 'task 2');
    addTask(updateList, 'task 3');
    let tasks = Load();
    updateStatus(tasks, 1, true);
    updateStatus(tasks, 2, true);

    tasks = Load();
    clearCompleted(tasks, updateList);
    const li = document.querySelectorAll('#list li');

    expect(li).toHaveLength(1);
  });
});