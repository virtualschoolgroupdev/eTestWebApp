module.exports = function(sequelize,DataTypes){
return sequelize.define('answers',{
	qQuestionId : {
		type: DataTypes.STRING,
		allowedNull : false
	},
	qAnswerOptionId : {
		type: DataTypes.STRING,
		allowedNull : false
	}
});
};