'use strict';

// 1. Create Class User
class User {
  constructor(firstname, lastname, username, password, pageSize, category) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}

// Create Class Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// function to convert from JS Object to Class Instance
function parseUser(usersData) {
  if (usersData) {
    const users = usersData.map(
      user =>
        (user = new User(
          user.firstname,
          user.lastname,
          user.username,
          user.password,
          user.pageSize,
          user.category
        ))
    );
    return users;
  }
}

function parseTodo(todoListData) {
  if (todoListData) {
    const todoList = todoListData.map(
      todo => (todo = new Task(todo.task, todo.owner, todo.isDone))
    );
    return todoList;
  }
}

// call API to get the articles
const getNews = async function (category, pageSize, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=7757b54218e24cee8381dadaa0f454fd`
    );
    // console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(`💥 ${err.message} 💥`);
  }
};

const getSearchNews = async function (keyword, pageSize, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${page}&apiKey=7757b54218e24cee8381dadaa0f454fd`
    );
    // console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(`💥 ${err.message} 💥`);
  }
};
