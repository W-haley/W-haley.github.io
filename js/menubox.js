$(document).ready(function(){
var nav = $('.menubox');
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 160) { 
            nav.css({
            	position:'fixed',
            	padding:'10px 20%',
            	width:'100%',
            	margin:0,
            	top:0,
            	background:'rgba(0,0,0,0.8)',
            	height:'auto',
            })
        }else {
            nav.css({
            	position:'absolute',
            	padding:0,
            	width:'80%',
            	margin:'0 10%',
            	top:'20px',
            	background:'none'
            })
        }
    });
})