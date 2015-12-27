'use strict';

var quotis = [{
  'quoteText': 'Quote1',
  'quoteAuthor': 'Author 1'
}, {
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
        { className: 'quote', onClick: this.props.save.bind(null, this.props.text, this.props.author) },
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

    saveQuote: function saveQuote(text, author) {
      console.log('here');
      var quotes = JSON.parse(localStorage.quotes) || [];
      quotes.unshift({
        quoteText: text,
        quoteAuthor: author
      });
      localStorage.setItem('quotes', JSON.stringify(quotes));
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
              save: _this2.saveQuote
            });
          })
        );
      }
    }
  });

  ReactDOM.render(React.createElement(App, null), document.getElementById('continer'));
})();
