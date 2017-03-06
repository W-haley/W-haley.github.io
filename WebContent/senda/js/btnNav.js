$(document).ready(function(){
	$('.btnNav li a').click(function(){
		$('.blackBox').hide();
		$('.btnNav').hide();
		$(".menu_btn").addClass("off");
		$(".menu_btn").removeClass("on");
	});
})