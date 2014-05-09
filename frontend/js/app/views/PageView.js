define(function(require) {
	var $			= require('jquery'),
		_			= require('underscore'),
		Backbone	= require('backbone');

	return Backbone.View.extend({
		initialize: function(){
			this.model.on('change:game', this.render, this);
		},
		template: function(game, page){
			var tpl	= require('text!tpl/games/'+game+'/'+page+'.html');
			return _.template(tpl);
		},
		render: function(){
			console.log(this.model);
			this.$el.html(this.template(this.model.get('game'), this.model.get('page')));
		}
	});
});
