'use strict';

var app = app || {};

(function () {

  app.Quote = React.createClass({
    displayName: 'Quote',

    render: function render() {

      var save = this.props.save,
          text = this.props.text,
          author = this.props.author,
          key = this.props.id;

      var classes = classNames({
        'options__fav': true,
        'icon-fav': !this.props.isSaved,
        'icon-fav-saved': this.props.isSaved
      });

      return React.createElement(
        'article',
        { className: 'quote', onClick: save.bind(null, text, author, key) },
        React.createElement(
          'div',
          { className: 'quote__options' },
          React.createElement('span', { className: classes })
        ),
        React.createElement(
          'div',
          { className: 'quote__content' },
          React.createElement(
            'div',
            { className: 'content__text' },
            text
          ),
          React.createElement(
            'div',
            { className: 'content__author' },
            author
          )
        )
      );
    }
  });
})();
