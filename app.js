'use strict';

const events = require('./events.js');

require('./cache.js');
require('./logger.js');

// const alterFile = (file) => {
//   fs.readFile( file, (err, data) => {
//     if(err) { throw err; }
//     let text = data.toString().toUpperCase();
//     fs.writeFile( file, Buffer.from(text), (err, data) => {
//       if(err) { throw err; }
//       console.log(`${file} saved`);
//     });
//   });
// };

let file = process.argv.slice(2).shift();
//alterFile(file);

let data = readFile(file);
let text = upperCase(data);
writeFile(text);

events.emit('read', { file: file });
events.emit('change case', { file: file });
events.emit('write', { file: file });