var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Index' });
});

/* ACTIVATE IN THE FUTURE
router.get('/future', function(req, res, next) {
    res.render('future', { title: 'Burak' });
});
*/

module.exports = router;