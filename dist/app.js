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

    var le_quotes = model.getQuotes();

    le_quotes.forEach(function (element) {
      element.isSaved = true;
    });

    return {
      quotes: le_quotes
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
          isSaved: false,
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

    this.setState(function (old) {

      var le_quotes = old.quotes;

      for (var i = 0; i < le_quotes.length; i++) {
        if (id === le_quotes[i].id) {
          le_quotes[i].isSaved = !le_quotes[i].isSaved;
          break;
        }
      }

      return {
        quotes: le_quotes
      };
    });
  },

  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'header',
        { className: 'header' },
        React.createElement('span', { className: 'add icon-add', onClick: this.callQuote })
      ),
      React.createElement(
        'section',
        { className: 'content' },
        this.state.quotes.map(function (val) {
          return React.createElement(QuoteView, {
            key: val.id,
            isSaved: val.isSaved,
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
'use strict';

var className = require('classnames');
var Quote = React.createClass({
  displayName: 'Quote',

  render: function render() {

    var save = this.props.save,
        text = this.props.text,
        author = this.props.author,
        key = this.props.id;

    var classes = className({
      'fav': true,
      'icon-fav': this.props.isSaved
    });

    return React.createElement(
      'article',
      { className: 'quote', onClick: save.bind(null, text, author, key) },
      React.createElement('span', { className: classes }),
      React.createElement(
        'div',
        { className: 'text' },
        text
      ),
      React.createElement(
        'span',
        { className: 'author' },
        author
      )
    );
  }
});

module.exports = Quote;

},{"classnames":5}],5:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}]},{},[1]);
