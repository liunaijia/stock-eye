import { init } from '../store';
import { fetchCurrentQuotes } from '../apis';

jest.mock('../apis');

describe('currentQuotes', () => {
  let store;

  beforeEach(() => {
    store = init();
  });

  it('adds quotes to store', () => {
    const payload = [
      { stockCode: 'sh601398', current: 5.56 },
      { stockCode: 'sh601988', current: 3.68 },
    ];
    store.dispatch.currentQuotes.add(payload);

    expect(store.getState().currentQuotes).toEqual({
      sh601398: { current: 5.56, stockCode: 'sh601398' },
      sh601988: { current: 3.68, stockCode: 'sh601988' },
    });
  });

  it('merges quotes to existing ones', () => {
    const existing = [
      { stockCode: 'sh601398', current: 5.56 },
      { stockCode: 'sh601988', current: 3.68 },
    ];
    store.dispatch.currentQuotes.add(existing);

    const payload = [
      { stockCode: 'sh601398', current: 5.59 },
      { stockCode: 'sh600036', current: 29.57 },
    ];
    store.dispatch.currentQuotes.add(payload);

    expect(store.getState().currentQuotes).toEqual({
      sh601398: { current: 5.59, stockCode: 'sh601398' },
      sh601988: { current: 3.68, stockCode: 'sh601988' },
      sh600036: { current: 29.57, stockCode: 'sh600036' },
    });
  });


  it('fetches quotes with given stock codes', async () => {
    fetchCurrentQuotes.resolve([
      { stockCode: 'sh601398', current: 5.56 },
      { stockCode: 'sh600036', current: 29.57 },
    ]);
    await store.dispatch.currentQuotes.fetch(['sh601398', 'sh600036']);

    expect(store.getState().currentQuotes).toEqual({
      sh601398: { current: 5.56, stockCode: 'sh601398' },
      sh600036: { current: 29.57, stockCode: 'sh600036' },
    });
  });

  it('selects itself', () => {

  });
});
