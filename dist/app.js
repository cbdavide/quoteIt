(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var QuoteModel = require('./model');

var quotis = [{
  'id': 'id1',
  'quoteText': 'Quote1',
  'quoteAuthor': 'Author 1'
}, {
  'id': 'id2',
  'quoteText': 'Quote2',
  'quoteAuthor': 'Author 2'
}];

localStorage.quotes = JSON.stringify(quotis);

(function () {

  var Quote = React.createClass({
    displayName: 'Quote',

    render: function render() {

      return React.createElement(
        'div',
        { className: 'quote', onClick: this.props.save.bind(null, this.props.text, this.props.author, this.props.id) },
        React.createElement(
          'span',
          { className: 'text' },
          this.props.text
        ),
        React.createElement(
          'div',
          { className: 'info icon-star' },
          React.createElement(
            'span',
            { className: 'author' },
            this.props.author
          ),
          React.createElement('span', { className: 'fav' })
        )
      );
    }
  });

  var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
      var temp_quotes = [];

      if (localStorage.quotes) {
        temp_quotes = JSON.parse(localStorage.getItem('quotes'));
      }
      return {
        quotes: temp_quotes
      };
    },

    callQuote: function callQuote() {
      var _this = this;

      $.ajax({
        url: 'http://api.forismatic.com/api/1.0/',
        jsonp: 'jsonp',
        dataType: 'jsonp',
        data: {
          method: 'getQuote',
          lang: 'en',
          format: 'jsonp'
        }
      }).done(function (data) {
        _this.setState(function (old) {
          old.quotes.unshift({
            id: data.quoteLink,
            quoteText: data.quoteText,
            quoteAuthor: data.quoteAuthor
          });
          return {
            quotes: old.quotes
          };
        });
      }).fail(function (err) {
        console.log('Err -> Quote did not arrive :c');
      });
    },

    /**
     * Verify if the quote is already saved.
     *
     * @param quotes - Array of quotes.
     * @param id - Id of the quote to look for.
     * @return {Boolean} - Quote exist or not.
     */
    isSaved: function isSaved(quotes, id) {
      var cond = false;
      quotes.forEach(function (element) {
        if (element.id === id) cond = true;
      });
      return cond;
    },

    saveQuote: function saveQuote(text, author, id) {
      var quotes = JSON.parse(localStorage.quotes) || [];
      if (!this.isSaved(quotes, id)) {
        quotes.unshift({
          id: id,
          quoteText: text,
          quoteAuthor: author
        });
        localStorage.setItem('quotes', JSON.stringify(quotes));
      } else {
        console.log('This quote is alrady saved.');
      }
    },

    render: function render() {
      var _this2 = this;

      if (this.state.quotes === []) {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: 'placeholder' },
            'Click for a random quote.'
          )
        );
      } else {
        return React.createElement(
          'div',
          { className: 'content', onClick: this.callQuote.bind(this) },
          this.state.quotes.map(function (val) {
            return React.createElement(Quote, {
              text: val.quoteText,
              author: val.quoteAuthor,
              id: val.id,
              save: _this2.saveQuote
            });
          })
        );
      }
    }
  });

  ReactDOM.render(React.createElement(App, null), document.getElementById('continer'));
})();

},{"./model":2}],2:[function(require,module,exports){
"use strict";

var QuoteModel = function QuoteModel() {

  var model = JSON.parse(localStorage.quotes) || [];

  this.updateModel = function () {
    localStorage.quotes = JSON.stringify(model);
  };

  this.quoteIndex = function (id) {
    for (var i = 0; i < model.length; i++) {
      if (model[i].id == id) return i;
    }
    return -1;
  };

  this.getQuotes = function () {
    return model;
  };

  this.isSaved = function (id) {
    for (var i = 0; i < model.length; i++) {
      if (model[i].id === id) return true;
    }
    return false;
  }, this.saveQuote = function (quote) {
    model.unshift(quote);
    updateModel();
  };

  this.removeQuote = function (id) {
    model.splice(quoteIndex(id), 1);
    updateModel();
  };
};

module.exports = QuoteModel;

},{}]},{},[1]);
