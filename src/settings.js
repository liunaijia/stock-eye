export const THRESHOLD = {
  // YESTERDAY_RATIO_FACTOR = 0.5 时用
  // base: 1.5,
  // sh601328: 2.25, // 交行

  base: 1.0,
  sh601328: 1.5, // 交行
  // sh601688: 1.5, // 华泰
};

export const STOCK_GROUPS = {
  银行: {
    sh601398: '工行',
    sh601988: '中行',
    sh601288: '农行',
    sh601939: '建行',
    sh601328: '交行',
  },
  // 券商: {
  //   sh600030: '中信',
  //   sh600837: '海通',
  //   sh601688: '华泰',
  //   sh600999: '招商',
  // },
};

export const STOCK_POOL = Object.values(STOCK_GROUPS)
  .reduce((all, stocks) => Object.assign(all, stocks), {});

export const STOCK_CODES = Object.keys(STOCK_POOL);

// export const YESTERDAY_RATIO_FACTOR = 0.5;
export const YESTERDAY_RATIO_FACTOR = 0;
