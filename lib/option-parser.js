var QuestionOptionParser = function(question,answer){

var quest =question.split('(a)')[0];
var options = {};
question = question.split('(a)')[1];

if(question.indexOf('(b)')>-1){
	options["a"] =  question.split('(b)')[0].trim().replace(/;/g, "");
	question = question.split('(b)')[1];
}

if(question.indexOf('(c)')>-1){
	options["b"] =  question.split('(c)')[0].trim().replace(/;/g, "");
	question = question.split('(c)')[1];
}

if(question.indexOf('(d)')>-1){
	options["c"] =  question.split('(d)')[0].trim().replace(/;/g, "");
	question = question.split('(d)')[1];
}
else{
	options["c"] =  question.trim().replace(/;/g, "");
	question = '';
}

if(question.indexOf('(e)')>-1){
	options["d"] =  question.split('(e)')[0].trim().replace(/;/g, "");
	question = question.split('(e)')[1];
}
else{
	options["d"] =  question.trim().replace(/;/g, "");
	question = '';
}

var obj = {};
obj['question'] = quest;
obj['options'] = options;
var ans = ( answer.toLowerCase().replace(/'/g, ""));
obj['answer'] = options[String(ans)];

return obj;
}

module.exports=QuestionOptionParser;