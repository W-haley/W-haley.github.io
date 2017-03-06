
  $(document).ready(function(){
	$('.boxcaption').hide();
	  $('.boxgrid').hover(function(){
		  $(".boxcaption", this).stop().fadeIn(10);
	  }, function() {
		  $(".boxcaption", this).stop().fadeOut(10);
	  });
  });




