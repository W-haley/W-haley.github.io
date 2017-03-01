
//sub
 function loc(url){
document.location.href=url;
} 

//-----------------------------------------------------------------------------------------------------------------------------------

//ETC
function go_Home() {//홈
	window.open('/','_self');
}

function go_Admin() {//어드민
	window.open('/adm','_self');
}
function go_Notice() {//공지사항
	window.open('../bbs/list.php?code=w_notice','_self'); 
}
function go_Board(tb) {//게시판
	document.location.href= g5_bbs_url+"/board.php?bo_table="+tb;
}
function go_Security() {//개인정보보호정책
	window.open('/','_self');
}
function go_Sitemap() {//사이트맵
	window.open('../sitemap.php','_self');
}
function go_Blog() {//블러그
	window.open('http://blog.naver.com/jipmc','_blank'); 
}
function go_Facebook() {//페이스북
	window.open('/','_self');
}
function go_Twitter() {//트위터
	window.open('/','_self');
}
function go_Kakao() {//카카오톡
	window.open('/','_self');
}
function go_Email() {//이메일
	window.open('mailto:wallmoo@dostory.co.kr','_self'); 
	//document.location.href="mailto:wallmoo@naver.com";
}
function go_Ready() {//준비중
	alert("준비중입니다.");
}
function go_Contact() {//contact us
	sub01_05(); 
}
function go_Dostory() {//디오스토리
	window.open('http://www.dostory.co.kr/','_blank');
}
function go_copyClipboard(text)
{
	window.clipboardData.setData('text', text);
	
	alert("클립보드에 복사되었습니다.");
}

var sidebarurl = "http://gemco.dostory.co.kr/"; // Change as required
var sidebartitle = "젬코쥬얼리"; // Change as required
var url = this.location;
var title = document.title;

function go_Favorite() {//즐겨찾기

	if (window.sidebar && window.sidebar.addPanel){ // Firefox 
		window.sidebar.addPanel(sidebartitle, sidebarurl,"");
	} else if ( document.all ) { // IE Favorite
		window.external.AddFavorite(url, title); 
	} else if (window.opera && window.print) {
		// do nothing
	} else if (navigator.appName=="Netscape") {
		alert("Please click OK, then press <Ctrl-D> to bookmark this page.");
	}
	
}

//-----------------------------------------------------------------------------------------------------------------------------------

 
function Initializeside_quick() {

}

//window.onload=Initializeside_quick;
