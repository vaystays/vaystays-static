$(document).ready(function(){
  ajaxFormSpreeForm($('.activation-mailer form'), $('.activation-mailer #mailer-response'));

  function ajaxFormSpreeForm($form, $resultElement) {
    $form.submit(function(e) {
    	e.preventDefault();
      if (!isRequiredFields($form)) {
        var error =  "Please complete all non-optional fields.";
        $resultElement.empty().removeClass('success attempting').addClass('error');
        $resultElement.html(error);
      } else if (!isValidEmail($form)) {
          var error =  "Please enter a valid email address.";
          $resultElement.empty().removeClass('success attempting').addClass('error');
          $resultElement.html(error);
      } else {
        submitFormspreeForm($form, $resultElement);
      }

    });
  }
});

function submitFormspreeForm($form, $resultElement) {
  $.ajax({
    url: 'http://formspree.io/direct@vaystays.com',
    method: 'POST',
    data: $form.serialize(),
    dataType: 'json',
    beforeSend: function() {
      $resultElement.empty().removeClass('error success').addClass('attempting');
      $('.activation-mailer form').removeClass('error success').addClass('attempting');
      $resultElement.html("Sending.");
    },
    success: function(data) {
      $resultElement.empty().removeClass('error attempting').addClass('success');
      $('.activation-mailer form').removeClass('error attempting').addClass('success');
      $resultElement.html("Your message has been sent! We’ll respond to your inquiry within 24 hours.");
      setTimeout(function() {
        $('.activation-mailer').html("<h2>Thank you</h2><p>Your message has been sent! We’ll respond to your inquiry within 24 hours.</p>");
      },2000);
    },
    error: function(err) {
      var message = "Sorry. Unable to send at this time. Please try again later.";
      $resultElement.empty().removeClass('success attempting').addClass('error');
      $('.activation-mailer form').removeClass('success attempting');
      $resultElement.html(message);
    }
  });
}

function isRequiredFields($form) {
    var $req = $form.find(".required");
    var isRequired = true;
    $req.each(function(i, el) {
      var text = $(el).val();
      if(!text || !text.length) {
        isRequired = false;
      }
    });
    return isRequired;
}


function isValidEmail($form) {
    var email = $form.find("#form-email").val();
    if (!email || !email.length) {
        return false;
    } else if (email.indexOf("@") == -1) {
        return false;
    }
    return true;
}
