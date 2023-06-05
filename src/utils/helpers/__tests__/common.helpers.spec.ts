import { renderHook } from '@testing-library/react-hooks';

import { addPadToNumber, getMaskedMail } from '../common.helpers';

describe('common helpers test cases', () => {
  describe('getMaskedMail function', () => {
    const getRenderedMaskedMail = (email: string, mask?: string) => renderHook(() => getMaskedMail(email, mask));

    it('should return the masked mail minimum with two characters', async () => {
      const email = 'xy@gmail.com';
      const { result } = getRenderedMaskedMail(email);

      expect(result.current).toBe('xy@gmail.com');
    });

    it('should return the masked mail with first and last character', async () => {
      const email = 'example@gmail.com';
      const { result } = getRenderedMaskedMail(email);

      expect(result.current).toBe('e*****e@gmail.com');
    });

    it('should return the masked mail with the given mask', async () => {
      const email = 'example@gmail.com';
      const mask = '#';
      const { result } = getRenderedMaskedMail(email, mask);

      expect(result.current).toBe('e#####e@gmail.com');
    });
  });

  describe('addPadToNumber function', () => {
    const getRenderedMaskedMail = (number: number, size?: number) => renderHook(() => addPadToNumber(number, size));

    it('should return a string with leading zero', async () => {
      const number = 2;
      const { result } = getRenderedMaskedMail(number);

      expect(result.current).toBe('02');
    });

    it('should return a string with leading two zeros', async () => {
      const number = 2;
      const size = 3;
      const { result } = getRenderedMaskedMail(number, size);

      expect(result.current).toBe('002');
    });
  });
});
