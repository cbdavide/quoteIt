var QuoteModel = require( './model' );

var quotis = [
  {
    'id': 'id1',
    'quoteText': 'Quote1',
    'quoteAuthor': 'Author 1'
  },
  {
    'id': 'id2',
    'quoteText': 'Quote2',
    'quoteAuthor': 'Author 2'
  }
]

localStorage.quotes = JSON.stringify(quotis);

(function(){

  var Quote = React.createClass({

    render: function() {

      return (
        <div className="quote" onClick={this.props.save.bind( null, this.props.text, this.props.author, this.props.id )}>
          <span className="text">
            {this.props.text}
          </span>
          <div className="info icon-star">
            <span className="author">
              {this.props.author}
            </span>
            <span className="fav"></span>
          </div>
        </div>
      );
    }
  });

  var App = React.createClass({

    getInitialState: function() {
      var temp_quotes = []

      if( localStorage.quotes ) {
        temp_quotes = JSON.parse( localStorage.getItem( 'quotes' ) );
      }
      return {
        quotes: temp_quotes
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

    /**
     * Verify if the quote is already saved.
     *
     * @param quotes - Array of quotes.
     * @param id - Id of the quote to look for.
     * @return {Boolean} - Quote exist or not.
     */
    isSaved: function( quotes, id ) {
      var cond = false;
      quotes.forEach( element => {
        if( element.id === id )
          cond = true;
      });
      return cond;
    },

    saveQuote: function( text, author, id ) {
      var quotes = JSON.parse( localStorage.quotes ) || [];
      if( !this.isSaved( quotes, id ) ) {
        quotes.unshift({
          id: id,
          quoteText: text,
          quoteAuthor: author
        });
        localStorage.setItem( 'quotes', JSON.stringify( quotes ) );
      } else {
        console.log( 'This quote is alrady saved.' );
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
          <div className="content" onClick={this.callQuote.bind(this)}>
            {this.state.quotes.map( ( val ) => {
              return (
                <Quote
                  text={val.quoteText}
                  author={val.quoteAuthor}
                  id={val.id}
                  save = {this.saveQuote}
                />
              )
            })}
          </div>
        );
      }
    }
  });

  ReactDOM.render( <App />, document.getElementById('continer') )

})();
