var Quote = React.createClass({

  render: function() {

    let save = this.props.save,
        text = this.props.text,
        author = this.props.author,
        key = this.props.id;

    let classes = classNames({
      'fav': true,
      'icon-fav': !this.props.isSaved,
      'icon-fav-saved': this.props.isSaved
    });

    return (
      <article className="quote" onClick={save.bind( null, text, author, key )}>
        <div className="options">
          <span className={classes}></span>
        </div>
        <div className="quote-content">
          <div className="text">
            {text}
          </div>
          <div className="author">
            {author}
          </div>
        </div>
      </article>
    );
  }
});
