var QuoteModel = require( './model' ),
    QuoteView = require( './quote' );

var model = QuoteModel();

var Main = React.createClass({

  getInitialState: function() {

    let le_quotes = model.getQuotes();

    le_quotes.forEach( (element) => {
      element.isSaved = true;
    });

    return {
      quotes: le_quotes
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
    }).fail(function(err) {
      console.log('Err -> Quote did not arrive :c');
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

      for(let quote of le_quotes) {
          if(id == quote.id){
              quote.isSaved = !quote.isSaved;
              break;
          }
      }

      return {
        quotes: le_quotes
      }

    });


  },

  toggleThanks: function(){},

  render: function() {

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
              <QuoteView
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
      </div>
    );
  }
});

module.exports = Main;
