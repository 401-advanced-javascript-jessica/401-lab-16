'use strict';

const events = require('./events.js');
const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

/**
 * @method read
 * @param file
 * @returns {Promise<void>}
 */
const read = async (file) => {
  let fileData;
  try {
    fileData = await readFileAsync(file);
  } catch (err){
    events.emit('error', { error: err});
  }
  // let fileData = await readFileAsync(file, (err, data) => {
  //   if (err) {
  //     events.emit('error', { error: err});
  //   }
  //   return data;
  // });
  events.emit('upper-case', {file: file, data: fileData.toString()});

};

/**
 * @method upperCase
 * @param object
 */
const upperCase = (object) => {
  let fileData = object.data;
  object.data = fileData.toUpperCase();
  events.emit('write', object);
};

/**
 * @method write
 * @param object
 */
const write = async (object) => {
  console.log(object);
  let file = object.file;
  console.log(file);
  let text = object.data;
  await fs.writeFile( file, Buffer.from(text), (err, data) => {
    if (err) {
      events.emit('error', { error: err});
    }
    events.emit('cache-update', { saved: file });
  });
};

events.on('read', read);
events.on('upper-case', upperCase);
events.on('write', write);

module.exports = {
  read: read,
};