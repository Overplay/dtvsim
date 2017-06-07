/**
 * Created by mkahn on 6/6/17.
 */


var channelIdx = 1;

function getChannelInfo() {
    return channelInfo[ channelIdx ];
}

var channelInfo = [
    { callsign: "ESPNHD", major: 206, minor: 65535, programId: 36417953, stationId: 2220255, title: "Warriors v. Cavs", file:  'vids/bball.mp4'},
    { callsign: "CNNHD", major: 202, minor: 65535, programId: 36417952, stationId: 2220225, title: "News & Stuff", file: 'vids/bball.mp4' },
    { callsign: "BEIN", major: 620, minor: 65535, programId: 3617953, stationId: 220255, title: "Man United", file: 'vids/soccer.mp4' },
    { callsign: "FOX", major: 2, minor: 65535, programId: 3647953, stationId: 20255, title: "FOXy Show", file: 'vids/bball.mp4' }
];

const _ = require('lodash');

module.exports = {

    currentChannel: getChannelInfo,

    channelUp: function(){
        channelIdx = ( channelIdx + 1 ) % channelInfo.length;
        require( '../app' ).io.to( 'channel-info' ).emit( 'channel-changed', getChannelInfo() );
        return getChannelInfo();
    },

    channelDown: function(){
        channelIdx = (channelIdx - 1) < 0 ? channelInfo.length - 1 : channelIdx - 1;
        require( '../app' ).io.to( 'channel-info' ).emit( 'channel-changed', getChannelInfo() );
        return getChannelInfo();
    },

    tuneTo: function (channel) {

        const index = _.findIndex(channelInfo, { major: channel });
        if (index>-1){
            channelIdx = index;
            require( '../app' ).io.to( 'channel-info' ).emit( 'channel-changed', getChannelInfo() );
            return getChannelInfo();
        }

        return undefined;
    }


}