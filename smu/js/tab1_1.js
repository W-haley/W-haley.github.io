// JavaScript Document


$(document).ready(function(){
  var cnt=3;	//탭메뉴 개수****
  $(".tab_wrap .contlist").hide(); 
  $('.tab_wrap .contlist:eq(0)').show(); 	//첫번째 내용 콘텐츠만 보여라
  $('.tab_wrap .tab1').css('background','#425c8e');	//경로=>기준 html파일 위치
  $('.tab_wrap .tab1').css('color','#fff');
  $('.tab_wrap .tabs').each(function (index) {
    $(this).click(function(){    	//각각의 탭메뉴를 클릭하면 index 0 1 2
	  $(".tab_wrap .contlist").hide(); 	//모든메뉴의 콘텐츠를 안보이게 해라
	  
	  $(".tab_wrap .contlist:eq("+index+")").show();	//클릭한 해당 콘텐츠만 보여라
	  for(var i=1;i<=cnt;i++){		//모든 메뉴에 이미지를 초기화해라(클릭 전의 색)
           $('.tab'+i).css('background','#fff');
           $('.tab'+i).css('color','#838383');
      }
      $(this).css('background','#425c8e'); 	//클릭한 메뉴만 활성화
      $(this).css('color','#fff');
   });
  });
});