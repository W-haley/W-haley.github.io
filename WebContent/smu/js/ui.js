$(function() {
	// 탭게시판
	$(".tab_box .box01 .l>ul>li>a").bind("click focusin",function() {
		/*$(".tab_box .box01 .l>ul>li>a").removeClass("on");
		$(".tab_box .box01 .l>ul>li>a").next().hide();*/
		$(this).closest(".box01").find(".l>ul>li>a").removeClass("on");
		$(this).closest(".box01").find(".l>ul>li>a").next().hide();
		$(this).addClass("on");
		$(this).next().show();
		return false;
	});
});