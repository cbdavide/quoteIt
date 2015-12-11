var $container = $('#container');

//View
var Element = function( tag, className, value ) {
  this.tag = tag;
  this.className = className;
  this.value = value;
}

Element.prototype.render = function( child ) {
  return (
    `<${this.tag} class="${this.className}"> \n ${this.value||child} \n </${this.tag}>`
  );
};

//Model
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


var author = new Element( 'span', 'author', 'David Sayward' );
var text = new Element ( 'span', 'text', 'Don\'t wait for the perfect moment, take the moment and make it perfect.' );
var child = text.render() + author.render();
var quoti = new Element( 'div', 'quote' );
$container.append( quoti.render( child ) );
console.log( quoti.render( child ) );
