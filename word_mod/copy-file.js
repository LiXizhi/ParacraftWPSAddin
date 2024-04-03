const fs = require('fs-extra');

const sourceFile = '../public/';
const destinationFile = './public/';

fs.copy(sourceFile, destinationFile)
  .then(() => console.log('File copied successfully!'))
  .catch(err => console.error('Error copying file:', err));