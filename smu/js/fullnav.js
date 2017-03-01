
 $(document).ready(function() {
		$('ul.dropdownmenu li ul').hide();
		$('.box').hide();

         $('.dropdownmenu').hover(  //전체 메뉴에 오버/아웃시
		   function() { 
		     $('ul.dropdownmenu li.menu ul').slideDown('fast',function(){$(this).stop();});
			  //모든 서브메뉴를 열어라
		     $('.box').slideDown('fast',function(){$(this).stop();});
			 //메뉴 박스를 열어라
		   },
		  function() {
			 $('ul.dropdownmenu li.menu ul').slideUp('fast');
			 //모든 서브메뉴를 닫아라
			 $('.box').slideUp('fast');
			 //메뉴 박스를 닫아라
		 });
		 
		 //$('ul.dropdownmenu li.menu ').hover(
		 //  function() { 
	     //    $('.depth1', this).animate({top:-35},'fast').clearQueue();
		 //  },
		 // function() {
	     //   $('.depth1', this).animate({top:0},'fast').clearQueue();
		 //});
		 // 키보드 tab키 처리
		 $('ul.dropdownmenu li.menu .depth1').bind('focus', function () {        
                    $('ul.dropdownmenu li.menu ul').slideDown('normal');
                    $('.menu_box').slideDown('fast');
          });

         $('ul.dropdownmenu li.m5 li:last').find('a').bind('blur', function () {        
                  $('ul.dropdownmenu li.menu ul').slideUp('fast');
                  $('.menu_box').slideUp('normal');
         });

  });







