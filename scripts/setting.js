'use strict';

// selecting elements and declare
const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const btnSave = document.getElementById('btn-submit');

const currentUser = getFromStorage('currentUser');
const curUserActive = getFromStorage('curUserActive') || [];
const userArr = parseUser(getFromStorage('users')) || [];

// 9. Change Settings
if (currentUser) {
  pageSizeInput.value = curUserActive.pageSize;
  categoryInput.value = curUserActive.category.replace(/^./, str =>
    str.toUpperCase()
  );

  btnSave.addEventListener('click', function (e) {
    e.preventDefault();
    saveSettings();
  });
} else {
  alert('Please Login or Register!');
  window.location.href = '../index.html';
}

// function to save settings
async function saveSettings() {
  try {
    const data = await getNews(
      curUserActive.category,
      curUserActive.pageSize,
      1
    );

    if (
      isNaN(pageSizeInput.value) ||
      pageSizeInput.value < 1 ||
      pageSizeInput.value > data.totalResults
    ) {
      alert('News per page is not valid!');
    } else {
      // save curUserActive to localStorage for other pages
      curUserActive.category = categoryInput.value.toLowerCase();
      curUserActive.pageSize = pageSizeInput.value;
      saveToStorage('curUserActive', curUserActive);

      // save users to localStorage for other pages
      const index = userArr.findIndex(
        user => user.username === curUserActive.username
      );
      userArr[index].category = categoryInput.value.toLowerCase();
      userArr[index].pageSize = pageSizeInput.value;
      saveToStorage('users', userArr);

      window.location.href = './news.html';
    }
  } catch (err) {
    console.error(`💥 ${err.message} 💥`);
  }
}
