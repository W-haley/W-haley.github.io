
  $(document).ready(function(){
	$('.boxcaption').hide();
	  $('.boxgrid').hover(function(){
		  $(".boxcaption", this).stop().fadeIn(60);
		  $(this).find("> p").addClass("select");
		  $(this).find("> p a").css("color","#fff");
	  }, function() {
		  $(".boxcaption", this).stop().fadeOut(60);
		  $(this).find("> p").removeClass("select");
		  $(this).find("> p a").css("color","#555");
	  });
  });

 




