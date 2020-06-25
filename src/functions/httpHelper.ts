import { Handler, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { IncomingMessage, request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
import { decode } from 'iconv-lite';

function log(url: string, response: IncomingMessage, method = 'GET'): void {
  // eslint-disable-next-line no-console
  console.log(`${response.statusCode || 'unknown'} - ${method} ${url}`);
}

function parseContentType(contentType: string) {
  const groups = /([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/.exec(contentType);
  return { mimeType: groups?.[1], charset: groups?.[3], boundary: groups?.[5] };
}

function readContentType(response: IncomingMessage) {
  return parseContentType(response.headers['content-type'] || '');
}

function readAsBuffer(response: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject): void => {
    const chunks: Uint8Array[] = [];
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
  return decode(buffer, charset || 'utf8');
}

export async function readAsJson(response: IncomingMessage): Promise<unknown> {
  const text = await readyAsText(response);
  return JSON.parse(text) as unknown;
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

// With the Lambda proxy integration, Lambda is required to return an output of the following format:
// {
//   "isBase64Encoded" : "boolean",
//   "statusCode": "number",
//   "headers": { ... },
//   "body": "JSON string"
// }
export function respond(fn: APIGatewayProxyHandlerV2): APIGatewayProxyHandlerV2 {
  const crosHeaders = {
    'Access-Control-Allow-Origin': '*',
  };
  return async function decorator(...args) {
    try {
      const result = await fn(...args);
      return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: crosHeaders,
      };
    } catch (error) {
      const e = error as Error;
      return {
        statusCode: 500,
        body: JSON.stringify({
          errorMessage: e.message,
          errorType: e.name,
          stackTrace: e.stack,
        }),
        headers: crosHeaders,
      };
    }
  };
}
