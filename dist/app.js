(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Main = require('./main');
ReactDOM.render(React.createElement(Main, null), document.getElementById('continer'));

},{"./main":2}],2:[function(require,module,exports){
'use strict';

var QuoteModel = require('./model'),
    QuoteView = require('./quote');

var model = QuoteModel();

var Main = React.createClass({
  displayName: 'Main',

  getInitialState: function getInitialState() {
    return {
      quotes: model.getQuotes()
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

  saveQuote: function saveQuote(text, author, id) {

    if (!model.isSaved(id)) {

      model.saveQuote({
        id: id,
        quoteText: text,
        quoteAuthor: author
      });
    } else {
      model.removeQuote(id);
    }
  },

  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'header',
        { className: 'header' },
        React.createElement('span', { className: 'add icon-add', onClick: this.callQuote.bind(this) })
      ),
      React.createElement(
        'section',
        { className: 'content' },
        this.state.quotes.map(function (val) {
          return React.createElement(QuoteView, {
            key: val.id,
            text: val.quoteText,
            author: val.quoteAuthor,
            id: val.id,
            save: _this2.saveQuote
          });
        })
      )
    );
  }
});

module.exports = Main;

},{"./model":3,"./quote":4}],3:[function(require,module,exports){
"use strict";

var QuoteModel = function QuoteModel() {

  return {

    updateModel: function updateModel(quotes) {
      localStorage.quotes = JSON.stringify(quotes);
    },

    quoteIndex: function quoteIndex(id) {
      var model = JSON.parse(localStorage.quotes);

      for (var i = 0; i < model.length; i++) {
        if (model[i].id == id) return i;
      }
      return -1;
    },

    getQuotes: function getQuotes() {
      return JSON.parse(localStorage.quotes);;
    },

    isSaved: function isSaved(id) {
      var model = JSON.parse(localStorage.quotes);

      for (var i = 0; i < model.length; i++) {
        if (model[i].id === id) {
          return true;
        }
      }
      return false;
    },

    saveQuote: function saveQuote(quote) {
      var model = JSON.parse(localStorage.quotes);
      model.unshift(quote);
      this.updateModel(model);
    },

    removeQuote: function removeQuote(id) {
      var model = JSON.parse(localStorage.quotes);
      model.splice(this.quoteIndex(id), 1);
      this.updateModel(model);
    }
  };
};

module.exports = QuoteModel;

},{}],4:[function(require,module,exports){
"use strict";

var Quote = React.createClass({
  displayName: "Quote",

  render: function render() {

    return React.createElement(
      "article",
      { className: "quote", onClick: this.props.save.bind(null, this.props.text, this.props.author, this.props.id) },
      React.createElement("span", { className: "fav icon-fav" }),
      React.createElement(
        "div",
        { className: "text" },
        this.props.text
      ),
      React.createElement(
        "span",
        { className: "author" },
        this.props.author
      )
    );
  }
});

module.exports = Quote;

},{}]},{},[1]);
