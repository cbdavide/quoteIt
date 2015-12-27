'use strict';

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
