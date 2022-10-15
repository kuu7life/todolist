const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

const items = ['Pray 5 times a day', 'Be the best Programmer'];
const workItems = [];

app.get('/', function(req, res) {
  const day = date.getDate();
  res.render('list', {
    listTitle: day,
    newListItems: items,
  });
});

app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  })
})

app.get('/about', function(req, res) {
  res.render('about');
})

app.post('/', function(req, res) {
  const item = req.body.newItem;
  if (req.body.button === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
  console.log(req.body);
});

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
