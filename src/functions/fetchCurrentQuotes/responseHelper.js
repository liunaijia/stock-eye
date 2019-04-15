// import { decode } from 'iconv-lite';
import { IncomingMessage } from 'http';

const parseContentType = (contentType) => {
  const groups = contentType.match(/([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/);
  return { mimeType: groups[1], charset: groups[3], boundary: groups[5] };
};

export const readContentType = (response = new IncomingMessage()) => parseContentType(response.headers['content-type']);

export const readAsText = (response = new IncomingMessage(), charset = null) => {
  const withCharset = charset || readContentType(response).charset;
  console.log('charset', withCharset);
  // if (withCharset) {
  // const bytes = response.data;
  // const text = decode(Buffer.from(bytes), withCharset);
  // return text;
  // }
  return response.data;
};
