
var Message = React.createClass( {

  render: function() {

    let classes = classNames({
      'message': true,
      'message-hidden': this.props.hidden
    });

    return (
      <section className={classes}  onClick={this.props.handler} >
        <div className="message__content">
          {this.props.text}
        </div>
      </section>
    );
  }

});
