define(function(require){
	var $			= require('jquery'),
		Backbone	= require('backbone'),

		games = [
			{
				id: 0,
				name: 'dota2',
				display: 'DOTA2',
				icon: '',
				pages: [
					{ id: 0, name: 'duels', display: 'Current duels', icon: 'fa fa-sort-amount-desc'/*, tpl: require('text!tpl/games/dota2/duels.html')*/ },
					{ id: 1, name: 'createduel', display: 'Create duel', icon: 'fa fa-upload'/*, tpl: require('text!tpl/games/dota2/createduel.html')*/ },
					{ id: 2, name: 'tournaments', display: 'Tournaments', icon: 'fa fa-star-half-o'/*, tpl: require('text!tpl/games/dota2/tornaments.html')*/ },
					{ id: 3, name: 'profile', display: 'Profile', icon: 'fa fa-user'/*, tpl: require('text!tpl/games/dota2/profile.html')*/ },
					{ id: 4, name: 'highscores', display: 'Highscores', icon: 'fa fa-globe'/*, tpl: require('text!tpl/games/dota2/highscores.html')*/ }
				]
			},
			{
				id: 1,
				name: 'csgo',
				display: 'CS:GO',
				icon: '',
				pages: [
					{ id: 0, name: 'duels', display: 'Current duels', icon: 'fa fa-sort-amount-desc'/*, tpl: require('text!tpl/games/csgo/duels.html')*/ },
					{ id: 1, name: 'createduel', display: 'Create duel', icon: 'fa fa-upload'/*, tpl: require('text!tpl/games/csgo/createduel.html')*/ },
					{ id: 2, name: 'tournaments', display: 'Tournaments', icon: 'fa fa-star-half-o'/*, tpl: require('text!tpl/games/csgo/tornaments.html')*/ },
					{ id: 3, name: 'profile', display: 'Profile', icon: 'fa fa-user'/*, tpl: require('text!tpl/games/csgo/profile.html')*/ },
					{ id: 4, name: 'highscores', display: 'Highscores', icon: 'fa fa-globe'/*, tpl: require('text!tpl/games/csgo/highscores.html')*/ }
				]
			}
		],
		find = {
			Game: {
				Name:function(name){
					var deferred = $.Deferred(),
						gameFound = null;
					$.each(games, function(index, game) {
						if(game.name === name){
							gameFound = game;
						}
					});
					deferred.resolve(gameFound);
					return deferred.promise();
				},
				Id: function(id){
					var deferred = $.Deferred(),
						gameFound = null;
					$.each(games, function(index, game) {
						if(game.id === id){
							gameFound = game;
						}
					});
					deferred.resolve(gameFound);
					return deferred.promise();
				}
			},
			Page: {
				Name: function(game, name){
					var deferred = $.Deferred(),
						pageFound = null;
					$.each(game.pages, function(index, page) {
						if(page.name === name){
							pageFound = page;
						}
					});
					deferred.resolve(pageFound);
					return deferred.promise();
				},
				Id: function(game, id){
					var deferred = $.Deferred(),
						pageFound = null;
					$.each(game.pages, function(index, page) {
						if(page.id === id){
							pageFound = page;
						}
					});
					deferred.resolve(pageFound);
					return deferred.promise();
				}
			}
		},
		Page = Backbone.Model.extend({
			initialize: function(){ console.log(this); },
			sync: function (method, model, options){
				if (method === 'read'){
					//find.Game.Name(this.get('game')).done(function(data){console.log(data);});
					var game = this.get('game');
					var page = this.get('page');
					find.Game.Name(game).done(function(data){
						options.success({game: data});
						find.Page.Name(data, page).done(function(data){
							options.success({page: data});
						});
					});
					console.log(this);
				}
			}
		}),
		Main = Backbone.Collection.extend({
			model: Page,
			sync: function(method, model, options){
				//console.log(this.model);
				if (method === 'read'){
					options.success();
				}
			}
		});
		return {
			Page: Page,
			Main: Main
		};
});