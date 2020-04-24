(function () {
  var roomId = $('#room-id').val();
  if (!roomId) {
    return;
  }

  var $messageArea = $('.message-area');
  var $messageForm = $('.message-form textarea');
  var messagesExpanded = false;

  $(function () {
    scrollToBottom($messageArea);
    onEnterMessageform();
  });

  function onEnterMessageform () {
    $messageForm.on('keydown', function (e) {
      if (!this.value || !this.value.trim()) return;
      if (e.keyCode == 13) {
        e.preventDefault();
        $('form#new_message').submit();
        $messageForm.val('');
      }
    });
  }

  function setRoomTitleExpander () {
    var titleBox = $('.room-chat-header-title').first();

    if (titleBox[0].scrollHeight > 200) {
      titleBox.addClass('room-chat-header-title-long');
    } else {
      titleBox.removeClass('room-chat-header-title-long');
    }
  }
})();
