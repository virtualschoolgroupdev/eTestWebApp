module.exports = function(sequelize,DataTypes){
return sequelize.define('testquestions',{
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