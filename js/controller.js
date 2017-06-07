(function (window) {
  'use strict'

  function Controller (view) {
    var self = this;
    self.view = view;

    self.view.bind('getArticle', function (searchTerm) {
      if (!searchTerm) {
        self.view.render('clearEntries');
      } else {
        self.view.render('clearEntries');
        self.getArticle(searchTerm, function(data) {
          var pages = data.query.pages;
          for (var page in pages) {
            self.view.render('showEntry', pages[page]);
          }
        })
      }
    })

    self.view.bind('getRandomArticle', function () {
      self.getRandomArticle();
    })
  }

  Controller.prototype.getArticle = function (searchTerm, cb) {
    fetch('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + encodeURI(searchTerm))
    .then(function (response) {
      response.json().then(function (data) {
        cb(data)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  Controller.prototype.getRandomArticle = function () {
    window.open('https://en.wikipedia.org/wiki/Special:Random','_blank')
  }

  window.app = window.app || {};
  window.app.Controller = Controller;
}(window))
