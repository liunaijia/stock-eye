import { isTradeTime, sleep } from './time';
import { sendNotification } from '../notification';

export const runDuringTradeTime = ({ interval = 1, runOnStartUp = true }) => {
  let hasStarted = false;
  let cancelled = false;

  function schedule(block) {
    // if cancelled flag is set, stop running
    if (cancelled) {
      return null;
    }

    // wrap the block into an async function, because the return value of schedule function
    // needs to be a function not a promise.
    (async () => {
      try {
        if ((runOnStartUp && !hasStarted) || isTradeTime()) {
          hasStarted = true;
          await block();
        }
      // else {
      // setBadge('');
      // }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        sendNotification({ title: e.message });
      } finally {
        await sleep(interval);
        schedule(block);
      }
    })();

    const cancel = () => { cancelled = true; };
    return cancel;
  }

  return schedule;
};
