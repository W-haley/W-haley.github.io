// JavaScript Document

 function initialize() {
  var myLatlng = new google.maps.LatLng(37.467807, 126.962834);
  var myOptions = {
   zoom: 15,
   center: myLatlng

  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
 
  var marker = new google.maps.Marker({
   position: myLatlng, 
   map: map, 
   title:"대한건축거래소"
  });   
  
 
  var infowindow = new google.maps.InfoWindow({
   content: "서울시 관악구 낙성대로 15길 56-39 서울대연구공원 SKT연구동 상생혁신센터 U1호(낙성대동)"
  });
 
  infowindow.open(map,marker);
 }
 
 
 window.onload=function(){
  initialize();
 };

