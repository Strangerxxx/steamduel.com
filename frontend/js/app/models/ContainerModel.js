define(function(require){
	var $			= require('jquery'),
		Backbone	= require('backbone'),

		Container = Backbone.Model.extend({
			initialize: function(){},
			sync: function (method, model, options){
				if (method === 'read'){
					options.success();
					this.trigger('change:game');
					this.trigger('change:page');
				}
			}
		}),
		Page = Backbone.Collection.extend({
			model: Container,
			sync: function(method, model, options){
				//console.log(this.model);
				if (method === 'read'){
					options.success();
				}
			}
		});
		return {
			Container: Container,
			Page: Page
		}
});