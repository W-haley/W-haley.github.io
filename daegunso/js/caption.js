
  $(document).ready(function(){
	$('.img_caption').hide();
	  $('.img_box').hover(function(){
		  $(".img_caption", this).stop().fadeIn(400);
	  }, function() {
		  $(".img_caption", this).stop().fadeOut(400);
	  });
  });




