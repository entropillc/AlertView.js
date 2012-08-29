'use strict';


$(function() {
  var $alertViewBackdrop = $('<div class="alert-view-backdrop"/>');
  $(document.body).append($alertViewBackdrop);
  
  /**
    Shows the AlertView modal.
    @param {Object} Optional properties: title, message, buttons, and callback.
  */
  window.AlertView = {
    show: function(settings) {
      var title = settings.title;
      var message = settings.message;
      var buttons = settings.buttons;
      var callback = settings.callback;

      var $alertViewElement = $('<div class="alert-view animated bounceIn"/>');
      
      if (title) $('<h1>' + title + '</h1>').appendTo($alertViewElement);
      
      if (message) $('<p>' + message + '</p>').appendTo($alertViewElement);
      
      if (buttons) {
        var numberOfButtons = buttons.length;
        if (numberOfButtons > 0) {
          $alertViewElement.addClass('button-count-' + numberOfButtons);
          for (var i = 0; i < numberOfButtons; i++) {
            $('<a ' + (i === 0 ? 'class="alert-button-primary" ' : '') + 'data-button-index="' + i + '" href="#">' + buttons[i] + '</a>').appendTo($alertViewElement);
          }
        }
      }

      if (callback && typeof callback === 'function') {
        $alertViewElement.delegate('a', 'click', function(evt) {
          evt.preventDefault();
        
          callback(parseInt($(this).attr('data-button-index'), 10));
        
          $alertViewElement.remove();
        });
      }

      // Add the alertViewElement just before the backdrop
      $alertViewBackdrop.before($alertViewElement);
    }
  };

});