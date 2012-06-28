'use strict';


$(function() {
  var $alertViewBackdrop = $('<div class="alert-view-backdrop"/>');
  $(document.body).append($alertViewBackdrop);
  
  window.AlertView = {
    show: function(title, message, primaryButton, secondaryButton, buttonHandler) {
      var $alertViewElement = $('<div class="alert-view animated bounceIn"/>');
      var $titleElement = $('<h1>' + title + '</h1>').appendTo($alertViewElement);
      var $messageElement = $('<p>' + message + '</p>').appendTo($alertViewElement);

      if (secondaryButton) $('<a data-button-index="1" href="#">' + secondaryButton + '</a>').appendTo($alertViewElement);
      $('<a class="alert-button-primary' + (!secondaryButton ? ' alert-button-single' : '') + '" data-button-index="0" href="#">' + primaryButton + '</a>').appendTo($alertViewElement);
    
      // Add the alertViewElement just before the backdrop
      $alertViewBackdrop.before($alertViewElement);
      
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