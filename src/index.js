import './style.css';

const tasks = [
  {
    description: 'I am a task',
    completed: false,
    index: 0,
  },
  {
    description: 'I am a task',
    completed: false,
    index: 1,
  },
  {
    description: 'I am a task',
    completed: false,
    index: 2,
  },
  {
    description: 'I am a task',
    completed: false,
    index: 3,
  },
  {
    description: 'I am a task',
    completed: false,
    index: 4,
  },
];
const tasksContainer = document.querySelector('ul');

const renderList = () => {
  tasks.forEach((task) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const icon = document.createElement('i');

    checkbox.setAttribute('type', 'checkbox');
    p.textContent = `${task.description}`;
    icon.classList.add('las');
    icon.classList.add('la-ellipsis-v');

    span.appendChild(icon);
    li.append(checkbox, p, span);
    tasksContainer.appendChild(li);
  });
};

renderList();