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

// scroll when you click on the menu

$(document).ready(function(){
  $("#menu").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
  });
});

$(document).ready(function() {
  $('.menu-item').click(function(event) {
      $('.header__burger, .header__menu').removeClass('active');

  })
})

// rating
for (var i=1; i<5; i++) {
      (function(N){
          var container = document.querySelector('.rating_block'+N);
          var items = container.querySelectorAll('.label_rating')
          container.onclick = function(e) {
              if( ! e.target.classList.contains('active') ){
                  items.forEach(function(item){
                      item.classList.remove('active');
                  });
                  e.target.classList.add('active');
              }
          }
      })(i);
  };
  
