'use strict';

const fs = require('fs');
const util = require('util');

const events = require('./events.js');
events.on('read', readFile);
events.on('change case', upperCase);
events.on('write', writeFile);

const readFile = (file) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            throw err;
        }
        events.emit('file-update', { file: file });
        return data;
    });
};

const upperCase = (data) => {
    let text = data.toString().toUpperCase();
    events.emit('file-update', { file: file });
    return text;
};

const writeFile = (text) => {
    fs.writeFile( file, Buffer.from(text), (err, data) => {
        if (err) {
            throw err;
        }
        events.emit('file-update', { file: file });
        console.log(`${file} saved`);
    })
};

module.exports = {
    readFile,
    upperCase,
    writeFile,
};