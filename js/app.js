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
        <div className="quote">
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
      var suppa = this;
      $.ajax({
        url: 'http://api.forismatic.com/api/1.0/',
        jsonp: 'jsonp',
        dataType: 'jsonp',
        data : {
          method: 'getQuote',
          lang: 'en',
          format: 'jsonp'
        }
      }).done(function( data ){
        suppa.setState( function ( old ) {
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
            {this.state.quotes.map(function( val ){
              return (
                <Quote text={val.quoteText} author= {val.quoteAuthor} />
              )
            })}
          </div>
        );
      }
    }
  });

  ReactDOM.render( <App />, document.getElementById('continer') )

})();
