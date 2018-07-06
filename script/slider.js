var currentSlide = 0;
var currentSlidePosition = 0;
var sliderWidth = 0;
var sliderSpeed = 400;

$(function(){
  toggleSlideNav($('.slider1'));
});

function slide(slider, angle) {
  var targetSlidePosition = 0;
  sliderWidth = slider.children("ul").width() + 10;
  currentSlidePosition = slider.children("ul").scrollLeft();

  if (angle === "next") {
    targetSlidePosition = currentSlidePosition + sliderWidth;
    currentSlide += 1;
  } else {
    targetSlidePosition = currentSlidePosition - sliderWidth;
    currentSlide -= 1;
  }

  toggleSlideNav(slider);
  slider.children("ul").animate({ scrollLeft: targetSlidePosition }, sliderSpeed, scrollEasing);
}

function toggleSlideNav(slider) {
  var sliderLiNum = slider.find("li").length;
  var slideNum = Math.ceil(sliderLiNum / 3) - 1;

  if (currentSlide === 0) {
    $('.slider-nav-prev').fadeOut(300);
    $('.slider-nav-next').fadeIn(300);
  } else if (currentSlide >= slideNum) {
    $('.slider-nav-next').fadeOut(300);
    $('.slider-nav-prev').fadeIn(300);
  } else {
    $('.slider-nav-prev').fadeIn(300);
    $('.slider-nav-next').fadeIn(300);
  }
}
