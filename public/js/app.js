
  'use strict';
  // create our angular module and inject firebase
  angular.module('noteApp', ['firebase'])

  // create our main controller and get access to firebase
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
          //var ref = firebase.database().ref().child('myNote'); 
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

          //     $scope.upDateNote = function () {
          //         alert();
          //     this.menote = JSON.stringify(testNote);
          
          //     menote.note = 'in progress';
          //     $scope.notes.$save(this.menote);

          // };


          
          
        })


  .controller('loginController', function($scope, $firebase, $rootScope, $firebaseArray, $firebaseObject, $timeout) {
   
    $scope.userEmail = "";
    $scope.setEmail = function () { 
                      // alert($scope.userEmail );            
                      localStorage.setItem('email', $scope.userEmail );
                  //console.log(localStorage.getItem('email')); 
                };

                //var testNote = JSON.parse(localStorage.getItem('todos'));    
                
              });





















   /*<script>
                     
             var firebaseConfig  = {
  			apiKey: "AIzaSyAqu8jyV5ECKD_Bhd-Be6mbvUYnTZ0cWA0",
  		    authDomain: "andela-83b71.firebaseapp.com",
  		    databaseURL: "https://andela-83b71.firebaseio.com",
  		    projectId: "andela-83b71",
  		    storageBucket: "andela-83b71.appspot.com",
  		    messagingSenderId: "632055894361"
        };

           firebase.initializeApp(firebaseConfig );
              
           
          init =()=>{
              var notes=[]; 
              var ref = firebase.database().ref().child('myNote'); 
              ref.orderByChild('id').on("child_added", snap=>{
                  var email = snap.child("email").val();
                  var title = snap.child("title").val();
                  notes.push({email: email, title: title});              
                  $('#notecontainer').append('<div class="note col-sm-3">'+
  			         '<a href="javascript:;" class="button remove">X</a>'+
                       '<a href="/addnote">'+
  				        '<div class="note_cnt">'+
  			            '<h3 class="title sticttext" >'+title+'</h3>'+
  				        '<p class="cnt sticttext" >' + email +'</p>'+
  				        '</div>'+
                       '</a>'+
  				 '</div>');
                console.log(notes);
                console.log(notes.length);
              })

              }
       </script>*/