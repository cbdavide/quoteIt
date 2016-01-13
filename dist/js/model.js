'use strict';

var app = app || {};

(function () {

  app.QuoteModel = function () {

    return {

      updateModel: function updateModel(quotes) {
        localStorage.quotes = JSON.stringify(quotes);
      },

      quoteIndex: function quoteIndex(id) {
        var model = JSON.parse(localStorage.quotes);

        for (var i = 0; i < model.length; i++) {
          if (model[i].id == id) return i;
        }
        return -1;
      },

      getQuotes: function getQuotes() {
        var quotes = localStorage.quotes || '[]';
        return JSON.parse(quotes);
      },

      isSaved: function isSaved(id) {
        var model = this.getQuotes();

        for (var i = 0; i < model.length; i++) {
          if (model[i].id === id) {
            return true;
          }
        }
        return false;
      },

      saveQuote: function saveQuote(quote) {
        var model = this.getQuotes();
        model.unshift(quote);
        this.updateModel(model);
      },

      removeQuote: function removeQuote(id) {
        var model = this.getQuotes();
        model.splice(this.quoteIndex(id), 1);
        this.updateModel(model);
      }
    };
  };
})();
