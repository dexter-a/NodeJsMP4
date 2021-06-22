'use strict';

const fs = require('fs');
const path = require("path");
const FileWatcher = require('./FileWatcher');

const args = require('yargs/yargs')(process.argv.slice(2)).argv;
const newPath =path.join(args.path) 
console.log(`Watching path: ${args.path}`);

var watching = false;

fs.watch(newPath, { recursive: true, persistent: true},(eventType, fileName) => {
  if(watching) return;
  watching = true;

  const fw = new FileWatcher();
  const fullDir =path.join(args.path, fileName);

  fw.on('nameFoundOnFile', fw.printToConsole);
  fw.on('nameFoundOnFile', fw.openToastNotification);
  
  if(fs.existsSync(fullDir) && fs.lstatSync(fullDir).isFile()) {
    const data = fs.readFileSync(fullDir, 'utf-8');
    const isDataContainsSpecifiedName = data.toLowerCase().includes(args.name.toLowerCase());
    if(isDataContainsSpecifiedName) {
      fw.nameFoundOnFile(fileName);
    }
  }

  setTimeout(() => {
      watching = false;
  }, 200);
});