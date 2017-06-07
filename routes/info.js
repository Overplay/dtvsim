var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Info root');
});

router.get( '/getVersion', function ( req, res, next ) {
    res.json( { receiverId: "OG-DTVSim-2000" } );
} );


module.exports = router;
