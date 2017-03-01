$(document).ready(function() {
	var hamburgerM = true;
	var documentHeight =  $(document).height();
	$(".menu_btn").click(function(){
		documentHeight =  $(document).height();
		$(".menu_btn").addClass("on");
		$(".menu_btn").removeClass("off");
		$('.blackBox').css('height',documentHeight);
		$('.blackBox').show();
		$('.btnNav').show();
		hamburgerM = false;
	});
	$('.blackBox').click(function(){
		$('.blackBox').hide();
		$('.btnNav').hide();
		$(".menu_btn").addClass("off");
		$(".menu_btn").removeClass("on");
		hamburgerM = true;
	});
});