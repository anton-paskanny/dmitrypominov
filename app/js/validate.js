$(document).ready(function() {
  $('.contacts-form__inner').submit(function() {
    var str = $(this).serialize();
    $.ajax({
			type: "POST",
			url: "mailer.php",
			data: str,
      beforeSend: function() {
        $('#submit').prop('disabled', true);
        $('.btn-value').css('display', 'none');
        $('.loader').css('display', 'block');
        $('.contacts-form input').prop('disabled', true);
        $('.contacts-form textarea').prop('disabled', true);
      },
			success: function(msg) {
				if(msg === 'OK') {
					$('#result').html('<p>Сообщение успешно отправлено!</p>').css('opacity', 1);
          setTimeout(function() {
            $('#result').animate({
              opacity: 0
            }, 2000);
          }, 2000);
          $('.contacts-form input').prop('disabled', false).val('');
          $('.contacts-form textarea').prop('disabled', false).val('');
          $('.btn-value').css('display', 'block');
          $('.loader').css('display', 'none');
          $('#submit').prop('disabled', false);
				}
				else {
          result = msg;
          $('#result').html(result).css('opacity', 1);
          $('.contacts-form input').prop('disabled', false);
          $('.contacts-form textarea').prop('disabled', false);
          $('.btn-value').css('display', 'block');
          $('.loader').css('display', 'none');
          $('#submit').prop('disabled', false);
        }
			}
		});
    return false;
  }); // end submit
});
