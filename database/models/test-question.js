module.exports = function(sequelize,DataTypes){
return sequelize.define('test-questions',{
	qQuestionId : {
		type: DataTypes.STRING,
		allowedNull : false
	},
	qTestId : {
		type: DataTypes.STRING,
		allowedNull : false
	}
});
};