/**
 * Created by mkahn on 6/6/17.
 */

/*********************************

 File:       direcSSDPTVSim.js
 Function:   This just the SSDP bit. Meant for use from Sails
 Copyright:  Overplay TV
 Date:       6/5/17 6:07 PM
 Author:     mkahn

 Enter detailed description

 **********************************/


var os = require( 'os' );
var Server = require( 'node-ssdp' ).Server;

var ssdpServer = new Server( {
    ssdpSig:  "Linux/2.6.18.5, UPnP/1.0 DIRECTV JHUPnP/1.0",
    location: "http://" + getIPAddresses() + ":8080/upnp/desc.xml",
    sourcePort: 1900
} );;

function getIPAddresses() {

    var interfaces = os.networkInterfaces();
    var addresses = [];
    for ( var k in interfaces ) {
        for ( var k2 in interfaces[ k ] ) {
            var address = interfaces[ k ][ k2 ];
            if ( address.family === 'IPv4' && !address.internal ) {
                addresses.push( address.address );
            }
        }
    }

    return addresses;
}

function initializeSSDPServer() {


    ssdpServer.addUSN( 'upnp:rootdevice' );
    ssdpServer.addUSN( 'urn:schemas-upnp-org:device:MediaServer:1' );


    ssdpServer.on( 'advertise-alive', function ( headers ) {
        // Expire old devices from your cache.
        // Register advertising device somewhere (as designated in http headers heads)
    } );

    ssdpServer.on( 'advertise-bye', function ( headers ) {
        // Remove specified device from cache.
    } );


    // start the server
    ssdpServer.start();

    // process.on( 'exit', function () {
    //     ssdpServer.stop() // advertise shutting down and stop listening
    // } );


}

module.exports = initializeSSDPServer;

