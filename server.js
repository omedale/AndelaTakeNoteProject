
  var express = require('express');
  var expressValidator = require('express-validator');
  var cookieParser = require('cookie-parser');
  var session      = require('express-session');
  var expressMessages      = require('express-messages');
  var cookieParser = require('cookie-parser');
  var jsonfile = require('jsonfile')
  const bodyParser= require('body-parser');
  var flash = require('connect-flash');
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

  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

  app.use(express.static(__dirname + '/public'));
  var sessionStore = new session.MemoryStore;
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(expressValidator());
  app.use(cookieParser('secret'));
  app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
  }));
  app.use(flash());

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
    if (localStorage.getItem('userAccount') != "") {
     res.render('pages/home',{
       port:port
     });
   } else {
     res.redirect('/login')
   }
  });

  app.get('/signup', function(req, res) {
    res.render('pages/signup',{
    });
  });

  app.get('/home', function(req, res) {
    note ="";
    if (localStorage.getItem('userAccount') != "") {
     res.render('pages/home',{
       port:port,
       email: localStorage.getItem('userAccount')
     });
   } else {
     res.redirect('/login')
   }

  });

  app.post('/addnoteNewNote', function(req, res, next) {

    if (localStorage.getItem('userAccount') != "") {
      if(req.body.note === ""){
         req.flash("info", "Blank note not saved");
          res.redirect('/addnote');
        return;
      }else{
        var errors = req.validationErrors();
        if (errors) {
          req.flash("info", errors);
          res.redirect('/addnote');
        } else {

          var note=req.body.note;
          console.log(note);
          var ref = firebase.database().ref('myNote');
          let d = new Date();
          //  console.log(d.getMonth().toString());
          //  console.log(d.getDate().toString() );
          let id = d.getFullYear().toString() + d.getMonth().toString()  + d.getDate().toString()  + d.getHours().toString()  + d.getHours().toString()  + d.getMinutes().toString()  + d.getSeconds().toString() ;
          var notez = { note: note, time: new Date().toString(), id: id, email: localStorage.getItem('userAccount')  };
          ref.push(notez);
          res.redirect('home');
          return;
        }
      }


    } else {
     res.redirect('/login')
   }




  });


  app.post('/editNote', function(req, res, next) {

    if (localStorage.getItem('userAccount') != "") {
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
          let id = d.getFullYear().toString() + d.getMonth().toString()  + d.getDate().toString()  + d.getHours().toString()  + d.getHours().toString()  + d.getMinutes().toString()  + d.getSeconds().toString() ;
          var notez = { note: note, time: new Date().toString(), id: id, email: localStorage.getItem('userAccount')  };
          console.log(note);
          var updateDis = ref.child(localStorage.getItem('noteid'));
          updateDis.set(notez);
          res.redirect('home');
        }
      }
    } else {
     res.redirect('/login')
   }




  });


  app.post('/viewnote', (req, res) => {

    if (localStorage.getItem('userAccount') != "") {
      localStorage.setItem('noteid', req.body.noteid);
      res.render('pages/viewnote', {
      })
    } else {
     res.redirect('/login')
   }

  })


  app.post('/loginuser', function(req, res) {
    var user_email=req.body.email;
    var password=req.body.password;

    firebase.auth().signInWithEmailAndPassword(user_email, password)
    .then(function(user) {

      localStorage.setItem('userAccount', user.email);
      res.redirect('/home');
    })
    .catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        req.flash("info", errorMessage);
        res.redirect('/login');
        console.log(errorMessage);
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

      var errorCode = error.code;
      var errorMessage = error.message;
      req.flash("info", errorMessage);
      console.log(error);
      res.redirect('/signup');
      return;

    });

  });



  app.get('/login', function(req, res) {
    res.render('pages/login',{
    });
  });

  app.get('/downloadjson', function(req, res) {
    console.log(localStorage.getItem('noteid'));
    var file = '/tmp/data.json'
    var obj = {name: 'JP'}

    jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
      console.error(err)
    })
    res.redirect('/home');
  });

  app.get('/addnote', function(req, res) {

    if (localStorage.getItem('userAccount') != "") {
      res.render('pages/addnote',{
      });
    } else {
     res.redirect('/login')
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
