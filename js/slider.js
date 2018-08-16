var $slider = $(".slider"),
  $bullets = $(".bullets");
var slideInterval;
var slidedelay = 5000;

function calculateHeight() {
  var height = $(".slide.active").outerHeight();
  height = (height>500)?height:500;

  $slider.height(height);
}
/*
$(window).scroll(function () {
  console.log(isScrolledIntoView(".slider"))
  console.log(slideInterval);
  console.log("===")

  if(!isScrolledIntoView(".slider")){
      clearInterval(slideInterval);
  }

});
*/

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).resize(function() {
  calculateHeight();
  clearTimeout($.data(this, 'resizeTimer'));
});

function resetSlides() {
  $(".slide.inactive").removeClass("inactiveRight").removeClass("inactiveLeft");
}

function gotoSlide($activeSlide, $slide, className) {
  console.log(className)
  $activeSlide.removeClass("active").addClass("inactive " + className);
  $slide.removeClass("inactive").addClass("active");
  calculateHeight();
  resetBullets();
  setTimeout(resetSlides, 300);
}

$(".next").on("click", function() {
  gotoNextSlide();
});
$(".slider").on("mouseover",function(){
  clearInterval(slideInterval);
});
$(".slider").on("mouseleave",function(){
  slideInterval = setInterval(function(){gotoNextSlide()}, slidedelay);
});



function gotoNextSlide(){
  var $activeSlide = $(".slide.active"),
    $nextSlide = $activeSlide.next(".slide").length != 0 ? $activeSlide.next(".slide") : $(".slide:first-child");
  gotoSlide($activeSlide, $nextSlide, "inactiveLeft");
}
$(".previous").on("click", function() {
  var $activeSlide = $(".slide.active"),
    $prevSlide = $activeSlide.prev(".slide").length != 0 ? $activeSlide.prev(".slide") : $(".slide:last-child");

  gotoSlide($activeSlide, $prevSlide, "inactiveRight");
});
$(document).on("click", ".bullet", function() {
  if ($(this).hasClass("active")) {
    return;
  }
  var $activeSlide = $(".slide.active");
  var currentIndex = $activeSlide.index();
  var targetIndex = $(this).index();
  var $theSlide = $(".slide:nth-child(" + (targetIndex + 1) + ")");
  gotoSlide($activeSlide, $theSlide, currentIndex > targetIndex ? "inactiveRight" : "inactiveLeft");
})

function addBullets() {
  var total = $(".slide").length,
    index = $(".slide.active").index();
  for (var i = 0; i < total; i++) {
    var $bullet = $("<div>").addClass("bullet");
    if (i == index) {
      $bullet.addClass("active");
    }
    $bullets.append($bullet);
  }
}

function resetBullets() {
  $(".bullet.active").removeClass("active");
  var index = $(".slide.active").index() + 1;
  $(".bullet:nth-child(" + index + ")").addClass("active");
}
addBullets();
calculateHeight();
slideInterval = setInterval(function(){gotoNextSlide()}, slidedelay);
