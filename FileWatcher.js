const EventEmitter = require("events");
const notifier = require('node-notifier');

module.exports = class FileWatcher extends EventEmitter{
  nameFoundOnFile = (fileName) => {
    this.emit("nameFoundOnFile", `Your name was mentioned on file: ${fileName}`);
  }
  openToastNotification = (message) => { notifier.notify(message); }
  printToConsole = (message) => console.log(message);
}