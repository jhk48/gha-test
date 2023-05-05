/* eslint-disable no-console */
/* eslint-disable camelcase */
const fs = require('fs');

async function main() {
	fs.writeFileSync('CHANGELOG.md', `hello, world ${Math.random()}`, 'utf-8');
}

main();
