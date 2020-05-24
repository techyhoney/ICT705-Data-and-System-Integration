var bubble = [];
var map;

function bubble_markers(){
for (var j=0; j < bubble.length; j++)	
	{
	  bubble[j].setMap(null);
	};
}

$(document).ready(function(){

$("#form_detail").submit(function(event){
event.preventDefault();
bubble_markers() ; 
var contentstring = 'Stay Home, Stay Safe'; 

//Get Input From Form
var informationbubble = new google.maps.InfoWindow({
     content: contentstring
 })
var country = $(this).serializeArray()[0].value;

// setting up the marker position 
$.ajax(	{
method: "get",
url: "http://localhost:8080/getcountry?country=" + country,
dataType: "json"
}).done( function(country_covid_details) {
latlngset = new google.maps.LatLng(country_covid_details.lat, country_covid_details.long);
map.setCenter(latlngset);
marker = new google.maps.Marker({
//getting marker over location
position: latlngset,
title: country_covid_details.name,
animation: google.maps.Animation.DROP,
icon:image,
map: map,
});

bubble.push(marker);
marker.addListener('click', function()	{
informationbubble.setContent('<br><h1> '+"" + country_covid_details.name+ ' </h1><h1> '+"" + country_covid_details.date+ ' </h1><div><h3>'+"Total COVID-19 Cases: "+country_covid_details.total_cases+'</h3><div><br><h3> '+"COVID-19 Cases per million: " + country_covid_details.total_cases_per_million+ ' </h3><br><h3> '+"COVID-19 New Cases: " + country_covid_details.new_cases+ ' </h3><br><h3> '+"Total COVID-19 Deaths: " + country_covid_details.total_deaths+ ' </h3><br><h3> '+"COVID-19 Deaths per million: " + country_covid_details.total_deaths_per_million+ ' </h3><br><h3> '+"COVID-19 New Deaths: " + country_covid_details.new_deaths+ ' </h3><br><h3> '+"Total COVID-19 Recovered Patients: " + country_covid_details.total_recovered+ ' </h3><br><h3> '+"Total COVID-19 Active Cases: " + country_covid_details.total_active+ ' </h3>')
informationbubble.open(map, this);
},toggleBounce());

})
.fail(function(error)	{
alert("Oops! Invaid Entry: Country name not in scope or not present in Casestudy!!");
})
$("#country").val("");
})
});


var image ='css/markericon.png';
function initialize()	{
 map = new google.maps.Map(document.getElementById('map'), { 
   icon:image,
   zoom: 4,
   center:new google.maps.LatLng(38.963745,35.243322)
});
}
// Adding animation to marker 
function toggleBounce()	{
if (marker.getAnimation()!== null) {
marker.setAnimation(null);
} else {
marker.setAnimation(google.maps.Animation.BOUNCE);
}
}