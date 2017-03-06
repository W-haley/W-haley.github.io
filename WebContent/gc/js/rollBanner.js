	
	var $list = $('ul.roll_banner');
	
	var size = $list.children().outerWidth();
	
	var len =  $list.children().length;
	
	var speed = 2000;
	
	var timer = null;
	
	var auto = true;
	
	var cnt = 1;

 

	$list.css('width',len*size);

 

	if(auto) timer = setInterval(autoSlide, speed);

 

	$list.children().bind({
			
			'mouseenter': function(){
			
			if(!auto) return false;
			
			clearInterval(timer);
			
			auto = false;

		},
		
		'mouseleave': function(){
			
			timer = setInterval(autoSlide, speed);
			
			auto = true;
		
		}

	});

 

	$('.bt-roll').children().bind({

		'click': function(){
	
			var idx = $('.bt-roll').children().index(this);
			
			cnt = idx;
			
			autoSlide();
			
			return false;

	},

	'mouseenter': function(){

		if(!auto) return false;

		clearInterval(timer);

		auto = false;

		},
		
		'mouseleave': function(){
		
			timer = setInterval(autoSlide, speed);
			
			auto = true;
		
		}

	});    

 

	function autoSlide(){

		if(cnt>len-1){

			cnt = 0;

		}
		
		 
		
		$list.animate({'left': -(cnt*size)+'px' },'normal');
		
		 
		
		var source2 = $('.bt-roll').children().find('img').attr('src').replace('_.png','.png');
		
		$('.bt-roll').children().find('img').attr('src',source2);
		
		 
		
		var source = $('.bt-roll').children().find('img').attr('src').replace('.png','_.png');
		
		$('.bt-roll').children().eq(cnt).find('img').attr('src',source);

 

		cnt++;

	}

