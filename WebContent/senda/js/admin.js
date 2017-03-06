var AppException = function(message) {
   this.message = message;
   this.name = "AppException";
}

var Check = {
	input : function($jObj, errorMsg){
		if($jObj.length == 0 ) return;
		//라디오or체크박스
		if($jObj.length > 0 && ($jObj[0].type.toLowerCase() == "radio" || $jObj[0].type.toLowerCase() == "checkbox")){
			var isCheckd = false;
			$jObj.each(function(){
				if(this.checked){
					isCheckd = true;
				}
			});
			if(isCheckd) return;
			throw new AppException(errorMsg);
		}
		if($jObj.val().length == 0 ){
			$jObj.focus();
			throw new AppException(errorMsg);
		}
		if($jObj.val() == $jObj.attr("placeholder")){
			$jObj.focus();
			throw new AppException(errorMsg);
		}
	},
	minLength : function($jObj, minLength, errorMsg){
		if($jObj.length == 0 ) return;
		if($jObj.val().length < minLength){
			$jObj.focus();
			throw new AppException(errorMsg);
		}
	},
	maxLength : function($jObj, maxLength, errorMsg){
		if($jObj.length == 0 ) return;
		if($jObj.val().length > maxLength){
			$jObj.focus();
			throw new AppException(errorMsg);
		}
	},
	email : function ($jObj, errorMsg) {
		$jObj.val($jObj.val());
		var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
		if($jObj.val().search(format) == -1){
			$jObj.focus();
			throw new AppException(errorMsg);
		}
	},
};

sentsetting = function(id, sentbool) {
	img_url = "/uploads/sent";

	$('#ni_url_f_'+id).attr("href", img_url+"/sent_"+id+"_front.png");
	$('#ni_url_p_'+id).attr("href", img_url+"/sent_"+id+"_stamp.png");
	$('#ni_url_b_'+id).attr("href", img_url+"/sent_"+id+"_back.png");

	for(i=1; i<=10; i++){
		switch(i){
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
				$('#ni_url_'+i+'_'+id).attr("href", img_url+"/set_"+id+"_front"+i+".png");
				break;

			case 9:
				$('#ni_url_'+i+'_'+id).attr("href", img_url+"/set_"+id+"_back.png");
				break;

			case 10:
				$('#ni_url_'+i+'_'+id).attr("href", img_url+"/set_"+id+"_preview.png");
				break;
		}
	}

	if(sentbool==1){
		$('#ni_send_'+id).attr("checked", true);
	}
}

