module.exports = function(sequelize,DataTypes){
return sequelize.define('options',{
	qQuestionId : {
		type: DataTypes.STRING,
		allowedNull : false
	},
	qOptionText : {
		type: DataTypes.STRING,
		allowedNull : false
	}
});
};