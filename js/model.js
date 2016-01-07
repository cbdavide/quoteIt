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
      let quotes = localStorage.quotes || '[]';
      return JSON.parse(quotes);
    },

    isSaved: function( id ) {
      let model = this.getQuotes();

      for(var i=0; i<model.length; i++) {
        if( model[i].id === id ){
          return true;
        }
      }
      return false;
    },

    saveQuote: function( quote ) {
      let model = this.getQuotes();
      model.unshift( quote );
      this.updateModel( model );
    },

    removeQuote: function( id ) {
      let model = this.getQuotes();
      model.splice( this.quoteIndex( id ), 1 );
      this.updateModel( model );
    }
  };
}

module.exports = QuoteModel;
