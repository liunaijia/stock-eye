import {
  MOBILE_TOKEN, ACCOUNT_NUMBER, PASSWORD, MOBILE_NUMBER,
} from '../../secrets';
import { readAsDataUrl, readAsDom, readAsText } from './responseHelper';
import { sendNotification } from '../notification';

const ROOT_URL = '/newone';

const sendRequest = async (url = '', payload = {}) => {
  const hasPayload = Object.keys(payload).length;
  const params = new URLSearchParams();
  if (hasPayload) {
    Object.entries(payload).forEach(([key, value]) => params.append(key, value));
  }
  const response = await fetch(`${ROOT_URL}${url}`, {
    method: hasPayload ? 'POST' : 'GET',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    credentials: 'include',
    body: hasPayload ? params.toString() : null,
  });
  return response;
};

const loadCaptcha = async () => {
  const response = await sendRequest('/validatecode/imgcode');
  if (!response.ok) {
    throw new Error(`fail to load captcha: ${response.statusText}`);
  }

  return readAsDataUrl(response);
};

const loadLoginForm = async () => {
  const response = await sendRequest(`/include/loginFormNew.jsp?khxxbh_sj=${MOBILE_TOKEN}`);
  if (!response.ok) {
    throw new Error(`fail to load login form: ${response.statusText}`);
  }

  const form = (await readAsDom(response)).forms[0];
  const formData = Array.from(new FormData(form).entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  return formData;
};

export const readAlertMessage = (text = '') => {
  const messages = text.match(/alert\('.*?'\)/g);
  if (messages === null) { return null; }

  const lastMessage = messages[messages.length - 1];
  const [, errorMessage] = lastMessage.match(/'(.*?)'/);
  return errorMessage;
};

const doLogin = async (payload, captcha) => {
  const response = await sendRequest('/xtrade', {
    ...payload,
    f_khh: ACCOUNT_NUMBER, // eslint-disable-line @typescript-eslint/camelcase
    f_mm: PASSWORD, // eslint-disable-line @typescript-eslint/camelcase
    validatecode: captcha,
    macip: MOBILE_NUMBER,
  });
  if (!response.ok) {
    throw new Error(`登录失败：${response.statusText}`);
  }

  const text = await readAsText(response);
  const message = readAlertMessage(text);

  if (message) { throw new Error(`登录失败：${message}`); }

  return !text.includes('验证码输入错误');
};

const login = async () => {
  const formData = await loadLoginForm();

  const captchaImage = await loadCaptcha();
  sendNotification({ title: '验证码', icon: captchaImage });

  let captcha = 2;
  while (captcha <= 20) {
    if (await doLogin(formData, String(captcha))) { // eslint-disable-line no-await-in-loop
      // sendNotification({
      //   title: '登录成功',
      //   message: `captcha is ${captcha}`,
      //   iconUrl: captchaImage,
      // });
      return;
    }
    captcha += 1;
  }

  throw new Error('fail to login: incorrect captcha');
};

const parseStockType = (stockCode = '') => {
  if (stockCode.startsWith('sh')) { return '1'; }
  if (stockCode.startsWith('sz')) { return '2'; }
  throw new Error(`Unknown stock code: ${stockCode}`);
};

const getAccountCode = async (stockCode = '', tradeType = '') => {
  const stockType = parseStockType(stockCode);

  const payload = { jybm: '' };
  if (tradeType === 'buy') { payload.jybm = '100010'; } else if (tradeType === 'sell') { payload.jybm = '100020'; } else throw new Error(`Unknown trade type ${tradeType}`);

  const response = await sendRequest(`/xtrade?random=${new Date().getTime()}`, payload);
  const dom = await readAsDom(response);

  const matchedNode = Array.from(dom.querySelectorAll('#gddm option')).find(node => node.attributes.sscdm.value === stockType);
  if (matchedNode) {
    return matchedNode.value;
  }

  throw new Error('无法获取股东代码');
};

const handleFailedResponse = (text = '') => {
  const [, errorMessage] = text.match(/alert\('(.*?)'\)/) || [];
  throw new Error(`${errorMessage}`);
};

const buyStock = async (stockCode = '', price = 0.0, amount = 0) => {
  const accountCode = await getAccountCode(stockCode, 'buy'); // double check the parameter

  const response = await sendRequest(`/xtrade?random=${new Date().getTime()}`, {
    jybm: '100012',
    mmlb: '1', // 交易类型：买
    gddm: accountCode,
    zqdm: stockCode.match(/\d{6}$/)[0],
    wtjg: price,
    wtsl: amount,
  });
  const text = await readAsText(response);
  if (!text.includes('您的申请已提交')) {
    handleFailedResponse(text);
  }
};

const sellStock = async (stockCode = '', price = 0.0, amount = 0) => {
  const accountCode = await getAccountCode(stockCode, 'sell'); // double check the parameter

  const response = await sendRequest(`/xtrade?random=${new Date().getTime()}`, {
    jybm: '100012',
    mmlb: '2', // 交易类型：卖
    gddm: accountCode,
    zqdm: stockCode.match(/\d{6}$/)[0],
    wtjg: price,
    wtsl: amount,
  });
  const text = await readAsText(response);
  if (!text.includes('您的申请已提交')) {
    handleFailedResponse(text);
  }
};

const parseNumber = (str = '') => parseFloat(str.replace(/,|\s/g, ''));

const isNoHoldings = holdingRows => holdingRows.length === 1 && holdingRows[0].innerText.includes('没有相应的查询记录！');

const parsePortfolio = async (dom = new Document()) => {
  const availableCash = parseFloat(dom.querySelector('#zongzichan').innerText.match(/可用：\s*([\d|.]+)/)[1]);
  const [, ...holdingRows] = Array.from(dom.querySelectorAll('#tabbuy tr'));

  const holdings = [];
  if (!isNoHoldings(holdingRows)) {
    holdings.push(...holdingRows.map((row) => {
      const cells = row.querySelectorAll('td');
      const codePrefix = cells[0].attributes.scdm.value === '1' ? 'sh' : 'sz';
      return {
        stockCode: codePrefix + cells[0].attributes.zqdm.value,
        stockName: cells[1].innerText,
        stockAmount: parseNumber(cells[2].innerText),
        sellableAmount: parseNumber(cells[3].innerText), // 可卖数量
        cost: parseNumber(cells[5].innerText), // 成本价
        floating: parseNumber(cells[6].innerText), // 浮动盈亏
        floatingRate: cells[7].innerText, // 盈亏比例
        boughtToday: parseNumber(cells[11].innerText), // 今买数量
        soldToday: parseNumber(cells[12].innerText), // 今卖数量
      };
    }));
  }
  return {
    availableCash,
    holdings,
  };
};

export const getPortfolio = async () => {
  const response = await sendRequest(`/xtrade?random=${new Date().getTime()}`, { jybm: '100040' });
  const dom = await readAsDom(response);
  if (!dom) {
    return null;
  }

  if (dom.body.childElementCount === 0) {
    await login();
    return getPortfolio();
  }

  return parsePortfolio(dom);
};

export { login, buyStock, sellStock };
