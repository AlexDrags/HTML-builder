const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const readline = require('node:readline');

async function writeFile() {
  try {
    const rl = readline.createInterface(process.stdin, process.stdout);

    const writeStream = fs.createWriteStream(
      `${path.join('./02-write-file', '/write.txt')}`,
      'utf-8',
    );

    console.log('Hello friend!');

    process.on('exit', () => {
      console.log('Thank you for your time!');
      writeStream.end();
      rl.close();
    });

    writeStream.on('finish', () => {
      writeStream.close();
      rl.close();
    });

    rl.question('Write you message: ', (input) => {
      if (input.includes('exit')) {
        process.exit();
      }

      writeStream.write(`${input}`);
    });

    rl.on('line', (input) => {
      if (input.includes('exit')) {
        process.exit();
      }
      writeStream.write(` ${input}`);
    });

    rl.on('SIGINT', () => {
      process.exit();
    });
  } catch (error) {
    console.error(error.message);
  }
}

writeFile();
