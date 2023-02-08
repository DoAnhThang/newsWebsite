'use strict';

// selecting elements and declare
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const btnLogin = document.getElementById('btn-submit');

const userArr = parseUser(getFromStorage('users')) || [];
let curUserActive, currentUser;

// 3. Login function
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  if (usernameInput.value === '') {
    alert('Please type username!');
  } else if (userArr.every(user => user.username !== usernameInput.value)) {
    alert('The Username wrong or not exist!');
  } else {
    curUserActive = userArr.find(user => user.username === usernameInput.value);

    if (passwordInput.value === '') {
      alert('Please type password!');
    } else if (curUserActive.password === passwordInput.value) {
      currentUser = true;
      window.location.href = '../index.html';
      saveToStorage('curUserActive', curUserActive);
      saveToStorage('currentUser', currentUser);
    } else {
      alert('The Password wrong!');
    }
  }
});
