'use strict'
const express = require('express');
const bodyParser = require("body-parser");


const app = express();

const PORT = process.env.PORT || 3000;
const db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/public"));

db.sequelize.sync().then(function() {
	
	app.listen(PORT, function() {
		console.log("App running on port " + PORT);
	})
});

app.get('/recipe', (req, res) =>{
	console.log('Request sent')

	db.recipe.findAll({}).then(function(recipes) {

		if(recipes.length !== 0){
			
			for(var recipe in recipes){
				recipes[recipe].ingredients = recipes[recipe].ingredients.split(',');
			}
		}

		res.json(recipes);
	})


});

app.post('/recipe', (req, res) =>{
	let recipe = req.body;
	if(!recipe.rating){
		recipe.rating = 0;
	}
	db.recipe.create({
		name: recipe.name,
		ingredients: recipe.ingredients,
		directions: recipe.directions,
		rating: recipe.rating
	}).then(function(response){
		console.log('post complete');
		res.json(response);
	})
	
})

app.get('/recipe/:id', (req,res) =>{
	db.recipe.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(recipe){
		res.json(recipe);
	})
});

app.delete('/recipe/:id', (req,res) =>{
	console.log('delete' + req.params.id);
	db.recipe.destroy({
		where:{
			id: req.params.id
		}
	}).then(function(response){
		res.json(response);
	});
})


app.get('/recipe/ingredient/:ingredient', (req, res) =>{

	let parsed_ingredient = '%' + req.params.ingredient + '%';
	console.log("ingredient")
	db.recipe.findAll({
		where: {
			ingredients: {
				$like: parsed_ingredient
			}
		}
	}).then(function(recipes){
		for(var recipe in recipes){
			recipes[recipe].ingredients = recipes[recipe].ingredients.split(',');
		}
		res.json(recipes);
	})
});




