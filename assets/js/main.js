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
  $(document).on('click','.intercom-toggle', function(e) {
    e.preventDefault();
    if(typeof(Intercom) === 'function') {
      Intercom('show');
    } else {
      alert('Sorry, our chat functionality is not available at the moment.');
    }
  });
});

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
