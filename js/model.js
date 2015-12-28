var QuoteModel = function( ) {

  var model = JSON.parse( localStorage.quotes ) || [];

  this.updateModel = function() {
    localStorage.quotes = JSON.stringify( model );
  };

  this.quoteIndex = function( id ) {
    for(var i=0; i<model.length; i++) {
      if( model[i].id == id )
        return i;
    }
    return -1;
  };

  this.getQuotes = function() {
    return model;
  };

  this.isSaved = function( id ) {
    for(var i=0; i<model.length; i++) {
      if( model[i].id === id )
        return true;
    }
    return false;
  },

  this.saveQuote = function( quote ) {
    model.unshift( quote );
    updateModel();
  };

  this.removeQuote = function( id ) {
    model.splice( quoteIndex( id ), 1 );
    updateModel();
  };

}

module.exports = QuoteModel;
