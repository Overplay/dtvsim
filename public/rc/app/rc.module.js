/**
 * Created by mkahn on 6/6/17.
 */

var app = angular.module( 'rcApp', [] );

app.run( function () {
    console.log( "DirecTV RC running." );
} );

app.controller( 'rcController', function ( $scope, $log, $http ) {

    $log.debug( "rcController starting up." );

    function setProgram(data){
        $scope.nowshowing = data.data.callsign + ' on ' + data.data.major;

    }

    $http.get('/tv/getTuned')
        .then(setProgram);

    $scope.upClicked = function(){
        $http.get('/tv/channelUp')
            .then(setProgram)
    }

    $scope.downClicked = function () {
        $http.get( '/tv/channelDown' )
            .then( setProgram )
    }

} );