var model = QuoteModel();

var Main = React.createClass({

  getInitialState: function() {

    let le_quotes = model.getQuotes();

    le_quotes.forEach( (element) => {
      element.isSaved = true;
    });

    return {
      quotes: le_quotes,
      thanks: true,
      internet_warning: true,
    }
  },

  callQuote: function() {
    $.ajax({
      url: 'http://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data : {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      }
    }).done(( data ) => {
      this.setState( function ( old ) {
        old.quotes.unshift( {
          id: data.quoteLink,
          isSaved: false,
          quoteText: data.quoteText,
          quoteAuthor: data.quoteAuthor
        });
        return {
          quotes: old.quotes
        }
      });
    }).fail( ( err ) => {
      this.setState( function( old ) {
        return {
          internet_warning: false
        };
      });
    });
  },

  saveQuote: function( text, author, id ) {

    if( !model.isSaved( id ) ) {

      model.saveQuote( {
        id: id,
        quoteText: text,
        quoteAuthor: author
      });
    } else {
      model.removeQuote( id );
    }

    this.setState( function( old ) {

      let le_quotes = old.quotes;

      for( let i=0; i<le_quotes.length; i++){
        if( id === le_quotes[i].id ) {
          le_quotes[i].isSaved = !le_quotes[i].isSaved;
          break;
        }
      }

      return {
        quotes: le_quotes
      }

    });


  },

  toggleThanks: function(){
    this.setState( function( old ) {
      return {
        thanks: !old.thanks
      }
    });
  },

  removeInternetWarning: function() {
    this.setState( function( old ) {
      return {
        internet_warning: true
      }
    });
  },

  render: function() {

    let popupClasses = classNames({
      'popup': true,
      'popup-hidden': this.state.thanks
    });

    let warningClasses = classNames({
      'popup': true,
      'popup-hidden': this.state.internet_warning
    });

    return (
      <div>
        <header className="header">
          <img className="header__logo "src="dist/img/logo.svg" width="40px" onClick={this.toggleThanks}/>
          <div className="header__title">Quote it</div>
          <span className="header__add icon-add" onClick={this.callQuote}></span>
        </header>
        <section className="quotes">
          {this.state.quotes.map( ( val ) => {
            return (
              <Quote
                key={val.id}
                isSaved={val.isSaved}
                text={val.quoteText}
                author={val.quoteAuthor}
                id={val.id}
                save = {this.saveQuote}
              />
            )
          })}
        </section>
        <section className={popupClasses}  onClick={this.toggleThanks} >
          <div className="popup__content">
            Thanks to <strong>forismatic.com</strong> for the quotes.
          </div>
        </section>
        <section className={warningClasses}  onClick={this.removeInternetWarning} >
          <div className="popup__content">
            Check if you are connected to internet.
          </div>
        </section>
      </div>
    );
  }
});
