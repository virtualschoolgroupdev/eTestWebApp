var express = require('express');
var db = require("./sql-lite.js");
var app = express();
var createTest = require('./lib/createTest.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var qArray = [];
app.use(express.static(__dirname+'/public'));
app.get('/home',function(req,res){
	res.send("Welcome to the world of Elearning");
});

app.get('/setQuestion',function(req,res){

var test = req.query['test'];
var fileName = req.query['fileName'];
var classNum = fileName.split('(')[0];
var Doi = fileName.split('DOI')[1].split('.')[0];
var packageName = fileName.split('.ET.')[1].split('.')[0];
var chapter = fileName.split('.'+packageName+'.')[1];
var testId = null;
var objTest = {};
objTest.qClass = classNum;
objTest.qDOI = Doi;
objTest.qPackage = packageName;
objTest.qChapter = chapter;
objTest.qFileName = fileName;
createTest.setTest(objTest,test,db);

res.send("We got this test!");
});


io.on('connection',function(socket){
	console.log('User connection via socket::Server message');
		db.eTest.findAll().then(function(obj){
			var objJSON = JSON.stringify(obj);
		
		socket.emit('giveTests',{
			testsArray:objJSON
		});

		});
});

db.sequelize.sync().then(function(){
		http.listen('3000',function(){
		console.log("Express is listening");
	});
});
