var QuoteModel = function( ) {

  return {

    updateModel: function( quotes ) {
      localStorage.quotes = JSON.stringify( quotes );
    },

    quoteIndex: function( id ) {
      let model = JSON.parse(localStorage.quotes);

      for(var i=0; i<model.length; i++) {
        if( model[i].id == id )
          return i;
      }
      return -1;
    },

    getQuotes: function() {
      return JSON.parse(localStorage.quotes);;
    },

    isSaved: function( id ) {
      let model = JSON.parse(localStorage.quotes);

      for(var i=0; i<model.length; i++) {
        if( model[i].id === id ){
          return true;
        }
      }
      return false;
    },

    saveQuote: function( quote ) {
      let model = JSON.parse(localStorage.quotes);
      model.unshift( quote );
      this.updateModel( model );
    },

    removeQuote: function( id ) {
      let model = JSON.parse(localStorage.quotes);
      model.splice( this.quoteIndex( id ), 1 );
      this.updateModel( model );
    }
  };
}

module.exports = QuoteModel;
