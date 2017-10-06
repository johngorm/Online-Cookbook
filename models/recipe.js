import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RecipeSchema = new Schema({
	name: {
		type: String, 
		required: true
	},
	rating: {
		type: Number,
		default: 0,
		min: 0,
		max: 5,
		required: true		
	},
	ingredients: {
		type: [String],
		requied: true,
		get: v => v.split(','),
		set: v => v.join

	},
	directions: {
		type: String,
		require: true
	}
})