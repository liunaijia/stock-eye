import { decode } from 'iconv-lite';

const parseContentType = (contentType) => {
  const groups = contentType.match(/([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/);
  return { mimeType: groups[1], charset: groups[3], boundary: groups[5] };
};

export const readContentType = (response = new Response()) => parseContentType(response.headers.get('Content-Type'));

export const readAsText = async (response = new Response(), charset = null) => {
  const withCharset = charset || readContentType(response).charset;
  if (withCharset) {
    const bytes = await response.arrayBuffer();
    const text = decode(Buffer.from(bytes), withCharset);
    return text;
  }
  return response.text();
};

export const readAsDataUrl = async (response = new Response()) => {
  const { mimeType } = readContentType(response);
  const data = await response.arrayBuffer();
  const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));

  return `data:${mimeType};base64,${base64String}`;
};

export const readAsDom = async (response = new Response()) => {
  if (!response.ok) {
    return null;
  }

  const text = await readAsText(response.clone());
  const { mimeType, charset } = readContentType(response);
  const dom = new DOMParser().parseFromString(text, mimeType);

  const metaNode = dom.querySelector('meta[http-equiv="Content-Type"]');
  if (metaNode) {
    const { charset: htmlCharset } = parseContentType(metaNode.getAttribute('content'));
    // re-decode the content if the charset defined in meta is different with the one in header
    if (htmlCharset && htmlCharset !== charset) {
      const decodedText = await readAsText(response.clone(), htmlCharset);
      return new DOMParser().parseFromString(decodedText, mimeType);
    }
  }

  return dom;
};
