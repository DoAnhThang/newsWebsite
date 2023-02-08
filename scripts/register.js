'use strict';

// selecting elements and declare
const firstnameInput = document.getElementById('input-firstname');
const lastnameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const passwordConfirmInput = document.getElementById('input-password-confirm');
const btnRegister = document.getElementById('btn-submit');

const userArr = parseUser(getFromStorage('users')) || [];

// 2. Register function
btnRegister.addEventListener('click', function (e) {
  e.preventDefault();
  if (firstnameInput.value.length < 1 || firstnameInput.value.length > 20) {
    alert('The First Name must be between 1 and 20 characters!');
  } else if (
    lastnameInput.value.length < 1 ||
    lastnameInput.value.length > 20
  ) {
    alert('The Last Name must be between 1 and 20 characters!');
  } else if (
    usernameInput.value.length < 1 ||
    usernameInput.value.length > 20
  ) {
    alert('The Username must be between 1 and 20 characters!');
  } else if (
    userArr.some(
      user => user.username.toLowerCase() === usernameInput.value.toLowerCase()
    )
  ) {
    alert('The Username has already existed!\nPlease choose another.');
  } else if (
    passwordInput.value.length < 8 ||
    passwordInput.value.length > 20
  ) {
    alert('The Password must be between 8 and 20 characters!');
  } else if (passwordConfirmInput.value !== passwordInput.value) {
    alert('The Password and Confirm Password must be the same!');
  } else {
    alert('Register successfully!\nPlease login.');
    const userData = new User(
      firstnameInput.value,
      lastnameInput.value,
      usernameInput.value.toLowerCase(),
      passwordInput.value,
      5,
      'general'
    );

    userArr.push(userData);
    saveToStorage('users', userArr);
    window.location.href = '../pages/login.html';
    // window.location.assign('../pages/login.html');
  }
});
