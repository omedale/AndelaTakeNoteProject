

// create our angular module and inject firebase
angular.module('noteApp', ['firebase'])

// create our main controller and get access to firebase
.controller('mainController', function($scope, $firebase, $firebaseArray, $firebaseObject, $timeout) {
     var firebaseConfig  = {
			apiKey: "AIzaSyAqu8jyV5ECKD_Bhd-Be6mbvUYnTZ0cWA0",
		    authDomain: "andela-83b71.firebaseapp.com",
		    databaseURL: "https://andela-83b71.firebaseio.com",
		    projectId: "andela-83b71",
		    storageBucket: "andela-83b71.appspot.com",
		    messagingSenderId: "632055894361"
      };


    //   firebase.initializeApp(firebaseConfig );
    //    $scope.allNotes = []
    //   const ref = firebase.database().ref().child('myNote');
    //   this.object = $firebaseObject(ref);
    //   var sync = this.object.json
    //   console.log(this.object);
    // $scope.favoritedPosts = $firebaseArray(userFavoriteRef)

        $scope.allNotes = []
         firebase.initializeApp(firebaseConfig );
          var ref = firebase.database().ref().child('myNote'); 
           $scope.notes = $firebaseArray(ref);
           console.log( $scope.notes);
         

            $scope.removeNote = function (index, note) {
                if (note.id === undefined)return;
                $scope.notes.$remove(note);

            };
  
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