'use strict';

var Quote = React.createClass({
  displayName: 'Quote',

  render: function render() {

    var save = this.props.save,
        text = this.props.text,
        author = this.props.author,
        key = this.props.id;

    var classes = classNames({
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
