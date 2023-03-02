// Import modules to manipulate DOM, access LocalStorage and access functions
import { JSDOM } from 'jsdom';
import { Load } from './localStorage.js';
import { addTask, removeTask } from './addRemove.js';
import 'jest-localstorage-mock';

const updateList = () => {
  const tasks = Load();
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task) => {
    // Creating a text input
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.description;

    // Append content to `li` and append it to `list`
    const li = document.createElement('li');
    li.appendChild(input);
    list.appendChild(li);
  });
};

describe('Tests for add and remove functions', () => {
  test('Test: addTask should add a task to the list', () => {
    // Arrange
    const dom = new JSDOM('<ul class="list" id="list"></ul>');
    global.document = dom.window.document;
    
    // Act
    addTask(updateList, 'task number 1');
    const li = document.querySelectorAll('#list li');
    
    // Assert
    expect(li).toHaveLength(1);
  });

  test('Test: removeTask should remove a task from the list', () => {
    // Arrange
    const dom = new JSDOM('<ul class="list" id="list"></ul>');
    global.document = dom.window.document;

    // Act
    removeTask(0, updateList);
    const li = document.querySelectorAll('#list li');

    // Assert
    expect(li).toHaveLength(0);
  });
});