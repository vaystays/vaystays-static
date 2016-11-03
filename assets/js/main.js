
$(function() {
  setHeaderStalkState();
  $(window).resize(function() {
    setHeaderStalkState();
    checkNavState();
  });
  $(window).scroll(function() {
    setHeaderStalkState()
  });
  $(document).on('click','#header-nav-toggle-link', function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-shown');
    $('#header-nav-toggle-link').toggleClass('nav-shown');
  });
  $(document).on('click','#link-subscribe', function(e) {
    e.preventDefault();
    fillLightboxIfAvailable(false, '/header-mailer');
  });
  $(document).on('click','.lightbox-container', function(e) {
    if(($(e.target).hasClass('lightbox-container'))) {
      closeLightbox();
    }
  });
  $(document).on('click','.lightbox-close', function(e) {
      e.preventDefault();
      closeLightbox();
  });
  $(document).on('submit','.lightbox-mailer #mc-embedded-subscribe-form', function(e) {
    alert('bunz');
  });
  $(document).on('click','.intercom-toggle', function(e) {
    e.preventDefault();
    if(typeof(Intercom) === 'function') {
      Intercom('show');
    } else {
      alert('Sorry, our chat functionality is not available at the moment.');
    }
  });
  monitorVisibility();
  monitorTime();
});

function closeLightbox() {
  $('#lightbox-target').removeClass('lightbox-shown');
  setTimeout(function() {
    $('#lightbox-target').empty();
  },300);
}

function monitorTime() {
  setTimeout(function() {
    fillLightboxIfAvailable(true, '/inactive-mailer');
  }, 15000);
}


function monitorVisibility() {
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  $(document).on('mouseleave', 'body', function() {
  	handleVisibilityChange();
  });
}

function handleVisibilityChange() {
  fillLightboxIfAvailable(true, '/unfocus-mailer');
}

function fillLightboxIfAvailable(checkCookie, lightboxTarget) {
  if(!checkCookie || !getCookie("subscribeLightbox")) {
    document.cookie = "subscribeLightbox=true";
    var $lightboxTarget = $('#lightbox-target');
    if($lightboxTarget.is(':empty')) {
      $lightboxTarget.load(lightboxTarget, function( response, status, xhr ) {
        if(status === 'success') {
          setTimeout(function() {
            $lightboxTarget.addClass('lightbox-shown');
          },100);
        }
      });
    }
  }
}

function checkNavState() {
  var windowWidth = $(window).width();
  if(windowWidth >= 800) {
    $('body').removeClass('nav-shown');
    $('#header-nav-toggle-link').removeClass('nav-shown');
  }
}

function setHeaderStalkState() {
  var preheaderHeight = $('.site-preheader').outerHeight();
  var hasPreheaderWidth = 800;

  var windowWidth = $(window).width();
  var windowYPos = $(window).scrollTop();

  if(windowWidth < hasPreheaderWidth || windowYPos >= preheaderHeight) {
    $('body').addClass('header-stalk');
  } else {
    $('body').removeClass('header-stalk');
  }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
