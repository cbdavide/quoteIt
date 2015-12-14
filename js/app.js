(function(){

  var $container = $('#container');
  var quotes = [];

  var ViewQuote = function( text, author ) {
    return `<div class="quote">
    <span class="text">
      ${text}
    </span>
    <span class="author">
      ${author}
    </span>
  </div>`;
  };

  $('body').click(function() {
    $.ajax({
      url: 'http://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data : {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      }
    }).done(function(response){

      $container.prepend( ViewQuote( response.quoteText, response.quoteAuthor ) );

      quotes.push( response );

    }).fail(function(err) {
      console.log('err');
    });

  });

})();
