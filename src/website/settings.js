// 使用股票的实际涨幅乘以zoom系数的结果计算价差，比如交行的波动比池中其它股票大，交行波动1.5%和其它股票波动1%视为一样的振幅，所以设置0.67（1/1.5）
// 作为振幅系数，注意zoom系数永远是倍数，和用来触发交易信号的阈值没有关系
export const ZOOM = {
  sh601328: 1.5, // 交行
};

export const STOCK_GROUPS = {
  深银: {
    threshold: 2.0,
    lookBackDays: 1,
    stocks: [
      'sz000001', // 平安
      'sz002142', // 宁波
      'sh600036', // 招商
    ],
  },
  沪银: {
    threshold: 2.0,
    lookBackDays: 2,
    stocks: [
      'sh601398', // 工行
      'sh601988', // 中行
      'sh601288', // 农行
      'sh601939', // 建行
      'sh601328', // 交行
    ],
  },
};

export const STOCK_CODES = Object.values(STOCK_GROUPS)
  .reduce((all, group) => all.concat(group.stocks), []);

export const HOLDING_NEW_STOCK = '';
