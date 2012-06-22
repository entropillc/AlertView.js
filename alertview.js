'use strict';


$(function() {
  var $alertViewBackdrop = $('<div class="alert-view-backdrop"/>');
  $(document.body).append($alertViewBackdrop);
  
  window.AlertView = {
    show: function(title, message, primaryButton, secondaryButton, buttonHandler) {
      var $alertViewElement = $('<div class="alert-view"/>');
      var $titleElement = $('<h1>' + title + '</h1>').appendTo($alertViewElement);
      var $messageElement = $('<p>' + message + '</p>').appendTo($alertViewElement);

      if (secondaryButton) $('<a data-button-index="1" href="#">' + secondaryButton + '</a>').appendTo($alertViewElement);
      $('<a class="alert-button-primary' + (!secondaryButton ? ' alert-button-single' : '') + '" data-button-index="0" href="#">' + primaryButton + '</a>').appendTo($alertViewElement);
    
      // Add the alertViewElement just before the backdrop
      $alertViewBackdrop.before($alertViewElement);
      // Listen for the transition end event
      var i = 2;
      $alertViewElement.bind('webkitTransitionEnd transitionend MSTransitionEnd oTransitionEnd transitionEnd', function() {
        $alertViewElement.addClass('av-zoom-' + i++);
      });
      
      // Call offset() to force a redraw before adding the av-zoom class
      $alertViewElement.offset();
      $alertViewElement.addClass('av-zoom-1');
      
      $alertViewElement.delegate('a', 'click', function(evt) {
        evt.preventDefault();
      
        if (buttonHandler && typeof buttonHandler === 'function') {
          buttonHandler(parseInt($(this).attr('data-button-index'), 10));
        }
      
        $alertViewElement.remove();
      });
    }
  };

});