export const THRESHOLD = {
  base: 1,
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
