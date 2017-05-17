
var express = require('express');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const bodyParser= require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
var firebase = require('firebase').initializeApp({
			apiKey: "AIzaSyAqu8jyV5ECKD_Bhd-Be6mbvUYnTZ0cWA0",
		    authDomain: "andela-83b71.firebaseapp.com",
		    databaseURL: "https://andela-83b71.firebaseio.com",
		    projectId: "andela-83b71",
		    storageBucket: "andela-83b71.appspot.com",
		    messagingSenderId: "632055894361"
      });


var port = process.env.PORT || 8080;

var app = express();

app.use(express.static(__dirname + '/public'));
  
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); 

if (typeof localStorage === "undefined" || localStorage === null) {
  localStorage = new LocalStorage('./scratch');
}
let know = "";
// var myNotez = (ref.child('myNote'))
// console.log(myNotez.toString());

// myNotez.orderByChild('id').on('child_added', function(snap){
//  // console.log(snap.val());
// })


app.get('/', function(req, res) {
    var tagline = "TakeNotez";
    note="";
    res.render('pages/home', {
        tagline: tagline,
        port:port
    })
});

app.get('/signup', function(req, res) {
    res.render('pages/signup',{	   
    });
});

app.get('/home', function(req, res) {
  note ="";
  if (localStorage.getItem('userAccount') != "") {
       res.render('pages/home',{ 
         port:port 	   
    });
  } else {
       res.redirect('/logout')
  }

});

app.post('/addnoteNewNote', function(req, res, next) {
  if(req.body.note === ""){
    return;
  }else{
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
  var note=req.body.note;
  console.log(note);
  var ref = firebase.database().ref('myNote');
 let d = new Date();
 let id = d.getFullYear().toString() + d.getMonth().toString()  + d.getDay().toString()  + d.getHours().toString()  + d.getHours().toString()  + d.getMinutes().toString()  + d.getSeconds().toString() ;
var notez = { note: note, time: new Date().toString(), id: id, email: localStorage.getItem('userAccount')  };
 ref.push(notez);
  res.redirect('home');
  }
  }


});


app.post('/editNote', function(req, res, next) {
 
  if(req.body.note === ""){
    return;
  }else{
  var errors = req.validationErrors();
  if (errors) {

    res.send(errors);
    return;
  } 
  else {

  var note=req.body.note;
  console.log(note);
  var ref = firebase.database().ref('myNote');
 let d = new Date();
 let id = d.getFullYear().toString() + d.getMonth().toString()  + d.getDay().toString()  + d.getHours().toString()  + d.getHours().toString()  + d.getMinutes().toString()  + d.getSeconds().toString() ;
 var notez = { note: note, time: new Date().toString(), id: id, email: localStorage.getItem('userAccount')  };
 console.log(note);
 var updateDis = ref.child(localStorage.getItem('noteid'));
 updateDis.set(notez);
 res.redirect('home');
  }
  }


});


app.post('/viewnote', (req, res) => {
localStorage.setItem('noteid', req.body.noteid);
  res.render('pages/viewnote', {
  })
})


app.post('/loginuser', function(req, res) {
  var user_email=req.body.email;
  var password=req.body.password;

  firebase.auth().signInWithEmailAndPassword(user_email, password) 
  .then(function(user) { 
     res.redirect('/home');
   // console.log("something good");
    localStorage.setItem('userAccount', user.email);
    //console.log(localStorage.getItem('userAccount'));
    
   })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
       console.log("Wrong password ");
       return;
      } else {
         console.log(errorMessage);
         return;
      }
      console.log(error);
      return;
    });

  console.log("User name = "+user_email+", password is "+password);
  // res.redirect('/home');
  //res.end("yes");
  //res.render('pages/home'); 
});

app.post('/signupuser', function(req, res) {

  var user_email=req.body.email;
  var password=req.body.password;
  firebase.auth().createUserWithEmailAndPassword(user_email, password)
  .then(function(user) { 
     res.redirect('/login');
    
   })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
       console.log("Wrong password ");
      } else {
         console.log(errorMessage);
      }
      console.log(error);
    });
    
});



app.get('/login', function(req, res) {
    res.render('pages/login',{
    });
});

app.get('/addnote', function(req, res) {
   
    if (localStorage.getItem('userAccount') != "") {
        res.render('pages/addnote',{   	   
    }); 	   
  } else {
       res.redirect('/logout')
  }
});





app.get('/logout', function(req, res) {
  firebase.auth().signOut().then(function() {
    localStorage.setItem('userAccount', "");
  console.log("logged out");
}).catch(function(error) {
  console.log("logged out error");
});
    res.render('pages/login',{
    });
});


app.listen(port);

 console.log('Our app is running on http://localhost:' + port);
