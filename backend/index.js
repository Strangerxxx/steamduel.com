var SteamTradeOffers = require('steam-tradeoffers');
var express = require('express');
var app = express();
var offers = new SteamTradeOffers();
app.use(express.json());
app.use(express.urlencoded());
app.get('/backend/', function(req, res){
  res.send('Hello World');
});
app.post('/backend/backpack', function(req, res){
	var sessionID = req.body.sessionID,
		cookies = req.body.cookies;
	res.send(JSON.stringify({ sessionID: sessionID, cookies: cookies }));
	offers.setup(sessionID, cookies);
});

app.listen(3000);
