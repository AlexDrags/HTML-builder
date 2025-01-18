const fs = require('node:fs');
const path = require('node:path');

async function readFile() {
  try {
    const readStream = fs.createReadStream(
      `${path.join('./01-read-file', '/text.txt')}`,
      'utf-8',
    );
    readStream.on('data', (charChank) => {
      console.log(charChank);
    });

    readStream.on('end', () => {
      readStream.close();
    });
  } catch (error) {
    console.error('Error message: ', error.message);
  }
}

readFile();
