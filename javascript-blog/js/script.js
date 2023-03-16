'use strict';

const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  //console.log('clickedElement:', clickedElement);
  //console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks() {

  // find titleList element
  const titleList = document.querySelector(optTitleListSelector);
  /* remove contents of titleList */
  titleList.innerHTML = '';


  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* for each article */
  for (const article of articles) {
    /* get the article id */
    const id = article.id;
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = `<li><a href="#${id}"><span>${articleTitle}</span></a></li>`;
    /* insert link into titleList */
    titleList.insertAdjacentHTML("beforeend", linkHTML);

  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);

  }
}
generateTitleLinks();

function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for (const article of articles) {
    /* [DONE] find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    /*[DONE] make html variable with empty string */
    let html = '';
    /*[done] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [done] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */

      const tagHTML = `<li><a href="#${tag}">${tag}</a></li>`;
      /* add generated code to HTML variable */
      html = html + ' ' + tagHTML;
      /* END LOOP: for each tag */
    }
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html;  
  /* END LOOP: for every article: */
}
}
generateTags();

