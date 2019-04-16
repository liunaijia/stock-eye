import { IncomingMessage, get as httpGet } from 'http';
import { get as httpsGet } from 'https';
import cheerio from 'cheerio';
import { decode } from 'iconv-lite';

const parseContentType = (contentType = '') => {
  const groups = contentType.match(/([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/);
  return { mimeType: groups[1], charset: groups[3], boundary: groups[5] };
};

const readContentType = (response = new IncomingMessage()) => parseContentType(response.headers['content-type']);

const readAsBuffer = (response = new IncomingMessage()) => new Promise((resolve, reject) => {
  const chunks = [];
  response
    .on('data', chunk => chunks.push(Buffer.from(chunk)))
    .on('end', () => {
      resolve(Buffer.concat(chunks));
    })
    .on('error', reject);
});

export const readyAsText = async (response = new IncomingMessage(), charset = '') => {
  const withCharset = charset || readContentType(response).charset;
  const buffer = await readAsBuffer(response);
  return decode(buffer, withCharset);
};

export const readAsDom = async (response = new IncomingMessage()) => {
  const { charset } = readContentType(response);
  const buffer = await readAsBuffer(response);
  const text = decode(buffer, charset || 'UTF-8');
  const $ = cheerio.load(text);

  const metaNode = $('meta[http-equiv="Content-Type"]');
  if (metaNode.length) {
    const { charset: htmlCharset } = parseContentType(metaNode.attr('content'));
    // re-decode the content if the charset defined in meta is different with the one in header
    if (htmlCharset && htmlCharset !== charset) {
      const decodedText = decode(buffer, htmlCharset);
      return cheerio.load(decodedText);
    }
  }

  return $;
};


export const get = (...args) => new Promise((resolve, reject) => {
  const rawGet = args[0].startsWith('https://') ? httpsGet : httpGet;
  rawGet(...args, resolve).on('error', reject);
});
