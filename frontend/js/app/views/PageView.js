define(function(require) {
	var $			= require('jquery'),
		_			= require('underscore'),
		Backbone	= require('backbone');
	return Backbone.View.extend({
		initialize: function(){
			this.model.on('change:game', this.render, this);
			this.model.on('change:page', this.render, this);
		},
		template: function(game, page){
			var tpl	= require('text!tpl/games/'+game+'/'+page+'.html');
			return _.template(tpl);
		},
		render: function(){
			//console.log(this.model);
			var url = 'text!tpl/games/'+this.model.get('game')+'/'+this.model.get('page')+'.html'
			var und = _;
			var vis = this;
			require([url], function(text){
				tpl = und.template(text);
				vis.$el.html(tpl);
				console.log('hello from pageview');
			});
			//this.template(this.model.get('game'), this.model.get('page'))
			//this.$el.html(template());
		}
	});
});
