/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var map;
var marker;

var sim_loc = [
    {lat:32.715736, lng: -117.161087}, //San Diego
    {lat:34.052235, lng: -118.243683}, //Los Angeles
    {lat:39.742043, lng: -104.991531}, //Denver
    {lat:37.733795, lng: -122.446747}, //San Francisco
    {lat:41.881832, lng: -87.623177}, //Chicago
    {lat:40.730610, lng: -73.935242}, //New York
    {lat:25.761681, lng: -80.191788}, //Miami
];

onDeviceReady = function() {
    console.log("On Device ready!");
    $('#title').text("testing");
    // Create a map, marker and polyline
    var pos = new google.maps.LatLng(37.773972, -122.431297);
    var options = {
        center: pos,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP            
    };
    map = new google.maps.Map(document.getElementById("map_space"), options);

    marker = new google.maps.Marker();
    marker.setMap(map);
    
    polyline = new google.maps.Polyline();
    polyline.setMap(map);

    path = new google.maps.MVCArray();
    polyline.setPath(path);

    clearDB();

    //navigator.geolocation.watchPosition(onWatchSuccess, onWatchFailure, {timeout: 30000});
    
    //Simulation
    simulateTrip();
}

simulateTrip = function () {
    sim_loc.forEach(function(value, index) {        
        setTimeout(buildPolyline, (index + 1)*5000, value);     
    });    
}

buildPolyline = function (new_coord) {
    //console.log("changed location: Lat: " + position.coords.latitude + " Long: " + position.coords.longitude);
    $("#title").text("Lat: " + new_coord.lat + " Long: " + new_coord.lng);

    //Set Tracking Marker
    marker.setPosition({lat: new_coord.lat, lng:new_coord.lng});

    path = polyline.getPath();
    path.push(new google.maps.LatLng(new_coord.lat, new_coord.lng))    

    polyline.setPath(path);

    //map.setCenter({lat: new_coord.lat, lng:new_coord.lng});
    var bounds = map.getBounds();
    if (bounds.contains({lat: new_coord.lat, lng:new_coord.lng})) {
        console.log ("within the bounds");
    } else {
        console.log ("extending the bounds");
        bounds = bounds.extend({lat: new_coord.lat, lng: new_coord.lng});   
    }
    
    //map.fitBounds(bounds);
    
    //map.panTo({lat: new_coord.lat, lng: new_coord.lng});
    map.fitBounds(bounds, 0);
    //map.panToBounds(bounds);
    //map.setZoom(18);

    uploadData(path);
}

onWatchSuccess = function(position) {
    buildPolyline({lat: position.coords.latitude, lng: position.coords.longitude});
}

onWatchFailure = function() {
    console.log("onWatchFailure");
}

document.addEventListener('deviceready', this.onDeviceReady, false);
