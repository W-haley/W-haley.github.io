   
$(function(){//lnb

   //gnb, snb has child or not
	$("#mgnb>ul>li>div>ul>li, #snb>ul>li").each(function(){
		if ( $(this).children("ul").length ) $(this).addClass("hasChild");
	});
	//header toggle menu
	$(".toggle>a.fc").click(function(){
		$("header").addClass("opened");
		$(this).parent(".toggle").addClass("active");
		if ( $("#mgnb>ul>li.active").length == false ) {
			$("#mgnb>ul>li.m1").addClass("active");
		};
		return false;
	});
	$(".toggle .lt>.close").click(function(){
		$("header").removeClass("opened");
		$(this).parents(".toggle").removeClass("active");
	});
	//mobile gnb action
	$("#mgnb a").click(function(){
		$(this).parent().toggleClass("active").siblings().removeClass("active");
		if ( $(this).siblings().length ) {
			return false;
		};
	});
 
 $(document).ready(function(){
	$(".quick_box dl a").mouseenter(function(){
			var img =$(this).find("img").attr("src");
			img=img.substring(0,img.indexOf(".png"))+"_on.png";
			$(this).find("img").attr("src",img);
	    }).mouseleave(function(){
	    	var img =$(this).find("img").attr("src");
			img=img.substring(0,img.indexOf("_on"))+".png";
	    	$(this).find("img").attr("src",img);
	    });
});
 
});
 