// JavaScript Document


$(document).ready(function(){
  var cnt=4;	//탭메뉴 개수****
  $(".tabs .contlist").hide(); 
  $('.tabs .contlist:eq(0)').show(); 	//첫번째 내용 콘텐츠만 보여라
  $('.tabs .tab1').css('background','#c8cad7');	//경로=>기준 html파일 위치
  $('.tabs .tab1').css('color','#585858');
  $('.tabs .tab').each(function (index) {
    $(this).click(function(){    	//각각의 탭메뉴를 클릭하면 index 0 1 2
	  $(".tabs .contlist").hide(); 	//모든메뉴의 콘텐츠를 안보이게 해라
	  
	  $(".tabs .contlist:eq("+index+")").show();	//클릭한 해당 콘텐츠만 보여라
	  for(var i=1;i<=cnt;i++){		//모든 메뉴에 이미지를 초기화해라(클릭 전의 색)
           $('.tab'+i).css('background','#464da9');
           $('.tab'+i).css('color','#fff');
      }
      $(this).css('background','#c8cad7'); 	//클릭한 메뉴만 활성화
      $(this).css('color','#585858');
   });
  });
});