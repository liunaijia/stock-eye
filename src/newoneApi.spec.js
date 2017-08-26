import { readAlertMessage } from './newoneApi';

describe('newoneApi', () => {
  describe('readAlertMessage', () => {
    it('returns the last alert message', () => {
      const text = 'alert(\'first\'); alert(\'second\');';

      const message = readAlertMessage(text);

      expect(message).toBe('second');
    });

    it('returns the message if there is only one', () => {
      const text = 'alert(\'only one\');';

      const message = readAlertMessage(text);

      expect(message).toBe('only one');
    });

    it('returns nothing if there is no alert message', () => {
      const text = 'function hello() { };';

      const message = readAlertMessage(text);

      expect(message).toBeNull();
    });
  });
});
