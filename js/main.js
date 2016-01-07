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

  render: function() {

    return (
      <div>
        <header className="header">
          <span className="add icon-add" onClick={this.callQuote}></span>
        </header>
        <section className="content">
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