const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-author').innerHTML),

};
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post .post-author';
const optTagsListSelector = '.tags.list';
const optAuthorListSelector = '.authors.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function titleClickHandler(event) {
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute("href");
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
}
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

    
    const linkHTMLData = {id: article.id, title: articleTitle};
const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    titleList.insertAdjacentHTML("beforeend", linkHTML);

  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);

  }
}


function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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

      const tagHTML = `<a href="#tag-${tag}">#${tag}</a>`;
      /* add generated code to HTML variable */
      linkList = linkList + tagHTML;
      /* [NEW] check if [tag] key is in allTags object */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /*[done] END LOOP: for each tag */
    }
    /*[done] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = linkList;
    const links = article.querySelectorAll('.post-tags li');
    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
    /*[done] END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {tags: []};
   

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="tag-size-'+ calculateTagClass(allTags[tag], tagsParams) +'" href="#tag-' + tag + '">' + tag + '</a></li>';
      allTagsData.tags.push({  
        tag: tag,
        count: allTags[tag],
        className: 'tag-size-' + calculateTagClass(allTags[tag], tagsParams)
      });  
      /* [DONE] [NEW] END LOOP: for each tag in allTags: */
    }
    
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
   
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }
 

}
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
  const allTagsLinksHref = document.querySelectorAll(`a[href="${href}"]`);
  /*[done] START LOOP: for each found tag link */
  for (let tagsLinkHref of allTagsLinksHref) {
    /*[done] add class active */
    tagsLinkHref.classList.add('active');
  }
  /*[done] END LOOP: for each found tag link */
  /*[done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);

}
function addClickListenersToElement(selector, handler) {
  const links = document.querySelectorAll(selector);
  for (const link of links) {
    link.addEventListener('click', handler);
  }
}
function addClickListenersToTags() {
  addClickListenersToElement('.list.tags a', tagClickHandler);
}
function addClickListenersToArticleTags() {
  addClickListenersToElement('.list.list-horizontal a', tagClickHandler);
}
function addClickListenersToAuthors() {
  addClickListenersToElement('.list.authors a', authorClickedHandler)
}
function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  let authors = {};
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const dataAuthor = article.getAttribute('data-author');
    if (!authors[dataAuthor]) {
      authors[dataAuthor] = 1;
    } else {
      authors[dataAuthor]++;
    }
    console.log(authors);
    const authorHTML = `<a href="#${dataAuthor}"><span class="author-name">${dataAuthor}</span></a>`;
    html = html + authorHTML;
    authorWrapper.innerHTML = html;
    const links = article.querySelectorAll('.post-author a');

    for (let link of links) {
      link.addEventListener('click', authorClickedHandler);
    }
    const authorList = document.querySelector(optAuthorListSelector);
    const allAuthor = {author: []};
    /* [DONE] [NEW] START LOOP: for each author in allAuthors: */
    for(let author in authors){
      /* [DONE] [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthor.author.push({ 
        author: author, 
        count: authors[author]
      });           
      /* [DONE] [NEW] END LOOP: for each author in allAuthors: */
    }
    /* [DONE] [NEW] add HTML from allAuthorsHTML to authorsList */
    authorList.innerHTML = templates.authorCloudLink(allAuthor);
}
}
function authorClickedHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('author was Clicked', clickedElement);
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#', '');
  const allAuthorLinksActive = document.querySelectorAll('.post-author a.active');
  for (let authorActiveLink of allAuthorLinksActive) {
    authorActiveLink.classList.remove('active');
  }
  const allAuthorLinksHref = document.querySelectorAll(`a[href="${href}"]`);
  /*[done] START LOOP: for each found tag link */
  for (let authLinkHref of allAuthorLinksHref) {
    /*[done] add class active */
    authLinkHref.classList.add('active');
  }

  generateTitleLinks(`[data-author="${author}"]`);
}

generateTitleLinks();
generateTags();
addClickListenersToTags();
addClickListenersToArticleTags();
generateAuthors();
addClickListenersToAuthors();
