module.exports = function(sequelize,DataTypes){
return sequelize.define('eTests', {
	qClass:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			len: [1,2]
		}
	},
	qDOI:{
		type: DataTypes.DATE,
		allowNull: false
	},
	qPackage:{
		type: DataTypes.STRING,
		allowNull: false
	},
	qChapter:{
		type: DataTypes.STRING,
		allowNull: false
	},
	qFileName:{
		type: DataTypes.STRING,
		allowNull: false,
		unique:true
	}
	

});
};

