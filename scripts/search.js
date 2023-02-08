'use strict';

// selecting elements and declare
const searchInput = document.getElementById('input-query');
const btnSearch = document.getElementById('btn-submit');
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
const newsList = document.getElementById('news-container');
const navPageNum = document.getElementById('nav-page-num');
const messageEl = document.querySelector('.message');

const currentUser = getFromStorage('currentUser');
const curUserActive = getFromStorage('curUserActive') || [];

// 10. (Advance) Serach the articles by keyword
if (currentUser) {
  navPageNum.style.display = 'none';
  let page;

  btnSearch.addEventListener('click', function () {
    if (searchInput.value === '') {
      alert('Please type keyword!');
    } else {
      page = 1;
      showSearchNews(page, searchInput.value);
    }
  });

  btnNext.addEventListener('click', function () {
    showSearchNews(++page, searchInput.value);
  });

  btnPrev.addEventListener('click', function () {
    showSearchNews(--page, searchInput.value);
  });
} else {
  alert('Please Login or Register!');
  window.location.href = '../index.html';
}

// function to display the articles
async function showSearchNews(page, keyword) {
  try {
    const data = await getSearchNews(keyword, curUserActive.pageSize, page);
    renderSearchNews(data, curUserActive.pageSize, page);
  } catch (err) {
    console.error(`💥 ${err.message} 💥`);
  }
}

// function to render the articles
function renderSearchNews(data, pageSize, page) {
  if (data.totalResults === 0) {
    messageEl.classList.remove('hidden');
    navPageNum.style.display = 'none';
  } else {
    messageEl.classList.add('hidden');
    navPageNum.style.display = 'block';
  }

  if (page === 1) btnPrev.style.display = 'none';
  else btnPrev.style.display = 'block';

  if (page * pageSize >= data.totalResults) btnNext.style.display = 'none';
  else btnNext.style.display = 'block';

  pageNum.textContent = page;

  let html = '';
  data.articles.forEach(article => {
    html += `<div class="card flex-row flex-wrap">
                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <img src="${article.urlToImage}" class="card-img" alt="${article.title}" />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary" >View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  });
  newsList.innerHTML = html;
}
