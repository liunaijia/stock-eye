
/* eslint-disable global-require */
describe('runDuringTradeTime', () => {
  let funcToRun;

  beforeEach(() => {
    jest.resetModules();
    funcToRun = jest.fn();
  });

  function setIsTradeTime(mockValue) {
    jest.doMock('./time', () => ({
      isTradeTime: jest.fn().mockReturnValue(mockValue),
      sleep: jest.fn().mockReturnValue(new Promise(() => {})),
    }));
  }

  it('calls function to run when it is trade time', () => {
    setIsTradeTime(true);

    const job = require('./schedule');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(funcToRun).toHaveBeenCalled();
  });

  it('does not call function to run when it is not trade time', () => {
    setIsTradeTime(false);

    const job = require('./schedule');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(funcToRun).not.toHaveBeenCalled();
  });

  it('calls function to run when run on start up is enabled even it is not trade time', () => {
    setIsTradeTime(false);

    const job = require('./schedule');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: true })(funcToRun);

    expect(funcToRun).toHaveBeenCalled();
  });

  it('sleeps with given intervals', () => {
    setIsTradeTime(false);

    const job = require('./schedule');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    const { sleep } = require('./time');
    expect(sleep).toHaveBeenCalledWith(3);
  });
});
/* eslint-enable global-require */
