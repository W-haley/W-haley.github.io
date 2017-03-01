

function lnbset(s,lnb,sub){
	$(".lnb_div").load("lnb"+s+".html", function() {
		var menuNm=".menu"+lnb;
	$(menuNm).children("a").addClass("current");
	if(sub>0){
		$(menuNm).children("ul").show();
		$(menuNm).find("a:eq("+sub+")").addClass("active");
	}
  });
	
}







