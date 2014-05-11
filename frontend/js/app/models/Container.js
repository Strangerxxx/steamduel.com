define(function(require){
	var $			= require('jquery'),
		Backbone	= require('backbone'),

		Page = Backbone.Model.extend({
			initialize: function(){this.hello = 'world'},
			sync: function (method, model, options){
				if (method === 'read'){
					options.success();
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
		}
});