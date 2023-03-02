export const Save = (arr) => {
  localStorage.setItem('tasks', JSON.stringify(arr));
};

export const Load = () => (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);