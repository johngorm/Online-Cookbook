'use strict'
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import Recipe from './models/recipe.js';
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connections error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/public"));

db.once('open', () =>{
	app.listen(PORT, function() {
		console.log("App running on port " + PORT);
	})
});

app.get('/recipe', (req, res) =>{

	Recipe.findAll({},(err, results) => {
		if(err){
			console.error(err);
			throw err;
		}
		else{
			if(recipes.length !== 0){
				
				for(var recipe in recipes){
					if(recipes[recipe].ingredients.split(',')){
						recipes[recipe].ingredients = recipes[recipe].ingredients.split(','); 
					}
				}
			}

			res.json(recipes);
		}
	})

});

app.post('/recipe', (req, res) =>{
	let recipe = req.body;
	if(!recipe.rating){
		recipe.rating = 0;
	}
	let new_recipe = new Recipe(recipe);
	new_recipe.save( (err, recipe_doc) =>{
		if(err){
			console.error(err);
			throw err;
		}
		else{
			res.redirect('/recipe')
		}
	})
	
})

app.get('/recipe/:id', (req,res) =>{
	Recipe.findOne({
		"_id": mongoose.Types.ObjectId(req.params.id)
	}).exec((err, recipe)=>{
		if(err){
			console.error(err);
			throw err;
		}
		else{
			res.json(recipe);
		}
	});
});

app.delete('/recipe/:id', (req,res) =>{
	try {
		Recipe.deleteOne({
			"_id": mongoose.Types.ObjectId(req.params.id)
		});
	} catch (e){
		console.error(e);
		throw e;
	}
})


app.get('/recipe/ingredient/:ingredient', (req, res) =>{

	let ingred = req.params.ingredient ;
	Recipe.findAll({
		"ingredients" : new RegExp('^' + ingred + "$", 'i')
	}, (err, recipes) =>{
		if(err) {
			console.error(err);
			throw err;
		}
		else{
			for(var recipe in recipes){
				if(recipes[recipe].ingredients.split(',')){
					recipes[recipe].ingredients = recipes[recipe].ingredients.split(','); 
				}
			}
			res.json(recipes);
		}
	});
});




