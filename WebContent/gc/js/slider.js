
$(document).ready(function(){
	
	var gallery =	$('.gallery').bxSlider({
		auto: true,controls:false,pagerCustom: '#gallery_pager'
	});
	$(document).on('mouseover','.gallery_pager, #gallery_pager',function() {
		gallery.stopAuto();
		gallery.startAuto();
	});	
	
});

