/**
* Simple Utility that copies the file ./build/index.html to ./200.html
* Used for Client side routing in sites like Surge.sh, Github-Pages etc.
*
* MORE INFO:
* ----------
* Surge: https://surge.sh/help/adding-a-200-page-for-client-side-routing
* GH-Pages: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages
*/
const fs = require('fs');
const path = require('path');

const inputFile = 'build/index.html';
const outputFile = 'build/200.html';

fs.createReadStream(path.resolve(inputFile))
  .pipe(fs.createWriteStream(path.resolve(outputFile)));
