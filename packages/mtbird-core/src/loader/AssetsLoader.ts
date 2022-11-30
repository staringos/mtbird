import get from 'lodash/get';

/**
 * Load js assets file by create new <script /> tag
 * @param url js file url
 * @param keyPath after js file load, get value from `get(window, keyPath)`
 * @param useCache if window[keyPath] already have, still load?
 * @param addDate add t=new Date().getTime() to load file every time from server?
 * @returns
 */
const js = (url: string, keyPath: string, useCache: boolean = true, addDate: boolean = true) => {
  if (useCache) {
    const component = get(window, keyPath);
    if (component) return component;
  }

  const finalUrl = addDate ? url + '?t=' + new Date().getTime() : url;
  const script = document.createElement('script');

  script.id = url.split('?')[0];
  script.src = finalUrl;

  return new Promise((res, rej) => {
    script.onload = () => {
      try {
        const extension = get(window, keyPath);
        if (!extension) return rej(null);
        res(extension);
      } catch (e) {
        rej(null);
      }
    };
    script.onerror = (err) => {
      res(null);
    };
    document.body.appendChild(script);
  });
};

const css = (url: string, useCache: boolean = true, addDate: boolean = false) => {
  if (useCache) {
    const loaded = document.getElementById(url);
    if (loaded) return;
  }

  const finalUrl = addDate ? url + '?t=' + new Date().getTime() : url;
  const link = document.createElement('link');

  link.setAttribute('id', url);
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', finalUrl);
  link.setAttribute('crossorigin', 'anonymous');

  const heads = document.getElementsByTagName('head');

  if (heads.length) heads[0].appendChild(link);
  else document.documentElement.appendChild(link);
};

export default {
  js,
  css
};
