

var model =[];
var addressObj ;
var todo = angular.module('matomeMaps', []);

  todo.controller('MapCtrl', function ($scope,$http) {
    $http.get("api_yahoo.json").success(function (data) {
                          var result = [];
                          var i=0;
                          angular.forEach(data, function(value, key) {                          
                                  result[i] = key;
                              i++;
                          });     
                          $scope.customMap = i;
                          addressObj = result;           
                          $scope.objKey = result;
                       
                          $scope.newPlace = {
                            objKey: []
                          };

  });
  
  $scope.pin="Quyết định trong địa điểm pin";
  $scope.center="Quyết định trong trung tâm bản đồ";
  $scope.place="Đề cử địa điểm";
  $scope.location="Chỉ định địa điểm";
  $scope.chainstore="Đăng ký chain store";
  
    $scope.click_checkbox = function($event,$index){  
      $scope.locationF($event,$index);
    }
   $scope.locationF = function($event,$index){    
    var element = '#viewMap'+$index;
    
    var mymap = angular.element( document.querySelector( element ) ); 
    
      if(mymap!='[]')      
        mymap[0].hidden=false;

    var checkboxelement = "#"+"checkbox"+$index;
    var buttonelement = "#"+"button"+$index;
    var button = angular.element( document.querySelector( buttonelement ) ); 
    var checkbox = angular.element( document.querySelector( checkboxelement ) ); 
    if(button!='[]')      
       button[0].hidden=false;
    if(checkbox!='[]')      
      checkbox[0].checked=false;



    var geocoder = new google.maps.Geocoder();
    var marker;
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';  
    var latlng;// = new google.maps.LatLng(21.0274033, 105.77441650000003);
    
      var map = new google.maps.Map(document.getElementById('map'+$index), {
          zoom: 8,
        //  draggable: false,
          streetViewControl: false,
          navigationControl:true,
        //  keyboardShortcuts: false,
        //  disableDoubleClickZoom: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });     
      var address = addressObj[$index];       
      if($index>99)  
        address = document.getElementById('address').value;  
          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {             
                  latlng = results[0].geometry.location;
                //   marker.setMap(null);
                  marker = new google.maps.Marker({
                  map: map,
                  position: latlng,
                  title: 'Set lat/lon with button click property',
                          draggable: true
              });
                  map.setCenter( latlng );
      var latlngCenter = map.getCenter();
     var maker_center = new google.maps.Marker({
          position: latlngCenter,
          map: map,
          title: 'Set lat/lon values for this property',
           icon: iconBase + 'schools_maps.png'
      });
       model[$index]=[];
       model[$index][0] = {
                    lat:latlngCenter.lat(),
                    lng:latlngCenter.lng(),
                    checked:"false"
                 };
       model[$index][1] = {
                lat:latlng.lat(),
                lng:latlng.lng(),
                checked:"false"
              };          
     
        google.maps.event.addListener(map, 'drag', function(a) {
         maker_center.setMap(null);
               latlngCenter = map.getCenter();
             maker_center = new google.maps.Marker({
          position: latlngCenter,
          map: map,
          title: 'Set lat/lon values for this property',
          icon: iconBase + 'schools_maps.png'
          });
              map.setCenter( latlngCenter );
             
                 model[$index][0] = {
                    lat:latlngCenter.lat(),
                    lng:latlngCenter.lng()
                 };
            });

            google.maps.event.addListener(marker, 'dragend', function(a) {   

            model[$index][1] = {
              lat:a.latlng.lat(),
              lng:a.latlng.lng(),
              checked:"false"
            };
             
            });
            }     
            else{
                 myEl[0].hidden=true;
                 alert('not successful for the following reason: ' + status);
              }        
            });
   };
  
    $scope.selectLocation = function($event,$index){  
    var map = document.getElementById('map'+$index);
    var checkboxelement = "#"+"checkbox"+$index;
    var buttonelement = "#"+"button"+$index;
    var button = angular.element( document.querySelector( buttonelement ) ); 
    var checkbox = angular.element( document.querySelector( checkboxelement ) ); 
   if(checkbox!='[]')
    {
     checkbox[0].checked=true;
     model[$index][1]['checked'] = checkbox[0].value;
    } else
    {

       model[$index][1]['checked'] = true;
    }

    if(button!='[]')
     button[0].hidden=true;
    var staticImage ="http://maps.google.com/maps/api/staticmap?center="+model[$index][1]['lat']+","+model[$index][1]['lng']+"&markers=icon:http://tinyurl.com/2ftvtt6|"+model[$index][1]['lat']+","+model[$index][1]['lng']+"&zoom=15&size=1024x200&sensor=false"
    map.innerHTML= "<img src='"+staticImage+"'"+"/>";
   
   };
    $scope.selectCenter = function($event,$index){  
    var map = document.getElementById('map'+$index);
     var checkboxelement = "#"+"checkbox"+$index;
    var buttonelement = "#"+"button"+$index;
    var button = angular.element( document.querySelector( buttonelement ) ); 
    var checkbox = angular.element( document.querySelector( checkboxelement ) ); 
    if(checkbox!='[]')
    {
     checkbox[0].checked=true;
     model[$index][0]['checked'] = checkbox[0].value;
    } 
    else
    {
       model[$index][0]['checked'] = true;
    }

    if(button!='[]')
     button[0].hidden=true;
    
    var staticImage ="http://maps.google.com/maps/api/staticmap?center="+model[$index][0]['lat']+","+model[$index][0]['lng']+"&markers=icon:http://tinyurl.com/2ftvtt6|"+model[$index][0]['lat']+","+model[$index][0]['lng']+"&zoom=15&size=1024x200&sensor=false"
    map.innerHTML= "<img src='"+staticImage+"'"+"/>";
   };
   $scope.chainstoreF = function($event,$index){  
    alert($index);
   };

});
