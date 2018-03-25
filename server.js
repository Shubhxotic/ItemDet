var express = require('express');
var path = require('path');
var handlebar=require('handlebars');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var items = require('./routes/items');

var port = 3000;

var app = express();


//View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);







var exphbs = require('express-handlebars');
app.set('views', __dirname + '/template/')
app.engine('html', exphbs({
  extname: 'html',
  layoutsDir: __dirname + '/template/layouts/',
  defaultLayout: __dirname + '/template/layouts/layout',
  partialsDir: [__dirname + '/template/partials'],
  helpers: {
      cards: function(context, options){
          console.log(context);
        //   alert(context);
          var ret = "<ul>";
        
        return ret + "</ul>";
      }
  }
}));

app.set('view engine', 'handlebars');





// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);
app.use('/item',items);


app.listen(port, function(){
    console.log('Server started on port '+port);
});