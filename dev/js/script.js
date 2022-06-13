const SM_PC_OR_SMALLER_WIDTH = 1024;

$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');

    })
})

$(window).scroll(function(){
    var docscroll=$(document).scrollTop();
    if(docscroll>$(window).height()){
      $('.header').css({'height': $('.header').height(),'width': $('.header').width()}).addClass('fixed').css("width", "100%");

    }else{
      adaptiveResize($('.header'));
    }

  });

const adaptiveResize = (header) => {
  var actualHeight = header.css("width");
  var actualHeightNumber = retrieveNumberFromStringWithPx(actualHeight);

  if (actualHeightNumber <= SM_PC_OR_SMALLER_WIDTH) {
    header.css("width", "100%");
  } else {
    header.css("width", "80%");
  }

  header.removeClass('fixed');

}

const retrieveNumberFromStringWithPx = (stringWithPx) => {
  return parseInt(stringWithPx.replace("px", ""));
}