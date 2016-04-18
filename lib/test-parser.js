var TestToQuestions = function(test,spliter){

//console.log(":::::"+test);
//test = test.toString().replace(/"/g, '');
test= test.split(spliter);
return test;
};
module.exports = TestToQuestions;