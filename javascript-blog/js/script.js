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
  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);
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
const optArticleAuthorSelector = '.post .post-author';
 
 
function generateTitleLinks(customSelector = '') {
 
  // find titleList element
  const titleList = document.querySelector(optTitleListSelector);
  /* remove contents of titleList */
  titleList.innerHTML = '';
 
 
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
  let html = '';
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
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /*[DONE] make html variable with empty string */
    let linkList = '';
    /*[done] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [done] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [done] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /*[done] generate HTML of the link */
 
      const tagHTML = `<li><a href="#tag-${tag}">#${tag}</a></li>`;      /* add generated code to HTML variable */
      linkList = linkList + tagHTML;
      /*[done] END LOOP: for each tag */
    }
    /*[done] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = linkList;
    const links = article.querySelectorAll('.post-tags li');
    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
    /*[done] END LOOP: for every article: */
  }
}
generateTags();
 
function tagClickHandler(event) {
  /* [done]prevent default action for this event */
  event.preventDefault();
  /* [done]make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag Clicked', tagClickHandler);
  /* [done]make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [done]make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [done]find all tag links with class active */
  const allTagsLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [done]START LOOP: for each active tag link */
  for (let tagActiveLink of allTagsLinksActive) {
    /* remove class active */
    tagActiveLink.classList.remove('active');
  }
  /* [done]END LOOP: for each active tag link */
 
  /*[done] find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /*[done] START LOOP: for each found tag link */
  for (let tagsLinkHref of allTagsLinksHref) {
    /*[done] add class active */
    tagsLinkHref.classList.add('active');
  }
  /*[done] END LOOP: for each found tag link */
  /*[done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
}
 
function addClickListenersToTags() {
  /*[done] find all links to tags */
  const links = document.querySelectorAll('.list.list-horizontal a, .list.tags a');
  /*[done] START LOOP: for each link */
  for (const link of links) {
    /*[done] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /*[done] END LOOP: for each link */
}
 
addClickListenersToTags();
 
function generateAuthors(){
  /*[DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /*[DONE] START LOOP: for every article: */
  for (let article of articles){
    /* [DONE] find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /*[DONE] make html variable with empty string */
    let html = ' ';
    /*[DONE] get authors from data-author attribute */
    const dataAuthor = article.getAttribute('data-author');
    const authorHTML ='<a href="#'+ dataAuthor + '"><span class="author-name">' + dataAuthor + '</span></a>';
    html = html + ' ' + authorHTML;
    authorWrapper.innerHTML = html;
 
  }
}
generateAuthors();
 
function authorClickedHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('author was Clicked', clickedElement);
 
}