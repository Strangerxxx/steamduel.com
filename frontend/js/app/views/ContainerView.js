define(function(require){
	var $			= require('jquery'),
		_			= require('underscore'),
		Backbone	= require('backbone'),
		tpl			= require('text!tpl/ContainerTpl.html'),

		template = _.template(tpl);

	return Backbone.View.extend({
		initialize: function(){},
		render: function(){
			this.$el.html(template({game: this.model.get('game'), page: this.model.get('page')}));
			return this;
		}
	});
});