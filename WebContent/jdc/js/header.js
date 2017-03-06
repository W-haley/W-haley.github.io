var mobileFlag = false;
var webFlag = false;
IE7Flag = (navigator.appVersion.indexOf("MSIE 7") > -1)?true:false;
ReponList = [];
$(document).ready(function(){
	npos = $(window).scrollTop();
	SW	=	$(window).width();
	SH	=	$(window).height();		

	$('.gnb').find('> ul').bind('mouseenter mouseleave',function(e){
		if(e.type == 'mouseenter'){
			$(this).find('.snb').show();
		}else{
			$(this).find('.snb').hide();
		}
	});

//	gnbCheck();


	/* List Reponsive Height */
//	if(!IE7Flag){
//		if($('.list').length > 0){
//			$('.list').each(function(){
//				var list = new ReponsiveList($(this));
//				ReponList.push(list);
//			});
//		}
//	}

	$('.top_search_wrap').mouseleave(function(){
		$('.top_search').removeClass('open');
		$(this).hide();
	});
	
});//end ready

$(window).load(function(){
	$('#container').css({'visibility':'visible'});	
});//window end

//$(window).scroll(function() {			
//	npos = $(window).scrollTop();
//	SW	=	$(window).width();
//	SH	=	$(window).height();
//	gnbCheck();

//});//end scroll

//$(window).resize(function(){
//	npos = $(window).scrollTop();
//	SW	=	$(window).width();
//	SH	=	$(window).height();	
//	gnbCheck();
//	if(!IE7Flag)ReponsiveListResize();
//});//end resize

function gnbCheck(){
	if(SW > 1023 && npos > 40){		
		$('#header').addClass('on');
	}else{		
		$('#header').removeClass('on');
	}
	
}


 $(document).ready(function(){
	$(".mypage a").mouseenter(function(){
			var img =$(this).find("img").attr("src");
			img=img.substring(0,img.indexOf(".png"))+"_on.png";
			$(this).find("img").attr("src",img);
	    }).mouseleave(function(){
	    	var img =$(this).find("img").attr("src");
			img=img.substring(0,img.indexOf("_on"))+".png";
	    	$(this).find("img").attr("src",img);
	    });
    });




