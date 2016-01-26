var express = require('express');
var app = express();
var createTest = require('./lib/createTest.js');
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
createTest.setTest(objTest,test);

res.send("We got this test!");
});




db.sequelize.sync().then(function(){
	app.listen('3000',function(){
console.log("Express is listening");
});
});
