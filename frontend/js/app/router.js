define(function(require){
	var $			= require('jquery'),
		Backbone	= require('backbone'),
		WrapperView	= require('app/views/WrapperView'),
		HomeView    = require('app/views/HomeView'),

		$body = $('body'),
		wrapperView = new WrapperView({el: $body}).render(),
		$wrapper = $("#wrapper", wrapperView.el);

		return Backbone.Router.extend({
			routes: {
				'': 'home',
				'!/': 'home',
				'!/:game': 'handler',
				'!/:game/:page': 'handler'
			},
			home: function(){
				homeView = new HomeView({el: $wrapper});
				homeView.router = this;
				homeView.delegateEvents();
				homeView.render();
			},
			handler: function(game, page){
				if(page===null) page = 'duels';
				require(['app/views/ContainerView', 'app/views/PageView', 'app/models/ContainerModel'], function(ContainerView, PageView, models){
					var containerModel = new models.Container({game: game, page: page});
					containerModel.fetch({
						success: function(data){
							var containerView = new ContainerView({model: data, el: $wrapper});
							containerView.render();
							
							$container = $("#container", containerView.el);
							var pageModel = new models.Page();
							console.log(pageModel);
							pageModel.fetch({
								success: function(data){
									var pageView = new PageView({model: data, el: $container});
									pageView.render();
								}
							});
						}
					});
				});
				console.log('game='+game+'\npage='+page);
			}
		});
});