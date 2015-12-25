'use strict';

var quotis = [{
  'quoteText': 'Quote1',
  'quoteAuthor': 'Author 1'
}, {
  'quoteText': 'Quote2',
  'quoteAuthor': 'Author 2'
}];

localStorage.quotes = JSON.stringify(quotis);

(function () {

  var $container = $('#container'),
      $placeholder = $('#placeholder');
  var quotes = [];

  var ViewQuote = function ViewQuote(text, author) {
    return '<div class="quote">\n    <span class="text">\n      ' + text + '\n    </span>\n    <span class="author">\n      ' + author + '\n    </span>\n  </div>';
  };

  //Load quotes
  if (localStorage.quotes) {
    $placeholder.remove();
    quotes = JSON.parse(localStorage.getItem('quotes'));

    //Print quotes
    quotes.forEach(function (val) {
      $container.append(ViewQuote(val.quoteText, val.quoteAuthor));
    });
  }

  $('body').one('click', function () {
    $placeholder.remove();
  });

  $('body').click(function () {
    $.ajax({
      url: 'http://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      }
    }).done(function (response) {

      $container.prepend(ViewQuote(response.quoteText, response.quoteAuthor));

      quotes.push(response);
    }).fail(function (err) {
      console.log('err');
    });
  });

  $('.quote').click(function () {
    console.log('here');
  });
})();
