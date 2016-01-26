module.exports = function(sequelize,DataTypes){
return sequelize.define('questions',{
	qText : {
		type: DataTypes.STRING,
		allowedNull : false
	}
});
};