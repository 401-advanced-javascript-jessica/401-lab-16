'use strict'

const events = require('./events.js');
const util = require('util');
const fs = require('fs');

// const alterFile = (file) => {
//   fs.readFile( file, (err, data) => {
//     if(err) { throw err; }
//     let text = data.toString().toUpperCase();
//     console.log(text);
//     fs.writeFile( file, Buffer.from(text), (err, data) => {
//       if(err) { throw err; }
//       console.log(`${file} saved`);
//     });
//   });
// };


const readFileAsync = util.promisify(fs.readFile);

const read = async (file) => {
    let fileData = await readFileAsync(file, (err, data) => {
        if (err) {throw err;}
        return data;
    });
    events.emit('upper-case', {file: file, data: fileData.toString()});

};

const upperCase = (object) => {
    let fileData = object.data;
    object.data = fileData.toUpperCase();
    events.emit('write', object);
};

const write = (object) => {
    let file = object.file;
    let text = object.data;
    fs.writeFile( file, Buffer.from(text), (err, data) => {
        if (err) {
            throw err;
        }
        events.emit('cache-update', { saved: file });
    });
};

events.on('read', read);
events.on('upper-case', upperCase);
events.on('write', write);

module.exports = {
    // init: () => {
    //     read(file)
    //         .then( (fileData) => {
    //             return upperCase(fileData)
    //         })
    //         .then((text) => {
    //             console.log(file);
    //             return write(text, file)
    //         })
    //         .catch(error => console.log(error));
    // }
    read: read,
};