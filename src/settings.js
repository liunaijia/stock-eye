export const THRESHOLD = {
  // YESTERDAY_RATIO_FACTOR = 0.5 时用
  // base: 1.5,
  // sh601328: 2.25, // 交行

  base: 1.0,
  sh601328: 1.5, // 交行
  // sh601688: 1.5, // 华泰
};

export const STOCK_GROUPS = {
  沪银: {
    sh601398: '工行',
    sh601988: '中行',
    sh601288: '农行',
    sh601939: '建行',
    sh601328: '交行',
  },
  深银: {
    sz000001: '平安',
    sz002142: '宁波',
    sh600036: '招商',
  },
};

export const STOCK_POOL = Object.values(STOCK_GROUPS)
  .reduce((all, stocks) => Object.assign(all, stocks), {});

export const STOCK_CODES = Object.keys(STOCK_POOL);

// export const YESTERDAY_RATIO_FACTOR = 0.5;
export const YESTERDAY_RATIO_FACTOR = 0;

export const HOLDING_NEW_STOCK = '';
