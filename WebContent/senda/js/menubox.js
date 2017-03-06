$(document).ready(function(){
var nav = $('.menubox');
nav.css({
	position:'absolute',
	padding:0,
	width:'100%',
	margin:0,
	top:0,
	background:'rgba(0,0,0,0.2)',
	height:'auto',
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
            	height:'auto',
            })
        }else {
            nav.css({
            	position:'absolute',
            	padding:0,
            	width:'100%',
            	margin:0,
            	top:0,
            	background:'rgba(0,0,0,0.2)',
            	height:'auto',
            })
        }
    });
})