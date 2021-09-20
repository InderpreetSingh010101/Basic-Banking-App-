


//Header("Access-Control-Allow-Origin:*");
const express = require('express');
const mysql = require('mysql');


const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root1',
    password : '123456',
    database : 'nodemysql'
});

// Connect

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});
// craete post table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(uid int AUTO_INCREMENT, name VARCHAR(255), amount int  , PRIMARY KEY(uid))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});
// create history table
app.get('/createhiststable', (req, res) => {
    let sql = 'CREATE TABLE hists(accto int, accfrom int, amount int ,date VARCHAR(255)';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('hists table created...');
    });
});

// Select hists
app.get('/gethists', (req, res) => {
    let sql = 'SELECT * FROM hists';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
    //    results.forEach((res)=>{
    //        //console.log(res.e-mail);
    //    })
        res.send(results);
    });
});

//add hists
app.get('/addhists/:acc1/:acc2/:amount/:date', (req, res) => {
    let post = {acc1:req.params.acc1, acc2:req.params.acc2 , amount: req.params.amount , date:req.params.date};
    let sql = 'INSERT INTO hists SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('hists 1 added...');
    });
});

app.get('/addpost1', (req, res) => {
    let post = {uid:'8492', name:'Ips' , amount: 200000};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});


app.get('/addpost2', (req, res) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
    //    results.forEach((res)=>{
    //        //console.log(res.e-mail);
    //    })
        res.send(results);
    });
});

// Select single post
app.get('/getpost/:uid', (req, res) => {
    let sql = `SELECT * FROM posts WHERE uid = ${req.params.uid}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        
        res.send(result);
    });
});

// For trancetion
app.get('/trans/:uid/:uid1/:uid2', (req, res) => {
    let sql = `SELECT * FROM posts WHERE uid = ${req.params.uid}`;
    let res1;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res1 = result;
        res.send(result);
    });

    let sql1 = `SELECT * FROM posts WHERE uid = ${req.params.uid2}`;
    let query1 = db.query(sql1, (err, result1) => {
       // if(err) throw err;
        console.log(result1);
        
       // res.send(res1,result1);
    });

});



// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});
// Debit & Credit Transection
app.get('/transection/:id/:amt', (req, res) => {
    let newamount = req.params.amt;
    let sql = `UPDATE posts SET amount = ${newamount} WHERE uid = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});




// Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});






app.listen('3000' , (res)=>{
    //    res.send("Challo ho gya serever");
      console.log("server started");  
    });


