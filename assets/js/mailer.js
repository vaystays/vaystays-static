$(document).ready(function(){
  ajaxMailChimpForm($("#mce-mailer"), $("#mce-mailer-response"));

  function ajaxMailChimpForm($form, $resultElement){
      $form.submit(function(e) {
          e.preventDefault();
          if (!isValidEmail($form)) {
              var error =  "Please enter a valid email address.";
              $resultElement.empty().removeClass('success attempting').addClass('error');
              $('#mc-embedded-subscribe').removeClass('success attempting');
              $resultElement.html(error);
          } else {
              $resultElement.empty().removeClass('error success').addClass('attempting');
              $('#mc-embedded-subscribe').removeClass('error success').addClass('attempting');
              $resultElement.html("Subscribing.");
              submitSubscribeForm($form, $resultElement);
          }
      });
  }
});

function isValidEmail($form) {
    var email = $form.find("#mce-EMAIL").val();
    if (!email || !email.length) {
        return false;
    } else if (email.indexOf("@") == -1) {
        return false;
    }
    return true;
}

function submitSubscribeForm($form, $resultElement) {
    $.ajax({
        type: "GET",
        url: $form.attr("action"),
        data: $form.serialize(),
        cache: false,
        dataType: "jsonp",
        jsonp: "c", // trigger MailChimp to return a JSONP response
        contentType: "application/json; charset=utf-8",
        error: function(error){
            // According to jQuery docs, this is never called for cross-domain JSONP requests
        },
        success: function(data){
            if (data.result != "success") {
                var message = data.msg || "Sorry. Unable to subscribe at this time. Please try again later.";
                $resultElement.empty().removeClass('success attempting').addClass('error');
                $('#mc-embedded-subscribe').removeClass('success attempting');
                $resultElement.html(message);
            } else {
                $resultElement.empty().removeClass('error attempting').addClass('success');
                $('#mc-embedded-subscribe').removeClass('error attempting').addClass('success');
                $resultElement.html("Almost finished! We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you.");
                setTimeout(function() {
                  closeLightbox();
                },4000);
            }
        }
    });
}
