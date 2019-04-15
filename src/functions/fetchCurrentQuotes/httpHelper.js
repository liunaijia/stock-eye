import { IncomingMessage } from 'http';
import { get as rawGet } from 'https';
import { decode } from 'iconv-lite';

const parseContentType = (contentType = '') => {
  const groups = contentType.match(/([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/);
  return { mimeType: groups[1], charset: groups[3], boundary: groups[5] };
};

const readContentType = (response = new IncomingMessage()) => parseContentType(response.headers['content-type']);

export const get = (...args) => new Promise((resolve, reject) => {
  rawGet(...args, (response) => {
    const chunks = [];
    response.on('data', chunk => chunks.push(Buffer.from(chunk)));
    response.on('end', () => {
      const { charset } = readContentType(response);
      const body = decode(Buffer.concat(chunks), charset);
      resolve({ ...response, body });
    });
  }).on('error', reject);
});
