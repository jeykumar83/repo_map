var firebaseConfig = {
    apiKey: "AIzaSyAcUyLyerkEqMHJ1ars3aBr-4rCPZ0klTw",
    authDomain: "map-tracker-ea2ac.firebaseapp.com",
    databaseURL: "https://map-tracker-ea2ac.firebaseio.com",
    projectId: "map-tracker-ea2ac",
    storageBucket: "map-tracker-ea2ac.appspot.com",
    messagingSenderId: "476281466305",
    appId: "1:476281466305:web:b03e92afea514684f5d340",
    measurementId: "G-9FCPHVTX7Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var firestore = firebase.firestore();
  const docRef = firestore.doc("paths/polyline");

  clearDB = function () {
    var db_array = new Array();
    docRef.set({
      path: db_array
    });
  }

  uploadData = function (path) {
      //console.log("Saving data to firebase" + path);

      var db_array = new Array();

      console.log("Length: "+ path.getLength())
      
      path.forEach(function(value, index) {
        db_array.push(new firebase.firestore.GeoPoint(value.lat(), value.lng()))
      });      

      docRef.set({
            path: db_array,
      }).catch(function(error){
          console.log("Firebase upload failed with error: error");
      });
  }

