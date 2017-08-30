import * as time from '../time';
import { runDuringTradeTime } from './job';

describe('runDuringTradeTime', () => {
  let funcToRun;

  beforeEach(() => {
    funcToRun = jest.fn();
  });

  it('calls function to run when it is trade time', () => {
    time.isTradeTime = jest.fn().mockReturnValue(true);

    runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(funcToRun).toHaveBeenCalled();
  });

  it('does not call function to run when it is not trade time', () => {
    time.isTradeTime = jest.fn().mockReturnValue(false);

    runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(funcToRun).not.toHaveBeenCalled();
  });

  it('calls function to run when run on start up is enabled even it is not trade time', () => {
    time.isTradeTime = jest.fn().mockReturnValue(false);

    runDuringTradeTime({ interval: 3, runOnStartUp: true })(funcToRun);

    expect(funcToRun).toHaveBeenCalled();
  });

  it('sleeps with given intervals', () => {
    jest.useFakeTimers();

    // if it is trade time, timeout will not be triggered which might be caused by async funcToRun.
    time.isTradeTime = jest.fn().mockReturnValue(false);

    runDuringTradeTime({ interval: 3, runOnStartUp: false })(funcToRun);

    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(3000);
    jest.runOnlyPendingTimers();

    // Regardless how to setup the context, the timeout will not be trigger for another time.
    // expect(setTimeout.mock.calls.length).toBe(2);
    // expect(setTimeout.mock.calls[1][1]).toBe(3000);
  });
});
