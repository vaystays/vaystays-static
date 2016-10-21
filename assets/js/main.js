$(function() {
  setHeaderStalkState();
  $(window).resize(function() {
    setHeaderStalkState();
  });
  $(window).scroll(function() {
    setHeaderStalkState()
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
