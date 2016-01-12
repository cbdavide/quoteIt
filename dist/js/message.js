'use strict';

var Message = React.createClass({
  displayName: 'Message',

  render: function render() {

    var classes = classNames({
      'message': true,
      'message-hidden': this.props.hidden
    });

    return React.createElement(
      'section',
      { className: classes, onClick: this.props.handler },
      React.createElement(
        'div',
        { className: 'message__content' },
        this.props.text
      )
    );
  }

});
