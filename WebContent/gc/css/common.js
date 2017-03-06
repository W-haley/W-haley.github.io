   
$(function(){//lnb
	$(".lnb_layer").css("visibility","visible");	
	
	$(".lnb_layer").hide();
		$(".lnb_cate_box .lnb_cate").hover(function(){
		$('.lnb_layer', this).stop(true, true).fadeIn(50);
		$('.lnb_layer', this).css("z-index","1001");
		},
function(){
	$('.lnb_layer', this).stop(true, true).fadeOut(50);
});

	$(".lnb_all_box >dl").mouseover(function(){
		var $img =$(this).find("img"); 
		var path=$img.attr("src");
			$img.attr("src",path.substring(0,path.indexOf(".png"))+"_on.png");
    		}).mouseout(function(){
    	var $img =$(this).find("img"); 
    	var path=$img.attr("src");
    		$img.attr("src",path.substring(0,path.indexOf("_on.png"))+".png");
     
    });
});
 
$(document).ready(function() {
$("input:checkbox").on('click', function() {
      if ( $(this).attr('checked') ) {
        $(this).parent().addClass("selected");
      } else {
        $(this).parent().removeClass("selected");
      }
    });
});



 
 
$(document).ready(function() {
$(".top_category_box >dl").on('click', function(){
	var $img =$(this).find("img"); 
	var path=$img.attr("src");
		$(".result_top .result_off li").text("");
	if(path.indexOf("_on.png") >-1){
		$(this).css("background-color","#fdfcfc");
		$(this).children().css("color","#555555");
			$img.attr("src",path.substring(0,path.indexOf("_on.png"))+".png");
	}else{
		$(this).css("background-color","#fab4c0");
		$(this).children().css("color","#ffffff");
		$img.attr("src",path.substring(0,path.indexOf(".png"))+"_on.png");
}
	var accNm="";
		$(this).closest("div").find("dl").each(function(){
	var $img =$(this).find("img"); 
    var path=$img.attr("src");
    	if(path.indexOf("_on.png") >-1){
		if(accNm !=""){
	accNm+=","+$(this).find("dd").text();
		}else{accNm+=$(this).find("dd").text();}
    }
});
    $(".result_top .result_off li").html('<i class="fa fa-caret-right" aria-hidden="true"></i>'+accNm);
  });
     



    });
 

 