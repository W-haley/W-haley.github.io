function commentAdd(){
	var str = $("#form1").serialize();
	$.ajax({
		type : "GET",
		url : "/koreaBuild/commentAddAjax",
		data : str,
		error : function(){
			alert('fail!!');
		},
		success : function(data){
			$(".reply_Area").html(data);
		}
		
	});
	document.form1.reset();
}
var num =1;
function portShowmore(more){
	var allData ={"more":more,"num":num};
	alert(more);
//	var divTest = document.getElementById("sub03_cont")
	$.ajax({
		type : "GET",
		url : "/PortfolioShowmoreAjax",
		data : allData,
		error : function(){
			alert('fail!!');
		},
		success : function(data){
		//	 var content = $('.sub03_cont').html(data);
			$(".sub03_cont").append(data).trigger('create');
			num++;
		//	$(".sub03_cont").load("css/common.css");
		//	content.trigger('create');
		}
		
	});
}
function commentDelete(id,type,page,boardid){
	var allData ={"id":id,"type":type,"page":page,"boardid":boardid};
//	var divTest = document.getElementById("sub03_cont")
	$.ajax({
		type : "GET",
		url : "/koreaBuild/commentDeleteAjax",
		data : allData,
		error : function(){
			alert('fail!!');
		},
		success : function(data){
			location.reload();
			alert("check");
		}
		
	});
}
