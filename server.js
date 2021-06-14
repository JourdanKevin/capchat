const express = require('express');
const app = express();
const db = require('./queries/querie');
const port = 3000;

app.use(express.static(__dirname+'/public'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/capchat', function (req, res) {
  res.sendFile(__dirname + '/views/capchat.html');
})
// app.get('/', function (req, res,next) {
//   if (req.headers.authorization){
//     console.log(req.headers.authorization)
//     res.header('Auhorisation',req.headers.authorization)
//     res.redirect("/enregistrement")
        // next();    
//   }
//   else{
//     res.redirect('/login');
//   }
// })

app.get('/', function (req, res) {
    res.redirect('/login');
})

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/identification.html');    
})
app.get('/enregistrement', function (req, res) {
  res.sendFile(__dirname + '/views/enregistrement.html');
})


app.get("/getImages/:type", db.getImages);
app.get("/getImages", db.getAllImages);
app.get("/getUser", db.getUser);
app.post("/createUser", db.postUser);

app.listen(port, () => console.log('The server running on Port '+port));