// JavaScript Document

$(document).ready(function(){
  var cnt=23;	
  $('.tabs .contlist:eq(0)').show(); 
  $('.tabs .tab1').css('color','#666');
  
  $('.tabs .tab').each(function (index) {	
    $(this).click(function(){    
	  $(".tabs .contlist").hide(); 
	  $(".tabs .contlist:eq("+index+")").show();	
	  for(var i=1;i<=cnt;i++){
           $('.tab'+i).css('color','#555');
            
      }
      $(this).css('color','#666'); 	
     });
  });
  
//  $('.all').toggle(function(){ 
//	    $('.tabs .contlist').show();	
//	    $('.tab').css('background','url(images/content3/tabon.jpg)');
 //       $('.tab').css('color','#ee0000');
//	   	$(this).css('background','url(images/content3/totalHide.jpg)');
//	   	},function(){ 	
//	    $('.tabs .contlist').hide();	
//	    $('.tab').css('background','url(images/content3/tab.jpg)');
 //       $('.tab').css('color','#aaa');
//	    $(this).css('background','url(images/content3/totalShow.jpg)');
//	});
});
