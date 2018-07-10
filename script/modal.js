var modalContainer = $('.modal-container');

// サムネやタイトルを自動埋め込み
$(function() {
  $(".modal-inner").each( function(index, element) {
    var modalId = $(element).attr("id");
    var thumbId = modalId + "-thumb";
    var imageUrl =  $(element).find(".thumbnail").attr("src");
    var title =  $(element).find("h1").html();

    $("#" + thumbId).css({
      "background-image": "url('"+ imageUrl +"')",
      "color": "red"
    });

    $("#" + thumbId).find(".slider-title").html(title);
  });
});

$(document).keydown( function(event){
  // ESCAPE key
  if (event.keyCode == 27 && modalOpen) {
    closeModal();
  }
});

function openModal(elem) {
  elem.show();
  modalContainer.fadeIn(400);
  canScroll = false;
  modalOpen = true;
}

function closeModal() {
  modalContainer.fadeOut(200, function (){
    $('article').hide();
  });

  canScroll = true;
  modalOpen = false;
}
