var db = require("./../sql-lite.js");
var _ = require('underscore');
var optionparse = require('./option-parser.js');
var testparse = require('./test-parser.js');


module.exports={
	setTest:function (objTest,test){
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
			    	setQuestionObject(questionObject,testId);
			    	answer = null;
					    
				}else{
					answer = questionObject.split(";")[2];
				}
			}

	}).catch(function(e){
	console.log(e);
});
}
}
function setQuestionObject(questionObject,testId){
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
