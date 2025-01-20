const fs = require('node:fs/promises');
const path = require('node:path');

async function copyDir() {
    try {
        fs.mkdir(path.join('./04-copy-directory', '/files-copy'), { recursive: true }, () => {});
    
        const files = await fs.readdir(`${path.join('./04-copy-directory/files')}`, () => {});
        for (const element of files) {
            fs.copyFile(`${path.join('./04-copy-directory/files', `/${element}`)}`, `${path.join('./04-copy-directory/files-copy', `/${element}`)}`, 0, () => {});
        }
    } catch (error) {
        console.error(error.message);
    }
    
}

copyDir();