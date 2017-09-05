/* eslint-disable global-require */
describe('runDuringTradeTime', () => {
  let funcToRun;

  beforeEach(() => {
    jest.resetModules();
    funcToRun = jest.fn();
  });

  function setIsTradeTime(mockValue) {
    jest.doMock('../time', () => ({
      isTradeTime: jest.fn().mockReturnValue(mockValue),
    }));
  }

  it('calls function to run when it is trade time', () => {
    setIsTradeTime(true);

    const job = require('./job');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(funcToRun).toHaveBeenCalled();
  });

  it('does not call function to run when it is not trade time', () => {
    setIsTradeTime(false);

    const job = require('./job');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(funcToRun).not.toHaveBeenCalled();
  });

  it('calls function to run when run on start up is enabled even it is not trade time', () => {
    setIsTradeTime(false);

    const job = require('./job');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: true })(funcToRun);

    expect(funcToRun).toHaveBeenCalled();
  });

  fit('x', () => {
    jest.useFakeTimers();
    const time = require('../time');
    time.sleep(3);

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(3000);

    time.sleep(1);
    expect(setTimeout.mock.calls.length).toBe(2);
    expect(setTimeout.mock.calls[1][1]).toBe(1000);
  });

  it('sleeps with given intervals', () => {
    jest.useFakeTimers();
    setIsTradeTime(false);

    const job = require('./job');
    job.runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(3000);
    jest.runOnlyPendingTimers();

    // Regardless how to setup the context, the timeout will not be trigger for another time.
    expect(setTimeout.mock.calls.length).toBe(2);
    expect(setTimeout.mock.calls[1][1]).toBe(3000);
  });
});
/* eslint-enable global-require */
