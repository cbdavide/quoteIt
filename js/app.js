$(document).ready(function(){
  var $container = $('#container');

  var Element = function( tag, className, value ){

    this.tag = tag;
    this.className = className;
    this.value = value;

  }

  var createElement = function( element ) {

    return (`<${element.tag} class="${element.className}">\n${element.value}\n</${element.tag}>\n`);

  }


  var quote = new Element( 'div', 'quote kblue', '');
  var quoteText = new Element( 'span', 'text', 'Don\'t wait for the perfect moment, take the moment and make it perfect.');
  var author = new Element( 'span', 'author', 'Zoey Sayward' );


  var texti = createElement( quoteText );
  var author = createElement( author );

  quote.value = texti + author;

  var quoti = createElement( quote );

  console.log( quoti );

  $container.append( quoti );


  $container.masonry({
    itemSelector : '.quote',
    isFitWidth: true
  });
});
