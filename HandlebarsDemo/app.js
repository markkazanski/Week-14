var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

var shitArray = [
    {
      shit: "Shit"
    }, {
      shit: "Fuck"
    },{
        shit:"Wank"
    }
  ];
 
app.get('/list', function (req, res) {
    res.render('list', {foods:shitArray});
});

app.listen(3000);