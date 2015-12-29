var Quote = React.createClass({

  render: function() {

    return (
      <div className="quote" onClick={this.props.save.bind( null, this.props.text, this.props.author, this.props.id )}>
        <span className="text">
          {this.props.text}
        </span>
        <div className="info icon-fav">
          <span className="author">
            {this.props.author}
          </span>
          <span className="fav"></span>
        </div>
      </div>
    );
  }
});

module.exports = Quote;
