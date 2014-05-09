define(function(require){
	var $			= require('jquery'),
		_			= require('underscore'),
		Backbone	= require('backbone'),
		tpl			= require('text!tpl/ContainerTpl.html'),

		template = _.template(tpl);

	return Backbone.View.extend({
		initialize: function(){
			this.model.on('change', this.activesChange, this);
			//this.model.on('page:change', this.pageChange, this);
		},
		render: function(){
			this.$el.html(template());
			return this;
		},
		events: {
			'click .game-nav li a': 'gameSelect',
			'click .page-nav li a': 'pageSelect'
		},
		activesChange: function(){
			console.log(this.model);
			$('.game-nav li a[data-game='+this.model.get('game')+']').parent().addClass('active');
			$('.game-nav li a[data-game='+this.model.previous('game')+']').parent().removeClass('active');
			$('.page-nav li a[data-page='+this.model.get('page')+']').parent().addClass('active');
			$('.page-nav li a[data-page='+this.model.previous('page')+']').parent().removeClass('active');
		},
		gameSelect: function(e){
			var game = $(e.currentTarget).data('game');
			this.model.set({game: game});
			Backbone.history.navigate('!/'+this.model.get('game')+'/'+this.model.get('page'));
		},
		pageSelect: function(e){
			var page = $(e.currentTarget).data('page');
			this.model.set({page: page});
			Backbone.history.navigate('!/'+this.model.get('game')+'/'+this.model.get('page'));
		}
	});
});