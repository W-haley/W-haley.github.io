// JavaScript Document

 function initialize() {
  var myLatlng = new google.maps.LatLng(36.173805, 127.324049);
  var myOptions = {
   zoom: 15,
   center: myLatlng

  }
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
 
  var marker = new google.maps.Marker({
   position: myLatlng, 
   map: map, 
   title:"(주)반월정가담농원"
  });   
  
 
  var infowindow = new google.maps.InfoWindow({
   content: "(주)반월정가담농원 충남 논산시 별곡면 만목리 231번지"
  });
 
  infowindow.open(map,marker);
 }
 
 
 window.onload=function(){
  initialize();
 }

