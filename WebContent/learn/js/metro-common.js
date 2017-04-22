$(function(){
			/*
			$(선택자).masonry({옵션}); 의 형태로 적용하며
			itemSelector 와 columnWidth 옵션은 항상 지정해주도록 권고한다.
			*/
			$("#cont_images").masonry({
				itemSelector	: ".cont_div",
				columnWidth	: 320,
				
			});
		});