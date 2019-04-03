import { isTradeTime, sleep } from './time';

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
        console.error(e);
        new Notification(e.message); // eslint-disable-line no-new
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
