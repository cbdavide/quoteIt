var Quote = React.createClass({

  render: function() {

    let save = this.props.save,
        text = this.props.text,
        author = this.props.author,
        key = this.props.id;

    let classes = classNames({
      'fav': true,
      'icon-fav': this.props.isSaved
    });

    return (
      <article className="quote" onClick={save.bind( null, text, author, key )}>
        <span className={classes}></span>
        <div className="text">
          {text}
        </div>
        <span className="author">
          {author}
        </span>
      </article>
    );
  }
});
