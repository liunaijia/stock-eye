// @flow
import { IncomingMessage, request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
import { decode } from 'iconv-lite';


function log(url: string, response: IncomingMessage, method: string = 'GET'): void {
  // eslint-disable-next-line no-console
  console.log(`${response.statusCode} - ${method} ${url}`);
}

function parseContentType(contentType: string) {
  const groups = contentType.match(/([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/);
  return { mimeType: groups?.[1], charset: groups?.[3], boundary: groups?.[5] };
}

function readContentType(response: IncomingMessage) {
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

export async function readAsJson(response: IncomingMessage): Promise<Object> {
  const text = await readyAsText(response);
  return JSON.parse(text);
}

export async function get(url: string, headers?: { [key: string]: string }): Promise<IncomingMessage> {
  return new Promise((resolve, reject): void => {
    const requestFn = url.startsWith('https://') ? httpsRequest : httpRequest;
    const request = requestFn(url, (response: IncomingMessage): void => {
      log(url, response);
      resolve(response);
    })
      .on('error', reject);
    if (headers) {
      Object.keys(headers).forEach((key) => {
        const value = headers[key];
        if (value) {
          request.setHeader(key, value);
        }
      });
    }
    request.end();
  });
}

export function respond(fn: Function): Function {
  const crosHeaders = {
    'Access-Control-Allow-Origin': '*',
  };
  return async function decorator(event, context, callback): Promise<void> {
    try {
      const result = await fn.apply(this, [event, context, callback]);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: crosHeaders,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          Error: error.message || error,
          Reference: context.awsRequestId,
        }),
        headers: crosHeaders,
      });
    }
  };
}
