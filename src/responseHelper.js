import { decode } from 'iconv-lite';

export const readContentType = (response = new Response()) => {
  const contentType = response.headers.get('Content-Type');
  const groups = contentType.match(/([^;]+)(;\s*charset=([^;]+))?(;\s*boundary=([^;]+))?/);
  return { mimeType: groups[1], charset: groups[3], boundary: groups[5] };
};

export const readAsText = async (response = new Response()) => {
  const { charset } = readContentType(response);
  if (charset) {
    const bytes = await response.arrayBuffer();
    const text = decode(Buffer.from(bytes), charset);
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
  const text = await readAsText(response);
  const { mimeType } = readContentType(response);

  const dom = new DOMParser().parseFromString(text, mimeType);
  return dom;
};
