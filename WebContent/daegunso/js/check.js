

function checkBox() {
	var check_Box = document.getElementsByName("ckbox"); //체크박스 name
		for (j = 0; j < check_Box.length; j++) {
 	var disign = document.getElementById([j+1]); // 보여질내용
		 if(check_Box[j].checked == true ){
 			 disign.style.display = "block";
		 }else{
  			check_Box[j].checked = false;
  			disign.style.display = "none";
 		}
 	}
}