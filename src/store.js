import { init as initStore } from '@rematch/core';
import selectPlugin from '@rematch/select';
import * as models from './models';

const init = () => initStore({
  plugins: [selectPlugin()],
  models,
});

export { init };
export default init();
