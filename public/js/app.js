
  'use strict';

  angular.module('noteApp', ['firebase'])

  .controller('mainController', function($scope, $firebase, $rootScope, $firebaseArray, $firebaseObject, $timeout) {
   var firebaseConfig  = {
     apiKey: "AIzaSyAqu8jyV5ECKD_Bhd-Be6mbvUYnTZ0cWA0",
     authDomain: "andela-83b71.firebaseapp.com",
     databaseURL: "https://andela-83b71.firebaseio.com",
     projectId: "andela-83b71",
     storageBucket: "andela-83b71.appspot.com",
     messagingSenderId: "632055894361"
   };
   localStorage.setItem('todos',"main");
   console.log(localStorage.getItem('todos'));

   $scope.allNotes = []
   firebase.initializeApp(firebaseConfig );
          var ref = firebase.database().ref().child('myNote').orderByChild('email').equalTo(localStorage.getItem('email'));

          $scope.notes = $firebaseArray(ref);
          console.log( $scope.notes);

          $scope.removeNote = function (index, note) {
            $scope.notes.$remove(note);

          };

          $scope.viewNote = function (index, note) {
            localStorage.setItem('todos', JSON.stringify(note));
            console.log(localStorage.getItem('todos'));
            $rootScope.getnote=note.note;
          };



        })

  .controller('noteController', function($scope, $firebase, $rootScope, $firebaseArray, $firebaseObject, $timeout) {
   var firebaseConfig  = {
     apiKey: "AIzaSyAqu8jyV5ECKD_Bhd-Be6mbvUYnTZ0cWA0",
     authDomain: "andela-83b71.firebaseapp.com",
     databaseURL: "https://andela-83b71.firebaseio.com",
     projectId: "andela-83b71",
     storageBucket: "andela-83b71.appspot.com",
     messagingSenderId: "632055894361"
   };

   firebase.initializeApp(firebaseConfig );
   var ref = firebase.database().ref().child('myNote');
   $scope.notes = $firebaseArray(ref);
   console.log( $scope.notes);


   $scope.getnote ="";
   var testNote = JSON.parse(localStorage.getItem('todos'));
   $scope.getnote=testNote.note;
        })


  .controller('loginController', function($scope, $firebase, $rootScope, $firebaseArray, $firebaseObject, $timeout) {

    $scope.userEmail = "";
    $scope.setEmail = function () {

                      localStorage.setItem('email', $scope.userEmail );
                };

              });

















