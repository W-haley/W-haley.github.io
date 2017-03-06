// JavaScript Document

$(document).ready(function() {
  var timeonoff; //자동기능 구현
  var imageCount=2;  //이미지 개수 *** 
  var cnt=1;  //이미지 순서 1 2 3 4 5 4 3 2 1 2 3 4 5 ...
  var direct=1;  //1씩 증가(+1)/감소(-1)
  var position=0; //겔러리 무비의 left값 0 -1000 -2000 -3000 -4000
  
//  $('.btn1').css('background','url(images/bnt_on.png)'); //1번째 버튼 불켜!! 

 function moveg(){
      cnt+=direct;  //카운트가 1 2 3 4 5 4 3 2 1 2 3 4 5 ......
	     //각각의 카운트에 대한 left 좌표값을 처리
		if(cnt==1){		//***if문의 개수 수정/ 좌표값 수정
		   position=0;  
		}else if(cnt==2){
	       position=-1100;
//		}else if(cnt==3){
//		   position=-2200;
		}
                                                
//	   for(var i=1;i<=imageCount;i++){ // i=>1 2 3 4 5
//		  $('.btn'+i).css('background','url(images/bnt.png)'); //모든 버튼에 불 다꺼!!
//	   }
//	   $('.btn'+cnt).css('background','url(images/bnt_on.png)');//자기 버튼만 불켜~
                           
		$('.gallery').animate({left:position}, 'slow'); //겔러리 무비의 left값을 움직여라~
		if(cnt==imageCount)direct=-1;
        if(cnt==1)direct=1;
 }

  timeonoff= setInterval( moveg , 4000); //4초마다 자동기능 

//  $('.mbutton').click(function(event){  //각각의 버튼을 클릭한다면...
//
//	var $target=$(event.target); //$target == this =>실제 클릭한 버튼
//	clearInterval(timeonoff);   //타이머를 중지!!

//	for(var i=1;i<=imageCount;i++){
//		$('.btn'+i).css('background','url(images/bnt.png)'); //모든 버튼 불끈다
//	}

//	if($target.is('.btn1')){  //첫번째 버튼을 클릭했다면...	***if문의 개수/좌표값
//    	   $('.gallery').animate({left:0}, 'slow');
//                cnt=1;
//                direct=1;
//	}else if($target.is('.btn2')){ //두번째 버튼을 클릭했다면...
//    	   $('.gallery').animate({left:-1000}, 'slow');
//                cnt=2;
//	}else if($target.is('.btn3')){ //세번째 버튼을 클릭했다면...
//    	   $('.gallery').animate({left:-2000}, 'slow');
//                cnt=3;
//                direct=-1;
//	}
//    $('.btn'+cnt).css('background','url(images/bnt_on.png)'); //클릭한 버튼의 불켜
//    timeonoff= setInterval( moveg , 4000);  //타이머의 재 동작
//  });
  //겔러리에 오버/아웃시 타이머의 동작/중지 기능 구현
     $('.gallery').hover(function(){
	      clearInterval(timeonoff);   //타이머를 중지!!
	  },function(){
		  timeonoff= setInterval( moveg , 4000);  //타이머의 재 동작
	  });
  
});




