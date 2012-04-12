'use strict';

var AlertView = {
  show: function(title, message, buttonTitles, buttonHandler) {
    var $alertViewElement = $('<div class="alert-view"/>');
    var $titleElement = $('<h1>' + title + '</h1>').appendTo($alertViewElement);
    var $messageElement = $('<p>' + message + '</p>').appendTo($alertViewElement);
    var buttonWidth = (278 / buttonTitles.length) - 20;
    var $buttonElement;
    
    for (var i = 0, length = buttonTitles.length; i < length; i++) {
      if (i === length - 1) {
        $buttonElement = $('<a class="alert-button-primary" data-button-index="' + i + '" style="width: ' + buttonWidth + 'px;" href="#">' + buttonTitles[i] + '</a>').appendTo($alertViewElement);
      } else {
        $buttonElement = $('<a class="alert-button" data-button-index="' + i + '" style="width: ' + buttonWidth + 'px;" href="#">' + buttonTitles[i] + '</a>').appendTo($alertViewElement);
      }
    }
    
    $(document.body).append($alertViewElement);
    
    $alertViewElement.delegate('a', 'click', function(evt) {
      evt.preventDefault();
      
      if (buttonHandler && typeof buttonHandler === 'function') {
        buttonHandler(parseInt($(this).attr('data-button-index'), 10));
      }
      
      $alertViewElement.remove();
    });
  }
};
