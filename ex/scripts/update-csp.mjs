import { getCSP, INLINE, SELF } from 'csp-header'
import * as cheerio from 'cheerio';
import fs from 'fs/promises';

const [,, htmlPath, configPath] = process.argv;

const usage = () => {
    console.log('Usage: node update-csp <htmlPath> <configPath>');
    process.exit(1);
}

if (!htmlPath) {
    console.error('Missing htmlPath');
    usage();
}
if (!configPath) {
    console.error('Missing configPath');
    usage();
}

const updateCsp = async (htmlPath, configPath) => {
    const cspHeaderParams = JSON.parse(await fs.readFile(configPath, { encoding: 'utf-8' }));
    const metaTag = `<meta http-equiv="Content-Security-Policy" content="${getCSP(cspHeaderParams)}">`;
    const buffer = await fs.readFile(htmlPath, { encoding: 'utf-8' });
    const $ = cheerio.load(buffer);
    $('meta[http-equiv="Content-Security-Policy"]').replaceWith(metaTag);
    await fs.writeFile(htmlPath, $.html());
}

updateCsp(htmlPath, configPath);