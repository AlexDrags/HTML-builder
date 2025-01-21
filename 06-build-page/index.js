const fs = require('node:fs/promises');
const path = require('node:path');

async function buildingPage() {
  const arrayInnerHtml = [];
  const arrayArticles = [];
  const arrayHeader = [];
  const arrayFooter = [];
  const arrayStyles = [];

  try {
    fs.mkdir(`${path.join('./06-build-page', '/project-dist')}`, {
      recursive: true,
    });

    const assetsDirs = await fs.readdir(
      `${path.join('./06-build-page/assets')}`,
      () => {},
    );

    for (const dir of assetsDirs) {
      await fs.mkdir(
        `${path.join('./06-build-page/project-dist/assets', `/${dir}`)}`,
        { recursive: true },
        () => {},
      );

      const assetsFiles = await fs.readdir(
        `${path.join('./06-build-page/assets', `${dir}`)}`,
        () => {},
      );
      for (const assetsFile of assetsFiles) {
        if (path.extname(assetsFile) === '.woff2') {
          fs.copyFile(
            `${path.join(
              './06-build-page/assets',
              `/${dir}`,
              `/${assetsFile}`,
            )}`,
            `${path.join(
              './06-build-page/project-dist/assets',
              `/${dir}`,
              `/${assetsFile}`,
            )}`,
            0,
            () => {},
          );
        }

        if (path.extname(assetsFile) === '.jpg') {
          fs.copyFile(
            `${path.join(
              './06-build-page/assets',
              `/${dir}`,
              `/${assetsFile}`,
            )}`,
            `${path.join(
              './06-build-page/project-dist/assets',
              `/${dir}`,
              `/${assetsFile}`,
            )}`,
            0,
            () => {},
          );
        }

        if (path.extname(assetsFile) === '.svg') {
          fs.copyFile(
            `${path.join(
              './06-build-page/assets',
              `/${dir}`,
              `/${assetsFile}`,
            )}`,
            `${path.join(
              './06-build-page/project-dist/assets',
              `/${dir}`,
              `/${assetsFile}`,
            )}`,
            0,
            () => {},
          );
        }
      }
    }

    const files = await fs.readdir(
      `${path.join('./06-build-page', '/styles')}`,
      () => {},
    );

    for (const element of files) {
      if (path.extname(element) === '.css') {
        const data = await fs.readFile(
          `${path.join('./06-build-page/styles', `/${element}`)}`,
          { encoding: 'utf8' },
          () => {},
        );
        arrayStyles.push(data);
      }
    }

    fs.writeFile(
      `${path.join('./06-build-page/project-dist', '/style.css')}`,
      arrayStyles,
      () => {},
    );

    const templateHtmlText = await fs.readFile(
      `${path.join('./06-build-page/template.html')}`,
      'utf8',
      () => {},
    );

    const articlesHtmlText = await fs.readFile(
      `${path.join('./06-build-page/components/articles.html')}`,
      'utf8',
      () => {},
    );

    const headerHtmlText = await fs.readFile(
      `${path.join('./06-build-page/components/header.html')}`,
      'utf8',
      () => {},
    );

    const footerHtmlText = await fs.readFile(
      `${path.join('./06-build-page/components/footer.html')}`,
      'utf8',
      () => {},
    );

    for (const element of templateHtmlText) {
      arrayInnerHtml.push(element);
    }

    for (const element of articlesHtmlText) {
      arrayArticles.push(element);
    }

    for (const element of headerHtmlText) {
      arrayHeader.push(element);
    }

    for (const element of footerHtmlText) {
      arrayFooter.push(element);
    }

    fs.writeFile(
      `${path.join('./06-build-page/project-dist', 'index.html')}`,
      `${arrayInnerHtml.join('')}`
        .replace('{{header}}', `${arrayHeader.join('')}`)
        .replace('{{articles}}', `${arrayArticles.join('')}`)
        .replace('{{footer}}', `${arrayFooter.join('')}`)
        .split(),
      () => {},
    );
  } catch (error) {
    console.error(error.message);
  }
}

buildingPage();
