'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It's a constructor function using the objects from the rawData array in the other JS file. It's capitalized because that's the convention.

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // It prepares the information for appending in a more usable way. Also, so you don't have to type the same thing repeatedly.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */


  if (!this.publishedOn) $newArticle.addClass('draft');
   $newArticle.attr('category', this.category);
  $newArticle.removeClass('template');
  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

$newArticle.find('a').text(this.author);

$newArticle.find('href').text(this.authorUrl);

$newArticle.find('h1').text(this.title);

$newArticle.find('time').attr('datetime', this.publishedOn);

$newArticle.find('.article-body').append(this.body)



  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(rawData) {
  articles.push(new Article(rawData).toHtml());
});

articles.forEach(function(articles) {
  $('#articles').append(articles);
});