updatecardflag = function(id) {
	var i_sendflag = $('#ni_send_'+id).is(":checked")? 1 : 0;

	console.log(i_sendflag);

	var form_data = {
		"sendflag": i_sendflag
	};

	$.ajax({
		type: "PUT",
		url: "/api/sendflag/"+id,
		dataType: "json",
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			alert("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
}

removecoupon = function(id){
	var form_data = {
		
	};

	$.ajax({
		type: "DELETE",
		url: "/api/removecoupon/"+id,
		dataType: "json",
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 쿠폰이 삭제되었습니다.");
				alert("<strong>성공!</strong> 쿠폰이 삭제되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 오류가 발생했습니다.");
				alert("<strong>실패!</strong> 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			alert("<strong>실패!</strong> 오류가 발생했습니다.");
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			alert("done");
			console.log(value);
		}
	});
}


updateevent = function(id) {
	var i_title = $('#ni_title_'+id).val();
	var i_sdate = $('#ni_sdate_'+id).val();
	var i_edate = $('#ni_edate_'+id).val();

	var fileinfo = document.getElementById('ni_imgfile_'+id).files[0];

	console.log(fileinfo);

	var form_data = new FormData();

	form_data.append("title", i_title);
	form_data.append("sdate", i_sdate);
	form_data.append("edate", i_edate);
	form_data.append("userfile", fileinfo);

	var fd = JSON.stringify(form_data);
/*
	if (fileinfo) {
		form_data.append("userfile", fileinfo);	
	}
*/
	$.ajax({
		type: "PUT",
		url: "/api/event/"+id,
		secureuri: false,
		dataType: "json",
		data: fd,
		processData: false,
		contentType: "application/json",
		success: function(value) {
			if (value["state_code"] == "200") {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
}

insertstar = function() {
	var i_name = $('#ni_name').val();
	var i_adsmain = $('#ni_adsmain').val();
	var i_adsdetail = $('#ni_adsdetail').val();
	var i_gubun = $('#ni_gubun').val();
	var i_zipcode = $('#ni_zipcode').val();
	var i_team = $('#ni_team').val();

	var form_data = {
		"name": i_name,
		"adsmain": i_adsmain,
		"adsdetail": i_adsdetail,
		"gubun": i_gubun,
		"zipcode": i_zipcode,
		"team": i_team
	};

	console.log(form_data);

	$.ajax({
		type: "POST",
		url: "/api/staraddress/",
		dataType: "json",
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
	//$output["name"], $output["adsmain"], $output["adsdetail"], $output["gubun"], $output["zipcode"], $output["team"]
}

updatestar = function(id) {
	var i_name = $('#ni_name_'+id).val();
	var i_team = $('#ni_team_'+id).val();
	var i_adsmain = $('#ni_adsmain_'+id).val();
	var i_adsdetail = $('#ni_adsdetail_'+id).val();
	var i_zipcode = $('#ni_zipcode_'+id).val();
	var i_gubun = $('#ni_gubun_'+id).val();

	var form_data = {
		"name": i_name,
		"adsmain": i_adsmain,
		"adsdetail": i_adsdetail, 
		"gubun": i_gubun,
		"zipcode": i_zipcode,
		"team": i_team
	};

	console.log(form_data);

	$.ajax({
		type: "PUT",
		url: "/api/staraddress/"+id,
		dataType: "json",
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
}

deletestar = function(id) {
	$.ajax({
		type: "DELETE",
		url: "/api/staraddress/"+id,
		dataType: 'json',
		success: function(value) {
			if (value["state_code"] == "200") {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}	
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);	
		},
		done: function(value) {
			console.log(value);
		}
	});

	console.log('Delete');
}

insertnotice = function() {
	var i_title = $('#ni_title').val();
	var i_content = $('#ni_content').val();
var i_popup = $('#ni_popup').val();

	var form_data = {
		"title": i_title,
		"content": i_content,
  "popup": i_popup
	};

	console.log(form_data);

	$.ajax({
		type: "POST",
		url: "/api/notice/",
		dataType: 'json',
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
}

updatenotice = function(id) {
	var i_title = $('#ni_title_'+id).val();
	var i_content = $('#ni_content_'+id).val();
var i_popup = $('#ni_popup_'+id).val();

	var form_data = {
		"title": i_title,
		"content": i_content,
  "popup": i_popup
	};

	console.log(form_data);

	$.ajax({
		type: "PUT",
		url: "/api/notice/"+id,
		dataType: 'json',
		data: form_data,
		success: function(value) {
			if (value["state_code"] == "200") {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
}

deletenotice = function(id) {
	$.ajax({
		type: "DELETE",
		url: "/api/notice/"+id,
		dataType: 'json',
		success: function(value) {
			if (value["state_code"] == "200") {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}	
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);	
		},
		done: function(value) {
			console.log(value);
		}
	});

	console.log('Delete');
}

updateuserinfo = function(id) {
	var i_point = $('#ni_point_'+id).val();
	var i_stamp = $('#ni_stamp_'+id).val();
	var i_comment = $('#ni_comment_'+id).val();
	
	var form_data = {
		"point": i_point,
		"stamp": i_stamp,
		"comment": i_comment
	};

	console.log(form_data);

$.ajax({
		type: "PUT",
		url: "/api/updateinfo/"+id,
		dataType: "json",
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 수정이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 수정 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			alert("error " + error);
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
}

insertappinfo = function() {
	var i_name = $('#ni_name').val();
	var i_value = $('#ni_value').val();
var i_value2 = $('#ni_value2').val();

	var form_data = {
		"name": i_name,
		"value": i_value,
  "value2": i_value2
	};

	console.log(form_data);

	$.ajax({
		type: "POST",
		url: "/api/appinfo/",
		dataType: "json",
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
	//$output["name"], $output["adsmain"], $output["adsdetail"], $output["gubun"], $output["zipcode"], $output["team"]
}

updateappinfo = function(id) {
	var i_name = $('#ni_name_'+id).val();
	var i_value = $('#ni_value_'+id).val();
var i_value2 = $('#ni_value2_'+id).val();

	var form_data = {
		"name": i_name,
		"value": i_value,
  "value2": i_value2
	};

	console.log(form_data);

	$.ajax({
		type: "PUT",
		url: "/api/appinfo/"+id,
		dataType: "json",
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			console.log(value);
		}
	});
}

deleteappinfo = function(id) {
	$.ajax({
		type: "DELETE",
		url: "/api/appinfo/"+id,
		dataType: 'json',
		success: function(value) {
			if (value["state_code"] == "200") {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}	
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);	
		},
		done: function(value) {
			console.log(value);
		}
	});
}

function downLoad_Des2(fileNM, saveFileNM, filePath, yn){
	document.charset = "euc-kr";
    document.fileDownLoad2.elements["fileNM"].value = fileNM;
    document.fileDownLoad2.elements["saveFileNM"].value = saveFileNM;
    document.fileDownLoad2.elements["filePath"].value = filePath;
    document.fileDownLoad2.elements["desCipher"].value = yn;
    document.fileDownLoad2.submit();
}

function booldeletecard(cardid){
	var isDel = confirm("해당 카드를 삭제하시겠습니까?");
	
	if(isDel){
		deletecard(cardid);
	} else {
		return ;
	}
}

deletecard = function(cardid) {
	$.ajax({
		type: "DELETE",
		url: "/api/deletecard/"+cardid,
		dataType: 'json',
		success: function(value) {
			if (value["state_code"] == "200") {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 카드가 삭제되었습니다.");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 오류가 발생했습니다.");
			}	
		},
		error: function(request, status, error) {
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);	
		},
		done: function(value) {
			console.log(value);
		}
	});
}

function pushchange(){
	var radio = document.getElementsByName('push_type')[3];
	
	if(radio.checked){
		document.getElementById('token').disabled = false;	
	}else{
		document.getElementById('token').disabled = true;
	}
}

pushSend = function() {
	var type = $(':radio[name="push_type"]:checked').val();
	var token = $('#token').val();
	var title = $('#title').val();
	var message = $('#message').val();
	var stamp = $('#stamp').val();
	var point = $('#point').val();
	var cardid = $('#cardid').val();

	if(typeof token == "undefined"){
		token = "";
	}

	if(typeof title == "undefined"){
		title = "";alert("?");
	}

	if(typeof message == "undefined"){
		message = "";
	}


	if(title.length==0){
		alert("타이틀을 입력해주세요");
		return;
	} else if(message.length==0){
		alert("메시지를 입력해주세요");
		return;
	} 

	if(type=='user' && token.length < 30){
		alert("올바른 token을 입력해주세요");
		return;
	}

	var form_data = {
		"type": type,
		"token": token,
		"title": title,
		"message": message,
		"stamp": stamp,
		"point": point,
		"cardid": cardid
	};

	console.log(form_data);

	$.ajax({
		type: "POST",
		url: "/pushmessage/sendMessage/",
		dataType: 'json',
		data: form_data,
		success: function(value) {
			if (value['state_code'] == '200') {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				alert(value['cnt'] + "개의 메시지를 보내는데 성공하였습니다");
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
			}
		},
		error: function(request, status, error) {
			alert("ERROR code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			alert("DONE  code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log(value);
		}
	});
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#popupImage')
        .attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function setEnablePopup(){
	var value = $('#popupEnable').find(":selected").val();
	var enable = 0;

	if(value=='enable'){
		enable = 1;
	}

	var form_data = {
		"enable":enable
	};

	$.ajax({
		type: "POST",
		url: "/popupboard/setEnablePopup/",
		dataType: 'json',
		data: form_data,
		success: function(value) {
			if (value['state_code'] == 200) {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				if(value['enable']==0){
					alert("팝업 게시물이 비활성화 되었습니다.");
				}else{
					alert("팝업 게시물이 활성화 되었습니다.");
				}
				
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
				alert("fail : " + value);
			}
		},
		error: function(request, status, error) {
			alert("ERROR code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			alert("DONE  code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log(value);
		}
	});
}

function uploadPopupImage(){
    var fileData = new FormData();
	fileData.append("file", $("#fileUpload").prop('files')[0]);	//파일 한개

    // ajax
    $.ajax({
        url:'/popupboard/uploadPopupImage/',
        type:'POST',
        data:fileData,
		cache: false,
        contentType:false,
        processData:false,
		success: function(value) {
			if (value['state_code'] == 200) {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				alert("팝업 게시물의 이미지가 변경되었습니다.");
				
				window.location.reload();
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 저장 중 오류가 발생했습니다.");
				alert(value);
			}
		},
		error: function(request, status, error) {
			alert("ERROR code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			alert("99");
			alert("DONE  code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log(value);
		}
	});
}

function showReportUser(cardid, type, cnt){
	var enable = 0;

	if(cnt==0){
		return ;
	}

	var form_data = {
		"cardid":cardid,
		"type":type
	};

	$.ajax({
		type: "POST",
		url: "/report/getReportUserList/",
		dataType: 'json',
		data: form_data,
		success: function(value) {
			if (value['state_code'] == 200) {
				$('#m_msg').attr("class", "alert alert-success");
				$('#m_msg').html("<strong>성공!</strong> 저장이 완료되었습니다.");
				
				var popup = window.open("", "Popup", "width=500,height=800");

				for(var i=0; i<value['data'].length; i++){
					var node = document.createTextNode("ID : " + value['data'][i]['ID'] + "  /// EMAIL : " + value['data'][i]['EMAIL']);
					popup.document.body.appendChild(node);
					popup.document.body.appendChild(document.createElement("br"));
				}
				
			}
			else {
				$('#m_msg').attr("class", "alert alert-error");
				$('#m_msg').html("<strong>실패!</strong> 오류가 발생했습니다.");
				alert("fail : " + value);
			}
		},
		error: function(request, status, error) {
			alert("ERROR code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		done: function(value) {
			alert("DONE  code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			console.log(value);
		}
	});
}

function resentpack(){
	if(confirm("오늘의 카드팩 데이터를 다시 가져오시겠습니까?")){
		$.ajax({
			type: "GET",
			url: "/api/zipsent",
			dataType: 'json',
			success: function(value) {
				console.log("success value : " + value);
			},
			error: function(request, status, error) {
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);	
			},
			done: function(value) {
				console.log(value);
			}
		});
		alert("사진이 압축되는데 일정시간이 소모될수 있습니다.\n잠시후 새로고침을 해주세요.");
	} else{
		return;
	}
}