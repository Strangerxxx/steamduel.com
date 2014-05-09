define(function(require){
	var $			= require('jquery'),
		_			= require('underscore'),
		Backbone	= require('backbone'),
		tpl			= require('text!tpl/HomeTpl.html'),

		template = _.template(tpl);

	return Backbone.View.extend({
		initialize: function(){},
		render: function(){
			this.$el.html(template());
			return this;
		},
		events: {
			'click .game': 'gameSelect'
		},
		gameSelect: function(e){
			var game = $(e.currentTarget).data('game');
			//console.log(this.router.execute(this.router.handler, {game: game}));
			console.log(this.router.navigate('!/'+game, {trigger: true}));
			console.log(game);
		}

	});
});
