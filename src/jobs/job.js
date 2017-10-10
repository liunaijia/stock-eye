import { isTradeTime, sleep } from '../time';
import { sendNotification } from '../chromeApi';

// eslint-disable-next-line import/prefer-default-export
export const runDuringTradeTime = ({ interval = 1, runOnStartUp = true }) => {
  let hasStarted = false;
  const func = async (block) => {
    try {
      if ((runOnStartUp && !hasStarted) || isTradeTime()) {
        hasStarted = true;
        await block();
      }
      // else {
      // setBadge('');
      // }
    } catch (e) {
      console.error(e);
      sendNotification({ title: e.message });
    } finally {
      await sleep(interval);
      func(block);
    }
  };

  return func;
};
