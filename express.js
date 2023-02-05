var express = require('express');
var db = require("./sql-lite.js");
var app = express();
var createTest = require('./lib/createTest.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Q = [];
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
var packageName = fileName.split('.')[2];
var chapter = fileName.split('.'+packageName+'.')[1];
var testId = null;
var objTest = {};
var global_socket = null;
objTest.qClass = classNum;
objTest.qDOI = Doi;
objTest.qPackage = packageName;
objTest.qChapter = chapter;
objTest.qFileName = fileName;
createTest.setTest(objTest,test,db);
console.log(classNum + "--" + Doi)
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

		socket.on('resultMaker',function(resultSet){
			//console.log(resultSet);
			var QuestionsList = JSON.stringify(resultSet);
			QuestionsList = JSON.parse(QuestionsList);
			var resultTotal = 0;
			var dbAnswers = [];
			var id = " " ;
			for (var i=0; i<= QuestionsList.length - 1;i++) {
			 			//var studAnswer = (QuestionsList[i].answer);
			 			if(i ==0)
			 				id = (QuestionsList[i].qid);
			 			else
			 			 id = id + "," + (QuestionsList[i].qid);
			 	}
			 	
			 	db.sequelize.query("SELECT qQuestionId,qAnswerOptionId from answers where qQuestionId IN ("+ id+")").then(function(data){
			 				
			 				
			 				dbAnswers.push(data[0]);
			 				
			 			}).then(function(){
//			 				console.log(dbAnswers);

			 				for (var i=0; i<= QuestionsList.length - 1;i++) {
			 			//var studAnswer = (QuestionsList[i].answer);
			 				if(QuestionsList[i].qid == dbAnswers[0][i].qQuestionId 
			 					&& QuestionsList[i].answer ==  dbAnswers[0][i].qAnswerOptionId){
                                   resultTotal = resultTotal + 1;
			 				}
			 					
			 			}

			 			socket.emit('giveResultTotal',{
								resultTotal:JSON.stringify(resultTotal)
						}) ;

			 	});

			 	
		});
		socket.on('populateTest',function(obj){
			var TestSet  = [];
			db.eTest.findAll({
				  where: {
				    qFileName:obj
				  }
			}).then(function(obj){
				console.log("----------------------------------");
				var idFromDb =(JSON.parse(JSON.stringify(obj))[0].id);
			console.log(idFromDb);
		db.eTestQue.findAll({
				where:{
					qTestId:idFromDb
				}
			}).then(function(data){
			console.log(data);
			var QuestionsList = JSON.stringify(data);
			QuestionsList = JSON.parse(QuestionsList);
			 for (var i=0; i<= QuestionsList.length - 1;i++) {
			 
			 	var id = QuestionsList[i].qQuestionId;
			 	db.sequelize.query('SELECT * FROM options, questions WHERE questions.id = options.qQuestionId and questions.id =  '+ id).then(function(data){
								
								var OptionsList = JSON.stringify(data);
								OptionsList = JSON.parse(OptionsList);
								var optionsSet = [];
								var obj1 = {};
								
									for (var i = OptionsList[0].length - 1; i >= 0; i--) {
										
										optionsSet.push(OptionsList[0][i].qOptionText);
										if(i == 0){
											obj1.qText = OptionsList[0][i].qText.trim();
											obj1.id = OptionsList[0][i].qQuestionId;
										}

									};
			 				 	 obj1.optionSet = optionsSet;

			 				 	 optionsSet = [];
			 				 	
								 TestSet.push(obj1);
							});

			 	
			 };
			}).then(function(){
                    
				setTimeout(function(){
					console.log(TestSet);
				socket.emit('giveTestSet',{
					ts:JSON.stringify(TestSet)
				}) ;
			},1500);

			});

			});
			
		
		});



});


db.sequelize.sync().then(function(){
		http.listen('8080',function(){
		console.log("Express is listening");
	});
});
