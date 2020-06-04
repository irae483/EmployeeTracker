const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   '',
    database    :   'nodemysql'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
/*
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createemployeetable', (req, res) => {
    let sql = "CREATE TABLE Employee ( ID int AUTO_INCREMENT, Name VARCHAR(255), Address VARCHAR(255), Email VARCHAR(255), Phone VARCHAR(255), Position VARCHAR(255), Department VARCHAR(255), StartDate VARCHAR(255), EndDate VARCHAR(255), Status VARCHAR(255), Shift VARCHAR(255), Manager VARCHAR(255), Color VARCHAR(255), PRIMARY KEY(ID) )";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Employee table created....');
    });
});

app.get('/addEmployee', (req, res) => {
    let employee = {Name: 'Iron Man', Address: 'Awesome'};
    let sql = 'INSERT INTO Employee SET ?';
    let query = db.query(sql, employee, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Employee added....');
    });
})
*/
app.get('/employees', (req, res) => {
    let sql = 'SELECT * FROM Employee';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(result);
    })
})

app.listen('5000', () => {
    console.log('Server started on port 5000');
});