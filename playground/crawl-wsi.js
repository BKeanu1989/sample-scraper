import Nightmare from 'nightmare';

const URL_BLOG = 'https://wostudiereich.de/blog';
const SELECTOR_SORT = 'a[href="/blog?&page=2"]';
var test;
// Viewport must have a width at least 1040 for the desktop version of Packt's blog
// const nightmare = new Nightmare({ show: true }).viewport(1041, 800);
const nightmare = new Nightmare({show: false});

(async() => {
  await nightmare.goto(URL_BLOG).wait(SELECTOR_SORT) // Always good to wait before performing an action on an element
  // .mousedown(SELECTOR_SORT)
  // .mouseup(SELECTOR_SORT)
    .click(SELECTOR_SORT).wait(2000).evaluate(() => {
    let posts = [];
    document.querySelectorAll('.article-wrapper').forEach(post => {
      posts = posts.concat({image: post.querySelector('img').src, title: post.querySelector('header > h2 > a').href, description: post.querySelector('strong').textContent.trim()});
    });
    return posts;
  }).end().then(result => console.log(result));
})();
