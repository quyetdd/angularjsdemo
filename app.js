

var model =[];
var addressObj ;
var todo = angular.module('matomeMaps', []);
var dataHttp = [];


//begin controller

  todo.controller('MapCtrl', function ($scope,$http,chainstoreService) {
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
          navigationControl:false,
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
                 mymap[0].hidden=true;
                 alert('not successful for the following reason: ' + status);
              }        
            });
   };
    $scope.pointPlace = function($event){  
      alert(angular.toJson(model, true));
    }
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
  
    function applyRemoteData( newdata ) {
      $scope.dataHttp = newdata;
    } 

    $scope.selectInChainstore = function($event,$index){  
      model[$index][2] = dataHttp[$index].result.itemList.item;      
      $scope.chainstoreCount = dataHttp[$index].status.hitCount+"(đã đăng ký)";
       var buttonelement_s = "#"+"btnchainstore"+$index;
               var button_s = angular.element( document.querySelector( buttonelement_s ) ); 
               if(button_s!='[]')
                 button_s[0].hidden=true;
    }

    $scope.chainstoreF = function($event,$index){  
    //call api navi
    //var example =  "https://support.e-map.ne.jp/manuals/cgi/misc/sampleurl.cgi?target=searchdke.cgi&prm=%26pos%3D1%26cnt%3D5%26enc%3DUTF8%26tod%3D13%26shk%3D101%26gnr1%3D0000000%26gnr2%3D0000000%26frewd%3D%25e9%259d%2592%25e5%25b1%25b1&outf=xml";
    
    chainstoreService.getchainStores('get','chainstore.php?id='+$index,'','')
    .then(
      function( newdata ) {
        dataHttp[$index] = newdata;
          if(dataHttp[$index].status.hitCount>0)
            {
              $scope.chainstoreCount = dataHttp[$index].status.hitCount;
               var buttonelement_s = "#"+"chainstore"+$index;
               var button_s = angular.element( document.querySelector( buttonelement_s ) ); 
               if(button_s!='[]')
                 button_s[0].hidden=false;
              //view button chainstore
            }
        } 
      );  
   

   };

});



//begin services
todo.service("chainstoreService",function( $http, $q ) {
// Return public API.
  return({
  getchainStores: getchainStores
  });
// ---
// PUBLIC METHODS.
// ---
//need call API from server for authenticated key form navi
function getchainStores(method,url,action,name ) {
  var request = $http({
                    method: method,
                    url: url,
                  //  params: {
                  //  action: action
                  //  },
                  //  data: {
                  //    name: name
                  //  }
                  });
  return( request.then( handleSuccess, handleError ) );
}


// ---
// PRIVATE METHODS.
// ---

function handleError( response ) {
  // The API response from the server should be returned in a
  // nomralized format. However, if the request was not handled by the
  // server (or what not handles properly - ex. server error), then we
  // may have to normalize it on our end, as best we can.
  if (
  ! angular.isObject( response.data ) ||
  ! response.data.message
  )  {
       return( $q.reject( "An unknown error occurred." ) );
     }
  // Otherwise, use expected error message.
   return( $q.reject( response.data.message ) );
}
  // I transform the successful response, unwrapping the application data
  // from the API response payload.
  function handleSuccess( response ) {
  return( response.data );
  }
}); 
//end services
