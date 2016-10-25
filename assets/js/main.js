$(function() {
  setHeaderStalkState();
  $(window).resize(function() {
    setHeaderStalkState();
  });
  $(window).scroll(function() {
    setHeaderStalkState()
  });
  $(document).on('click','.header-nav-toggle', function(e) {
    e.preventDefault();
  });
  $(document).on('click','#intercom-toggle', function(e) {
    e.preventDefault();
    if(typeof(Intercom) === 'function') {
      Intercom('show');
    } else {
      alert('Sorry, our chat functionality is not available at the moment.');
    }
  });
});

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
