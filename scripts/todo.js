'use strict';

// selecting elements and declare
const inputTask = document.getElementById('input-task');
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

const currentUser = getFromStorage('currentUser');
const curUserActive = getFromStorage('curUserActive') || [];
const todoArr = parseTodo(getFromStorage('todos')) || [];

// 8. Display Todo List
if (currentUser) {
  renderTodo();

  // Add new Todo and display tasks
  btnAdd.addEventListener('click', function (e) {
    e.preventDefault();
    if (inputTask.value === '') {
      alert(`Let's add your task 💪💪💪`);
    } else if (
      todoArr.some(
        todo =>
          todo.task.toLowerCase() === inputTask.value.toLowerCase() &&
          todo.owner === curUserActive.username
      )
    ) {
      inputTask.value = '';
      alert('The Todo already existed!');
    } else {
      const subTodo = new Task(
        inputTask.value.replace(/^./, str => str.toUpperCase()),
        curUserActive.username,
        false
      );
      inputTask.value = '';
      todoArr.push(subTodo);
      saveToStorage('todos', todoArr);

      renderTodo();
    }
  });
} else {
  alert('Please Login or Register!');
  window.location.href = '../index.html';
}

// function to render tasks
function renderTodo() {
  const curTodoActive = todoArr.filter(
    todo => todo.owner === curUserActive.username
  );
  todoList.innerHTML = '';
  curTodoActive.forEach(function (todo) {
    const html = `<li class="${
      todo.isDone ? 'checked' : ''
    }" onclick="toggleTask('${todo.task}', ${todo.isDone})">${
      todo.task
    }<span onclick="deleteTask('${todo.task}')" class="close">x</span></li>`;
    todoList.insertAdjacentHTML('afterbegin', html);
  });
}

// Toggle task
function toggleTask(task, isDone) {
  const index = todoArr.findIndex(
    todo => todo.task === task && todo.owner === curUserActive.username
  );
  if (index !== -1) todoArr[index].isDone = !isDone;

  saveToStorage('todos', todoArr);
  renderTodo();
}

// Delete task
function deleteTask(task) {
  const index = todoArr.findIndex(
    todo => todo.task === task && todo.owner === curUserActive.username
  );
  todoArr.splice(index, 1);

  renderTodo();
  saveToStorage('todos', todoArr);
}
