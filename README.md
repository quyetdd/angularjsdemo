# angularjsdemo
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<style>
#map {
    height:420px;
    width:600px;
}
</style>
<div ng-app="mapsApp" ng-controller="MapCtrl">
     <div id="panel">
      <input id="address" type="textbox" value="Sydney, NSW">
      <input type="button" value="Geocode" ng-click="openInfoWindow($event)">
    </div>
    <div id="map"></div>

</div>
<script type="text/javascript">
//Angular App Module and Controller
angular.module('mapsApp', [])
.controller('MapCtrl', function ($scope) {
  var latlng = new google.maps.LatLng(51.4975941, -0.0803232);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var geocoder = new google.maps.Geocoder();
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'Set lat/lon values for this property',
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function(a) {
        console.log(a);
        var div = document.createElement('div');
        div.innerHTML = a.latLng.lat().toFixed(4) + ', ' + a.latLng.lng().toFixed(4);
        document.getElementsByTagName('body')[0].appendChild(div);
          var objPoint = new google.maps.LatLng( 
  parseFloat(  a.latLng.lat().toFixed(4) ) , 
  parseFloat( a.latLng.lng().toFixed(4) ) 
);

// now center the map using the new point //

map.setCenter( objPoint );
    });

    $scope.openInfoWindow = function(e){
     
        e.preventDefault();
          var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
                  draggable: true
      });
        
       //  alert('Geocode was not successful for the following reason: ' + results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
    }


});
</script>
