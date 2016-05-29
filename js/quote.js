var className = require('classnames');
var Quote = React.createClass({

  render: function() {

    let {save, text, author, id} = this.props;

    let classes = className({
      'options__fav': true,
      'icon-fav': !this.props.isSaved,
      'icon-fav-saved': this.props.isSaved
    });

    return (
      <article className="quote" onClick={save.bind( null, text, author, id )}>
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

module.exports = Quote;
