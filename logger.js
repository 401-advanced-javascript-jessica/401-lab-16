'use strict';

const events = require('./events');

events.on('cache-update', payload => log('cache-update', payload));

function log(event, payload) {
    let time = new Date();
    console.log({ event, time, payload });
}