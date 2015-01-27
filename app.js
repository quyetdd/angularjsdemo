

   var model;

var todo = angular.module('matomeMaps', []);

 
//Angular App Module and Controller
  todo.controller('MapCtrl', function ($scope,$http) {
    $http.get("api_yahoo.json").success(function (data) {
                       $scope.objKey = data;
    });
 $scope.pin="Quyết định trong địa điểm pin";
 $scope.center="Quyết định trong trung tâm bản đồ";
  $scope.place="Đề cử địa điểm";
  $scope.location="Chỉ định địa điểm";
  $scope.chainstore="Đăng ký chain store";
  

   $scope.locationF = function(e,$index){  
    
      var latlng = new google.maps.LatLng(21.0274033, 105.77441650000003);
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';      
      var map = new google.maps.Map(document.getElementById('map'+$index), {
          center: latlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var geocoder = new google.maps.Geocoder();
     // var markersArray = [];
     var maker_center = new google.maps.Marker({
          position: latlng,
          map: map,
          title: 'Set lat/lon values for this property',
           icon: iconBase + 'schools_maps.png'
      });

      var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: 'Set lat/lon values for this property',
          draggable: true
      });
        google.maps.event.addListener(map, 'dragend', function(a) {
         maker_center.setMap(null);
               latlng = map.getCenter();
             maker_center = new google.maps.Marker({
          position: latlng,
          map: map,
          title: 'Set lat/lon values for this property',
           icon: iconBase + 'schools_maps.png'
      });
              map.setCenter( latlng );
                 model[$index] = {
                    lat:latlng.lat(),
                    lng:latlng.lng()
                 };
            });

            google.maps.event.addListener(marker, 'dragend', function(a) {
            var div = document.createElement('div');
            div.innerHTML = a.latLng.lat() + ', ' + a.latLng.lng();
            document.getElementsByTagName('body')[0].appendChild(div);
            var objPoint = new google.maps.LatLng( 
            parseFloat(  a.latLng.lat() ) , 
            parseFloat( a.latLng.lng()) 
            );   
            model[$index] = {
              lat:a.latLng.lat(),
              lng:a.latLng.lng()
            };
      });
  

   };
    $scope.selectLocation = function(e,$index){  
    alert(model[$index]);
   };
    $scope.selectCenter = function(e,$index){  
     alert(model[$index]);
   };
   $scope.chainstoreF = function(e,$index){  
    alert($index);
   };
    $scope.openLocation = function(e){     
          e.preventDefault
          marker.setMap(null);
          var address = document.getElementById('address').value;
          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);
              marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  title: 'Set lat/lon with button click property',
                          draggable: true
              });

              //begin listener
               google.maps.event.addListener(marker, 'dragend', function(a) {
                        var div = document.createElement('div');
                        div.innerHTML = a.latLng.lat() + ', ' + a.latLng.lng();
                        document.getElementsByTagName('body')[0].appendChild(div);
                        var objPoint = new google.maps.LatLng( 
                        parseFloat(  a.latLng.lat() ) , 
                        parseFloat( a.latLng.lng())                     
                        );   
                        map.setCenter( objPoint );
              });

              //end listener
                 alert('successful for the following reason: ' + results[0].geometry.location);
            }
            else {
              alert('not successful for the following reason: ' + status);
             }
});
}
});
