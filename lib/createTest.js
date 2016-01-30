
var _ = require('underscore');
var optionparse = require('./option-parser.js');
var testparse = require('./test-parser.js');
var Q = [];

module.exports={
	setTest:function (objTest,test,db){
	db.eTest.create({

	qClass:objTest.qClass,
	qDOI:objTest.qDOI,
	qPackage:objTest.qPackage,
	qChapter:objTest.qChapter,
	qFileName:objTest.qFileName
	
	}).then(function(obj){

		testId = obj.id;
		var objQuestions = testparse(test,test.split(";")[0].toString());
		var answer = null;
			for (index = 0; index < objQuestions.length; ++index) {

			    var questionObject = objQuestions[index];
			    if(questionObject.indexOf('(a)')>-1)
			    {
			    	questionObject= optionparse(questionObject,answer);
			    	setQuestionObject(questionObject,testId,db);
			    	answer = null;
					    
				}else{
					answer = questionObject.split(";")[2];
				}
			}

	}).catch(function(e){
	console.log(e);
});
},
	getTest:function(QuestionsList,db){
		var TestObjects = {};
		var i =0;
		var TestSet = [];
		QuestionList = JSON.parse(QuestionsList)
			for (var i = QuestionList.length - 1; i >= 0; i--) {
			 	
			  var id = QuestionList[i].qQuestionId;
				//var $scope = {};
					db.query('SELECT * FROM options, questions WHERE questions.id = options.qQuestionId and questions.id =  '+ id).then(function(data){
								TestSet.push((data));
							});

						// var id = QuestionList[i].qQuestionId;
						// var OptionsArray = [];
						
						// db.question.find({
						// 	where:{
						// 		id:id
						// 		}
						// 	}).then(function(data){
								
						
						// 		db.qOptions.findAll({
						// 	where:{
						// 		qQuestionId:id
						// 	}
						// }).then(function(Optsdata){

						//  var OptionsList = JSON.stringify(Optsdata);
						 
						//  JSON.parse(OptionsList).forEach(function(Opt){
						//  	OptionsArray.push(Opt.qOptionText);
						//  });
						// // 	TestObjects.id = (QuestionList[i].qQuestionId);
						//  TestObjects.optArray= (OptionsArray);
						//   TestObjects.qText= data.qText;
						//  console.log(TestObjects);
											
						//  });

						 //});
						
						
						
						
						//console.log(Q.length);
						//console.log(JSON.stringify(Q));
						
						
						
					
					
					};
				

			setTimeout(function(){
				return TestSet;
			},2000);
			
	}
}


function getQtext(qQuestionId,db){


}

// function getOptions(,db){

// }
function setQuestionObject(questionObject,testId,db){
	db.question.create({
	    		qText:questionObject["question"]
	    	}).then(function(obj){
	    	
	    		
	    	var optsArray = questionObject["options"];
    	
    		for (var i in optsArray) {
    	
	    		db.qOptions.create({
			    	qQuestionId:obj.id,
			    	qOptionText: optsArray[i] 
			    }).catch(function(e){
			    	console.log(e);
				});
		
    		}
			
			db.qAnswer.create({
				qQuestionId:obj.id,
				qAnswerOptionId:questionObject['answer']
			});
			db.eTestQue.create({
				qQuestionId:obj.id,
				qTestId:testId
			});

	    	}).catch(function(e){
	    		console.log(e);
	    	});
	    	
   
}
