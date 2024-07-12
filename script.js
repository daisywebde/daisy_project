const APIkey="84d8c67ca04446269d5b628abbc5d2ee";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${APIkey}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const newsContainer = document.getElementById('news-container');
    const newsBoxTemplate = document.getElementById('template-news-box');

    newsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const boxClone = newsBoxTemplate.content.cloneNode(true);
        fillDataInCard(boxClone, article);
        newsContainer.appendChild(boxClone);
    })
}

function fillDataInCard(boxClone, article){
    const newsImage = boxClone.querySelector('#news-image');
    const newsTitle = boxClone.querySelector('#news-title');
    const newsSource = boxClone.querySelector('#news-source');
    const newsDesc = boxClone.querySelector('#news-desc');
    
    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    boxClone.firstElementChild.addEventListener('click', () => window.open(article.url, "_blank"));
}

let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}