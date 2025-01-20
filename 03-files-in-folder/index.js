const fs = require('node:fs/promises');
const path = require('node:path');

async function readFolderFiles() {
  try {
    const files = await fs.readdir(
      `${path.join('./03-files-in-folder/secret-folder')}`,
      () => {},
    );
    for (const element of files) {
      const stats = await fs.stat(
        `${path.join('./03-files-in-folder/secret-folder/', `${element}`)}`,
        () => {},
      );
      if (stats.isFile() === true)
        console.log(element + '-' + stats.size + 'kb');
    }
  } catch (error) {
    console.error(error.message);
  }
}

readFolderFiles();
