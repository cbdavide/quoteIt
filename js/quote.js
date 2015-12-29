var Quote = React.createClass({

  render: function() {

    return (
      <div className="quote" onClick={this.props.save.bind( null, this.props.text, this.props.author, this.props.id )}>
        <span className="fav icon-fav"></span>
        <div className="text">
          {this.props.text}
        </div>
        <span className="author">
          {this.props.author}
        </span>
      </div>
    );
  }
});

module.exports = Quote;
