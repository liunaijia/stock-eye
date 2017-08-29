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
});
