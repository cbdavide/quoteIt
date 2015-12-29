var QuoteModel = require( './model' ),
    QuoteView = require( './quote' );

var model = QuoteModel();

var Main = React.createClass({

  getInitialState: function() {
    return {
      quotes: model.getQuotes()
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
  },

  render: function() {

    if(this.state.quotes === []) {
      return (
        <div>
          <span className="placeholder">
            Click for a random quote.
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <header className="header">
            <span className="add icon-add" onClick={this.callQuote.bind(this)}></span>
          </header>
          <div className="content">
            {this.state.quotes.map( ( val ) => {
              return (
                <QuoteView
                  text={val.quoteText}
                  author={val.quoteAuthor}
                  id={val.id}
                  save = {this.saveQuote}
                />
              )
            })}
          </div>
        </div>
      );
    }
  }
});

module.exports = Main;
