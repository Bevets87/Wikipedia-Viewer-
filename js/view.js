(function (window) {
  'use strict'

  function View () {
    var self = this;

    self.$goButton = document.getElementById('go');
    self.$randomButton = document.getElementById('random');
    self.$searchInput = document.getElementById('search');
    self.$entriesContainer = document.querySelectorAll('.entries-container');
  }

  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === 'getArticle') {
      self.$goButton.addEventListener('click', function () {
        var searchTerm = self.$searchInput.value;
        handler(searchTerm)
      })
    }
    if (event === 'getRandomArticle') {
      self.$randomButton.addEventListener('click', function () {
        handler()
      })
    }
  }

  View.prototype.render = function (cmd, data) {
    var self = this;
    var viewCommands = {
      'clearEntries': function () {
        self.$entriesContainer[0].innerHTML = '';
      },
      'showEntry': function () {
        var a = document.createElement('a');
        a.setAttribute('href','https://en.wikipedia.org/?curid=' + data.pageid);
        a.setAttribute('target','_blank');
        a.innerHTML = '<div class="entry">';
        a.innerHTML += '<h1>'+ data.title +'</h1>';
        a.innerHTML += '<h4>'+ data.extract +'</h4>';
        a.innerHTML += '</div>';

        self.$entriesContainer[0].append(a);
      }
    }
    viewCommands[cmd]();
  }

  window.app = window.app || {};
  window.app.View = View;
}(window))
