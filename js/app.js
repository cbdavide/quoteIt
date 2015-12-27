var quotis = [
  {
    'quoteText': 'Quote1',
    'quoteAuthor': 'Author 1'
  },
  {
    'quoteText': 'Quote2',
    'quoteAuthor': 'Author 2'
  }
]

localStorage.quotes = JSON.stringify(quotis);

(function(){

  var Quote = React.createClass({

    render: function() {

      return (
        <div className="quote" onClick={this.props.save.bind(null, this.props.text, this.props.author)}>
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

    saveQuote: function( text, author ) {
      console.log('here');
      var quotes = JSON.parse( localStorage.quotes ) || [];
      quotes.unshift({
        quoteText: text,
        quoteAuthor: author
      });
      localStorage.setItem( 'quotes', JSON.stringify( quotes ) );
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
