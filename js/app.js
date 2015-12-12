(function(){

  var $container = $('#container');

  var ViewQuote = function( quote ) {
    return `<div class="quote">
    <span class="text">
      ${quote.text}
    </span>
    <span class="author">
      ${quote.author}
    </span>
  </div>`;
  };

  var Quote = function( text, author ) {
    this.text = text;
    this.author = author;
  }

  var quotes = [
    new Quote( 'Don\'t wait for the perfect moment, take the moment and make it perfect.', 'David Sayward' ),
    new Quote( 'Don\'t cry because it\'s over. Smile because it happened.', 'Dr. Seus' ),
    new Quote( 'He who is brave is free.', 'Lucius Annaeus Seneca' ),
    new Quote( 'The eye of a human being is a microscope, which makes the world seem bigger than it really is.', 'Khalil Gibran' ),
    new Quote( 'Be yourself; everyone else is already taken.', 'Oscar Wilde' ),
    new Quote( 'I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.', 'Maya Angelou' ),
    new Quote( 'Without music, life would be a mistake.', ' Friedrich Nietzsche' ),
  ];

  var app = (function() {

    var nQuotes = quotes.length;
    console.log(nQuotes);
    var index = 0;

    return {
      incrementIndex: function(){
        if( index < (nQuotes - 1) ) {
          index++;
        } else {
          console.log('here');
          index = 0;
        }
      },
      getIndex: function() {
        return index;
      }
    };

  })();

  var i=0;
  $('body').click(function() {
    $container.prepend( ViewQuote( quotes[app.getIndex()] ) );
    app.incrementIndex();
    console.log(app.getIndex());
  });


})();
