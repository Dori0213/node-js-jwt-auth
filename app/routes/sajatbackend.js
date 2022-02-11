const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const fileupload = require("express-fileupload");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(fileupload());
  app.post("/upload", (req, res) => {
    const newpath = "./kepek/";
    const file = req.files.file;
    const filename = file.name;
  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return res.status(500).send({ message: "File upload failed", code: 200 });
      }
        return res.status(200).send({ message: "File Uploaded", code: 200 });
    });
  });
  
  app.get('/gyerekkori', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'zarodoga'
    })
    
    connection.connect()
  
    
    connection.query('SELECT * from emlekek ORDER BY emlekek.datum DESC, gyerekkori_id DESC', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()
  })

  app.post('/emlekfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'zarodoga'
    })
    
    connection.connect()
    //let dt=new Date();
    //let teljesdat=dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
    connection.query("INSERT INTO emlekek  VALUES (NULL, '"+req.body.bevitel1+"', '"+req.body.bevitel2+"','"+req.body.bevitel3+"')", function (err, rows, fields) {
      if (err) throw err
    
      console.log("Sikeres felvitel!")
      res.send("Sikeres felvitel!")
    })
    
    connection.end()
    
  
  })

  app.post('/torles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'zarodoga'
    })
    
    connection.connect()
    connection.query("delete from emlekek where gyerekkori_id="+req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log("Sikeres törlés!")
      res.send("Sikeres törlés!")
    })
    
    connection.end()
    
  
  })

  app.post('/kereses', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'zarodoga'
    })
    
    connection.connect()
    let sz="SELECT * FROM emlekek WHERE szoveg LIKE '%"+req.body.bevitel1+"%'"
    connection.query(sz, function (err, rows, fields) {
      if (err) throw err
    
      res.send(rows)
    })
    
    connection.end()
    
  
  })

  app.post('/emlek_torles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'zarodoga'
    })
    
    connection.connect()
    connection.query("delete from emlekek where gyerekkori_id="+req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
      console.log("Sikeres törlés!")
      res.send("Sikeres törlés!")
    })
    
    connection.end()
  })
}

