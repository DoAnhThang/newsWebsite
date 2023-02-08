'use strict';

// selecting elements and declare
const loginModalEl = document.getElementById('login-modal');
const welcomeMessageEl = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

const currentUser = getFromStorage('currentUser');
const curUserActive = getFromStorage('curUserActive') || [];

// 4. display Home Page
if (currentUser) {
  loginModalEl.style.display = 'none';
  welcomeMessageEl.textContent = `Welcome ${curUserActive.firstname}!`;
} else btnLogout.style.display = 'none';

// 5. Logout function
btnLogout.addEventListener('click', function () {
  if (currentUser) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('curUserActive');
    window.location.href = '../pages/login.html';
  }
});
