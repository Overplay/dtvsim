var express = require('express');
var router = express.Router();
var tuner = require('../model/tuner');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('TV root');
});

router.get( '/getTuned', function ( req, res, next ) {
    res.json( tuner.currentChannel() );
} );

router.get( '/channelUp', function ( req, res, next ) {
    res.json( tuner.channelUp() );
} );

router.get( '/channelDown', function ( req, res, next ) {
    res.json( tuner.channelDown() );
} );


// Yes, this is a GET for DirecTV
router.get( '/tune', function ( req, res, next ) {

    const channel = req.param('major');

    if (!channel){
      return res.sendStatus(406);
    }

    const channelInfo = tuner.tuneTo(parseInt(channel));
    if (channelInfo){
        res.json(channelInfo);
    } else {
        return res.sendStatus( 406 );
    }


} );

module.exports = router;
