var express = require('express');
var router = express.Router();

var entries = [
  {slug:"How to pass class", body: "Come to class. Do your homework", created_at: "03/04/2016"},
  {slug:"How to fail class", body: "Play video games all day", created_at: "03/04/2016"}
];

/*READ all: GET til listing. */
router.get('/', function(req, res, next) {
  req.db.driver.execQuery(
    "SELECT * FROM entries;",
    function(err, data){
      if(err){
        console.log(err);
      }

      res.render('til/index', {title: 'Blog', entries: data });
    }
  );

});

/*CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create a new entry"});
});

/*CREATE entry: POST /til/ */
router.post('/', function(req, res, next) {
  entries.push(req.body);
  res.render('til/index', {title: 'Today I Learned', entries: entries });
});

/* UPDATE entry form: GET /til/1/edit */
router.get('/:id/edit', function(req, res, next) {
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

/*UPDATE entry: POST /til/1 */
router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    entries: entries
  });
});

/* DELETE entry: GET /til/1/delete */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
  res.render('til/index', {title: 'Today I Learned', entries: entries});
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should be */
/* READ one entry: GET /til/0 */
router.get('/:id', function(req, res, next) {
  res.render('til/entry', {title: "An entry", entry: entries[req.params.id]});
});

module.exports = router;
