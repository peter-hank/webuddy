(function () {
  var roomId = $('#room-id').val();
  var userId = $('#user-id').val();
  if (!roomId) {
    return;
  }

  var $messageArea = $('.message-area');
  var $messageForm = $('.message-form textarea');

  App.room = App.cable.subscriptions.create({ channel: 'RoomChannel', room_id: roomId }, {
    received: function (data) {
      switch (data.action) {
        case 'new_message':
          addNewMessage(data.data);

          break;
        case 'muted_user':
          removeMessagesOfMutedUser(data.data);
          muteMutedUser(data.data);

          break;
        case 'unmuted_user':
          reloadMessages();
          unmuteMutedUser(data.data);

          break;
        default:

      }
    }
  });

  function addNewMessage (data) {
    let goDown = false;

    if($messageArea.scrollTop() + $messageArea.innerHeight() >= $messageArea[0].scrollHeight) {
      goDown = true;
    }

    let element = $(data.message);
    let elementData = $(data.message).data();

    if (parseInt(elementData.userId) != parseInt($('#user-id').val())) {
      element.find('.message-user').removeClass('message-user-own');
    }

    $messageArea.append(element);

    if (goDown === true) {
      scrollToBottom($messageArea);
    }
  }

  function removeMessagesOfMutedUser (data) {
    $(`.message-area .message-item[data-user-id='${data.muted_user_id}']`).remove();
  }

  function muteMutedUser (data) {
    if (data.muted_user_id === parseInt(userId)) {
      $messageForm.prop('disabled', true);
      $messageForm.val('You\'ve been muted in this room and can\'t post any new messages');
    }
  }

  function unmuteMutedUser (data) {
    if (data.unmuted_user_id === parseInt(userId)) {
      $messageForm.prop('disabled', false);
      $messageForm.val('');
    }
  }

  function reloadMessages (data) {
    $.get(`/rooms/${roomId}/messages`, {
      access_token: $('#access-token').val()
    }, function (data) {
      var list = $('.message-area').first();
      list.html(data);
    })
  }
})();
