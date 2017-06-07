/**
 * Created by mkahn on 6/6/17.
 */

var app = angular.module( 'dtvSimApp', [] );

app.run( function () {
    console.log( "DirecTV TV-side sim running. Enjoy the show." );
} );

app.controller( 'screenController', function ( $scope, $log, $http ) {

    $log.debug( "screenController starting up." );

    var socket = io.connect( '/' );
    socket.on( 'connect', function ( data ) {

        socket.on( 'channel-changed', function ( data ) {

            $scope.$apply( function () {
                changeChannel(data);
            } );

        } );

        socket.on( 'join', function ( data ) {
            console.log("Joined socket.io roon");
        } );

    } );

    $scope.vidsrc = '';

    $http.get('/tv/getTuned')
        .then(function(data){
            changeChannel(data.data);
        });

    function changeChannel(cinfo){
        $scope.vidsrc = cinfo.file;
    }

} );