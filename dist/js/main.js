'use strict';

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
        React.createElement('img', { className: 'logo ', src: 'dist/img/logo.svg', width: '40px' }),
        React.createElement(
          'div',
          { className: 'title' },
          'Quote it'
        ),
        React.createElement('span', { className: 'add icon-add', onClick: this.callQuote })
      ),
      React.createElement(
        'section',
        { className: 'content' },
        this.state.quotes.map(function (val) {
          return React.createElement(Quote, {
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
