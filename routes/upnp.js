/**
 * Created by mkahn on 6/6/17.
 */


var express = require('express');
var router = express.Router();


router.get('/desc.xml', function(req, res, next) {
    res.sendFile( './dtvresponse.xml', { root: __dirname } );
});


module.exports = router;
