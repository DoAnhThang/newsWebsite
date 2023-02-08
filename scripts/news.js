'use strict';

// selecting elements and declare
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
const newsList = document.getElementById('news-container');
const navPageNum = document.getElementById('nav-page-num');
const messageEl = document.querySelector('.message');

const currentUser = getFromStorage('currentUser');
const curUserActive = getFromStorage('curUserActive') || [];

// 6. Display the articles
if (currentUser) {
  let page = 1;
  showNews(page);

  // 7. Switch pages for articles
  btnNext.addEventListener('click', function () {
    showNews(++page);
  });

  btnPrev.addEventListener('click', function () {
    showNews(--page);
  });
} else {
  alert('Please Login or Register!');
  window.location.href = '../index.html';
}

// function to display the articles
async function showNews(page) {
  try {
    const data = await getNews(
      curUserActive.category,
      curUserActive.pageSize,
      page
    );
    renderNews(data, curUserActive.pageSize, page);
  } catch (err) {
    console.error(`💥 ${err.message} 💥`);
  }
}

// function to render the articles
function renderNews(data, pageSize, page) {
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
