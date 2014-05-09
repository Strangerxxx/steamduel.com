require.config({
	baseUrl: 'js/libs',
	paths: {
		app: '../app',
		tpl: '../tpl',
		'jquery': 'jquery-2.1.1',
		'backbone': 'backbone-1.1.2',
		'underscore': 'underscore-1.6.0',
		'jquery.bootstrap': 'bootstrap-3.1.1',
		'text': 'text-2.0.10'
	},
	/*map: {
		'app/main': {
			'tpl/home': 'text!tpl/main/home.html'
		}
	},*/
	shim: {
		'jquery': {
			exports: '$'
		},
		'jquery.bootstrap': {
			deps: ['jquery']
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	}
});
require(['app/router', 'jquery', 'backbone'], function(Router){
	var router = new Router();
	Backbone.history.start();
});
/*
var app = {};

var app.controller = new Backbone.Router.extend({
	routes: {
		'': 'handler',
		'!/': 'handler'
		'!/:game/:page': 'handler'
	},
	handler: function(game, page){
		console.log('game='+game+'\npage='+page);
	}
});

Backbone.history.start();

var app.views = {};

var app.views.main = new Backbone.View.extend({
	el: $('#wrapper'),
	tamplate
});
*/
