var app = app || {};

( function() {

  app.Quote = React.createClass({

    render: function() {

      let save = this.props.save,
          text = this.props.text,
          author = this.props.author,
          key = this.props.id;

      let classes = classNames({
        'options__fav': true,
        'icon-fav': !this.props.isSaved,
        'icon-fav-saved': this.props.isSaved
      });

      return (
        <article className="quote" onClick={save.bind( null, text, author, key )}>
          <div className="quote__options">
            <span className={classes}></span>
          </div>
          <div className="quote__content">
            <div className="content__text">
              {text}
            </div>
            <div className="content__author">
              {author}
            </div>
          </div>
        </article>
      );
    }
  });
  
})();
