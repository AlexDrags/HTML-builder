const fs = require('node:fs/promises');
const path = require('node:path');

async function mergeStyles() {
    const array = [];
    try {
        const files = await fs.readdir(`${path.join('./05-merge-styles/styles')}`, () => {});
        for (const element of files) {
            if (path.extname(element) === '.css') {
                const data = await fs.readFile(`${path.join('./05-merge-styles/styles', `/${element}`)}`, {encoding: 'utf8'}, () => {});

                array.push(data);
            }
        }
        fs.writeFile(`${path.join('./05-merge-styles/project-dist', '/bundle.css')}`, array, () => {});

    } catch (error) {
        console.error(error.message);
    }
}

mergeStyles();