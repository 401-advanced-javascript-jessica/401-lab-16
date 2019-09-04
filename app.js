'use strict';

const fs = require('fs');

const alterFile = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { throw err; }
    let text = data.toString().toUpperCase();
    fs.writeFile( file, Buffer.from(text), (err, data) => {
      if(err) { throw err; }
      console.log(`${file} saved`);
    });
  });
};

const readFile = (file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      throw err;
    }
    return data;
  });
};

const upperCase = (data) => {
  let text = data.toString().toUpperCase();
  return text;
};

const writeFile = (text) => {
  fs.writeFile( file, Buffer.from(text), (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`${file} saved`);
  })
};

let file = process.argv.slice(2).shift();
//alterFile(file);

let data = readFile(file);
let text = upperCase(data);
writeFile(text);