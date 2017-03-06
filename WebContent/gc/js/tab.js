// JavaScript Document


$(document).ready(function(){
  var cnt=4;	//탭메뉴 개수****
  $('.tabs .contlist').hide();
  $('.tabs .contlist:eq(0)').show(); 	//첫번째 내용 콘텐츠만 보여라
  $('.tabs .tab1').css('background','#fff');	//경로=>기준 html파일 위치
  $('.tabs .tab1').css('color','#d2c2dc');
  $('.tabs .tab1').css('border','1px solid #d2c2dc');
  $('.tabs .tab1').css('border-bottom','1px solid #fff');
  $('.tabs .tab1').css('border-top','2px solid #d2c2dc');
  
  	
  
  $('.tabs .tab').each(function (index) {
    $(this).click(function(){    	//각각의 탭메뉴를 클릭하면 index 0 1 2
	  $(".tabs .contlist").hide(); 	//모든메뉴의 콘텐츠를 안보이게 해라
	  $(".tabs .contlist:eq("+index+")").show();	//클릭한 해당 콘텐츠만 보여라
	  for(var i=1;i<=cnt;i++){		//모든 메뉴에 이미지를 초기화해라(클릭 전의 색)
           $('.tab'+i).css('background','-webkit-gradient(linear, left top, left bottom, color-stop(0%, white), color-stop(15%, white), color-stop(100%, #ececec))');
            $('.tab'+i).css('background','-ms-linear-gradient(top, white 0%, white 55%, #ececec 130%);');
           $('.tab'+i).css('color','#999');
           $('.tab'+i).css('border','1px solid #ccc');
           $('.tab'+i).css('border-bottom','1px solid #d2c2dc');
           $('.tab'+i).css('margin-left','-1px');
           
      }
      $(this).css('background','#fff');
      $(this).css('color','#d2c2dc');
      $(this).css('border','1px solid #d2c2dc'); 
      $(this).css('border-bottom','1px solid #fff');
      $(this).css('border-top','2px solid #d2c2dc');	//클릭한 메뉴만 활성화
   });
  });
});