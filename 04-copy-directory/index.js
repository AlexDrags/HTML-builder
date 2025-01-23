const fs = require('node:fs/promises');
const path = require('node:path');

async function copyDir() {
  try {
    await fs.mkdir(
      path.join(__dirname, '/files-copy'),
      { recursive: true },
      () => {},
    );
    const filesCopyDir = await fs.readdir(
      `${path.join('./04-copy-directory/files-copy')}`,
      () => {},
    );

    for (const element of filesCopyDir) {
      await fs.rm(path.join('./04-copy-directory/files-copy', `/${element}`));
    }

    const files = await fs.readdir(
      `${path.join('./04-copy-directory/files')}`,
      () => {},
    );

    for (const element2 of files) {
      fs.copyFile(
        `${path.join('./04-copy-directory/files', `/${element2}`)}`,
        `${path.join('./04-copy-directory/files-copy', `/${element2}`)}`,
        0,
        () => {},
      );
    }
  } catch (error) {
    console.error(error.message);
  }
}

copyDir();
