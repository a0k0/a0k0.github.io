$(function(){
  wrapper = $(".main-grid");
  content = $('section');
  scrollSpeed = 500;
  scrollEasing = 'swing';

  currentContentNum = Math.ceil($('body,html').scrollTop() / $(window).height());
  targetContentNum = Math.ceil(currentContentNum);
  targetPosition = 0;

  canScroll = true;

  $(window).load(function(){
    if(location.hash === "#commission") {
      openForm($("#commission"));
    } else if (location.hash === "#contact") {
      openForm($("#contact"));
    }

    // Page link
    $('a[href^=#]').click(function() {
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      targetPosition = target.offset().top;
      $('body,html').animate({
        scrollTop: targetPosition
      }, scrollSpeed, scrollEasing, function() {
        currentContentNum = $('body,html').scrollTop() / $(window).height();
      });

      ga('send', 'event', {
        eventCategory: 'ankerLink',
        eventAction: 'click',
        eventLabel: hash
      });

      setTimeout( function(){ location.hash = href;} ,scrollSpeed );
      return false;
   });

    // MouseWheelEvent
    var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).on(mousewheelevent,function(e){
      if(canScroll) {
        var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
        delta < 0 ? motionDown() : motionUp();
      }
    });

    // KeyEvent
    $('html').keydown(function(e){
      if(canScroll) {
        var acvStgSwP = parseInt($('body').attr('data-page'));
        switch(e.which){
          case 33: // Key[PgUp]
          e.preventDefault();
          motionUp();
          break;

          case 34: // Key[PgDn]
          e.preventDefault();
          motionDown();
          break;

          case 38: // Key[↑]
          e.preventDefault();
          motionUp();
          break;

          case 40: // Key[↓]
          e.preventDefault();
          motionDown();
          break;
        }
      }
    });

    // ScrollUpEvent
    function motionUp(){
      if (currentContentNum > 0) {
        canScroll = false;

        $('input,textarea,select').blur();
        targetContentNum = currentContentNum - 1;
        targetPosition = content.eq(targetContentNum).offset().top;
        var hash = content.eq(targetContentNum).attr("id");

        $('body,html').animate({
          scrollTop: targetPosition
        }, scrollSpeed, scrollEasing, function(){
          var hash = content.eq(targetContentNum).attr("id");
          location.hash = hash;
          setTimeout(function(){ canScroll = true; }, 500);
          currentContentNum = targetContentNum;
        });

        ga('send', 'event', {
          eventCategory: 'ankerLink',
          eventAction: 'scroll',
          eventLabel: hash
        });
      }
    }

    // ScrollDownEvent
    function motionDown(){
      if (currentContentNum < 3) {
        canScroll = false;

        $('input,textarea,select').blur();
        targetContentNum = currentContentNum + 1;
        targetPosition = content.eq(targetContentNum).offset().top;
        var hash = content.eq(targetContentNum).attr("id");

        $('body,html').animate({
          scrollTop: targetPosition
        }, scrollSpeed, scrollEasing, function(){
          location.hash = hash;
          setTimeout(function(){ canScroll = true; }, 500);
          currentContentNum = targetContentNum;
        });

        ga('send', 'event', {
          eventCategory: 'ankerLink',
          eventAction: 'scroll',
          eventLabel: hash
        });
      }
    }
  });
});

function openForm(page) {
  canScroll = false;
  $('aside').fadeOut();
  page.fadeIn();
  targetPosition = page.offset().top;
  targetPositionX = page.offset().left;

  $('body,html').animate({
    scrollTop: targetPosition,
    scrollLeft: targetPositionX
  }, scrollSpeed, scrollEasing , function(){
    location.hash = page.attr("id");
  });
}

function closeForm() {
  targetPosition = $("#about").offset().top;
  targetPositionX = $("#about").offset().left;
  $("textarea, input, select").val("").end().find(":checked").prop("checked", false);

  $('body,html').animate({
    scrollTop: targetPosition,
    scrollLeft: targetPositionX
  }, scrollSpeed, scrollEasing, function(){
    $('aside').hide();
    canScroll = true;
    location.hash = "about";
  });
}

function postCommissionToGoogle() {
  var name = $('#commission-name').val();
  var mail = $('#commission-mail').val();
  var type = $('#commission-type').val();
  var payment = $('#commission-payment').val();
  var message = $('#commission-message').val();
  var option = '';

  $('#commission-option input:checked').each( function(index, element) {
    if(index > 0) { option += "\n"; }
    option += "・" + $(element).val();
  });

  $.ajax({
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeuaQOVcwFVj73my6Y1vY-UzhcGWQmNmXhTExDCj4TSbCgmRA/formResponse",
    data: {
      "entry.1298070247": name,
      "entry.656778155": mail,
      "entry.1692161972": type,
      "entry.1323144998": option,
      "entry.1214845517": payment,
      "entry.802422417": message
    },
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function() {
        openForm($('#thankyou'));
      },
      200: function() {
        openForm($('#thankyou'));
      }
    }
  });
}

function postContactToGoogle() {
  var name = $('#contact-name').val();
  var mail = $('#contact-mail').val();
  var type = $('#contact-type').val();
  var message = $('#contact-message').val();

  $.ajax({
    url: "https://docs.google.com/forms/d/e/1FAIpQLScPsIKQrlmpZqFfBzOm52pM56E63gCxCaOjwbAAIpj_C6jZYw/formResponse",
    data: {
      "entry.211178764": name,
      "entry.899559899": mail,
      "entry.787815288": type,
      "entry.1555220329": message
    },
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function() {
        openForm($('#thankyou'));
      },
      200: function() {
        openForm($('#thankyou'));
      }
    }
  });
}
