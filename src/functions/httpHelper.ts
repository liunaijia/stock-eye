import { IncomingMessage, get as httpGet } from 'http';
import { get as httpsGet } from 'https';
import { decode } from 'iconv-lite';
import cheerio from 'cheerio';

interface ContentType {
  mimeType: string;
  charset: string;
  boundary: string;
}

function parseContentType(contentType: string): ContentType {
  const groups = contentType.match(/([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/);
  return { mimeType: groups[1], charset: groups[3], boundary: groups[5] };
}

function readContentType(response: IncomingMessage): ContentType {
  return parseContentType(response.headers['content-type']);
}

function readAsBuffer(response: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject): void => {
    const chunks = [];
    response
      .on('data', (chunk): void => { chunks.push(Buffer.from(chunk)); })
      .on('end', (): void => {
        resolve(Buffer.concat(chunks));
      })
      .on('error', reject);
  });
}

export async function readyAsText(response: IncomingMessage): Promise<string> {
  const { charset } = readContentType(response);
  const buffer = await readAsBuffer(response);
  return decode(buffer, charset);
}

export async function readAsDom(response: IncomingMessage): Promise<CheerioStatic> {
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
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function get(...args: any[]): Promise<IncomingMessage> {
  return new Promise((resolve, reject): void => {
    const rawGet = args[0].startsWith('https://') ? httpsGet : httpGet as any;
    rawGet(...args, resolve).on('error', reject);
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */
