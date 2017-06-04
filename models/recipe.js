module.exports = function(sequelize, DataTypes){
	let recipe = sequelize.define('recipe', {
		name: DataTypes.STRING,
		ingredients: {
			type: DataTypes.STRING({
				get: function (){
					return this.getDataValue('ingredients').split(',');
				},
				set: function(){
					return this.setDataValue('ingredients').join(',');
				}

			}),
		},
		directions: {
			type: DataTypes.TEXT('medium')
		},

		rating: {
			type: DataTypes.INTEGER,
			
			validate:{
				isInt: true
			}
		}
	});
	return recipe;
}