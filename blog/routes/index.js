var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('posts');
  collection.find({},{}, function(e,docs){
    res.render('index', {
      "posts" : docs,
      title: "Wolverine Blog"
    });
  });
});

router.get('/submit', function(req, res){
  res.render('submit', {title : "Submit"});
});

router.post('/addpost', function(req, res){
  var db = req.db;

  var title = req.body.title;
  var author = req.body.author;
  var content = req.body.content;

  var collection = db.get('posts');

  collection.insert({
    "title" : title,
    "author" : author,
    "content" : content
  }, function (err, doc){
    if (err) {
      res.send("There was a problem adding the information to the database.");
    }
    else {
      res.location("/");
      res.redirect("/");
    }
  });
});

router.post('/deletepost', function(req, res){
  var db = req.db;
  var id = req.body.idNumber;

  var collection = db.get('posts');

  collection.remove({"_id": id },
                    function(err, doc){
                      if(err) {
                        res.send("There was a problem deleting the information from the database.");
                      }
                      else{
                        res.location("/");
                        res.redirect("/");
                      }
                    });
});

module.exports = router;
