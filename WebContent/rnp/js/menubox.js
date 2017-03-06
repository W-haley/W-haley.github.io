$(document).ready(function(){
var nav = $('.menubox');
nav.css({
	position:'absolute',
	padding:0,
	width:'100%',
	margin:0,
	top:0,
	background:'rgba(255,255,255,1)',
	color:'rgba(16,16,16,1)',
	height:'100px',
})
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 160) { 
            nav.css({
            	position:'fixed',
            	padding:'0',
            	width:'100%',
            	margin:0,
            	top:0,
            	background:'rgba(0,0,0,0.2)',
            	color:'rgba(255,255,255,1)',
            	height:'100px',
            })
        }else {
            nav.css({
            	position:'absolute',
            	padding:0,
            	width:'100%',
            	margin:0,
            	top:0,
            	background:'rgba(255,255,255,1)',
            	color:'rgba(16,16,16,1)',
            	height:'100px',
            })
        }
    });
})