var Sequelize = require('sequelize');
var sequelize= new Sequelize(undefined,undefined,undefined,{
	'dialect': 'sqlite',
	'storage': __dirname +'/database/data/basic-db.sqlite'
});

var db = {};
var str = __dirname;
db.question = sequelize.import(str + "/database/models/question.js");
db.qOptions = sequelize.import(str + "/database/models/options.js");
db.qAnswer = sequelize.import(str + "/database/models/answer.js")
db.eTest = sequelize.import(str + "/database/models/etest.js");
db.eTestQue = sequelize.import(str + "/database/models/test-question.js");
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;

// var ETest = 

sequelize.sync({force: true}).then(function(){
	// ETest.create({
	// 	qClass:'12',
	// 	qDOI: '08-01-2015',
	// 	qSubject: 'BIO',
	// 	qTextId: '1',
	// 	qOptionsId:'1',
	// 	qAnswerId:'1'
	// }).then(function(){
	// 	console.log("created");
	// }).catch(function(e){
	// 	console.log("error!");
	// 	console.log(e);

	// });
	console.log("everytihg is set");
})