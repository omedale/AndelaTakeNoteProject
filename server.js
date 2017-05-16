
var express = require('express');
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


var app = express();
let neval = "";
app.use(express.static(__dirname + '/public'));
  
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

if (typeof localStorage === "undefined" || localStorage === null) {
  localStorage = new LocalStorage('./scratch');
}


const posts = [
  {
    id: 1,
    author: 'John',
    title: 'Templating with EJS',
    body: 'Blog post number 1'
  },
  {
    id: 2,
    author: 'Drake',
    title: 'Express: Starting from the Bottom',
    body: 'Blog post number 2'
  },
  {
    id: 3,
    author: 'Emma',
    title: 'Streams',
    body: 'Blog post number 3'
  },
  {
    id: 4,
    author: 'Cody',
    title: 'Events',
    body: 'Blog post number 4'
  }
]

//-------------
const postee = [
  {  
    author: 'John',
    title: 'Templating with EJS',
    body: 'Blog post number 1'
  },
  { 
    author: 'Drake',
    title: 'Express: Starting from the Bottom',
    body: 'Blog post number 2'
  },
  { 
    author: 'Emma',
    title: 'Streams',
    body: 'Blog post number 3'
  },
  {
    author: 'Cody',
    title: 'Events',
    body: 'Blog post number 4'
  }
]

// index page 
app.get('/', function(req, res) {
	
    var tagline = "TakeNotez";

    res.render('pages/home', {
        tagline: tagline
    })
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about',{
    	  posts: posts 
    });
});

app.get('/signup', function(req, res) {
    res.render('pages/signup',{
    	  posts: posts 
    });
});

app.post('/loginuser', function(req, res) {

  var user_email=req.body.user;
  var password=req.body.password;

  firebase.auth().signInWithEmailAndPassword(user_email, password) 
  .then(function(user) { 
   // console.log(user.email);
    localStorage.setItem('userAccount', user.email);
    console.log(localStorage.getItem('userAccount'));
    //res.redirect('home'); 
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

  console.log("User name = "+user_email+", password is "+password);
  //res.end("yes");
});

app.post('/signupuser', function(req, res) {

  var user_email=req.body.user;
  var password=req.body.password;

  firebase.auth().createUserWithEmailAndPassword(user_email, password)
  console.log("User name = password is ")
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


  console.log("User name = "+user_email+", password is "+password);
    
    var user = firebase.auth().currentUser;
      if (user) {
       console.log("User is signed in");
      } else {
       console.log("No user is signed in");
      }

  res.end("yes");



    // res.render('pages/home',{

    // });
    
});

app.get('/home', function(req, res) {
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
       res.render('pages/home',{
    	  posts: posts 
    });
  } else {
       res.redirect('/logout')
  }
});

});

app.get('/login', function(req, res) {
    res.render('pages/login',{
    	  posts: posts 
    });
});

app.get('/addnote', function(req, res) {
    res.render('pages/addnote',{
    	  posts: posts 
    });
});

app.get('/post/:id', (req, res) => {

  const post = posts.filter((post) => {
    return post.id == req.params.id
  })[0]

  res.render('pages/post', {
    author: post.author,
    title: post.title,
    body: post.body
  })
})

app.get('/logout', function(req, res) {
  firebase.auth().signOut().then(function() {
  console.log("logged out");
}).catch(function(error) {
  console.log("logged out error");
});
    res.render('pages/login',{
    });
});



app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})



app.listen(3020);

console.log('we are live');
