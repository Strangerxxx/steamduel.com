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
				this.home = true;
				homeView.router = this;
				homeView.delegateEvents();
				homeView.render();
			},
			handler: function(game, page){
				if(page===null) page = 'duels';
				require([
					'app/views/ContainerView',
					'app/views/TopMenuView',
					'app/views/LeftMenuView',
					'app/views/PageContentView',
					'app/views/PageWidgetView',
					'app/models/Container'
					],
					function(ContainerView, TopMenuView,LeftMenuView, PageContentView, PageWidgetView, Container){
						var	container = new Container.Main;
						container.on('add', function(page){
							page.fetch({
								success: function(data){
									var views = {
										Container:		new ContainerView({model:data});
										TopMenu:		new TopMenuView({model: data}),
										LeftMenu:		new LeftMenuView({model: data}),
										PageContent:	new PageContentView({model: data}),
										PageWidget: 	new PageWidgetView({model: data})
									};
									views.Container.setElement($wrapper);
									views.TopMenu.setElement($('div.TopMenu', views.Container.el));
									views.LeftMenu.setElement($('div.LeftMenu', views.Container.el));
									views.PageContent.setElement($('div.PageContent', views.Container.el));
									views.PageWidget.setElement($('div.PageWidget', views.Container.el));
								}
							});
							console.log('game='+page.get('game')+'\npage='+page.get('page'));
						})
						container.set([{game: game, page: page}]);
					});
				/*require(['app/views/ContainerView', 'app/views/PageView', 'app/models/ContainerModel'], function(ContainerView, PageView, models){
					var containerModel = new models.Container({game: game, page: page});
					containerModel.fetch({
						success: function(data){
							var containerView = new ContainerView({model: data, el: $wrapper});
							containerView.render();
							$container = $("#container", containerView.el);
							/*var pageModel = new models.Page({model: data});
							console.log(pageModel);
							pageModel.fetch({
								success: function(data){
									var pageView = new PageView({model: data, el: $container});
									pageView.render();
								}
							});
						}
					});
				});*/
				
			}
		});
});