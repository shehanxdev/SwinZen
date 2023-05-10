import { renderHook } from '@testing-library/react-hooks';

import { getMaskedMail } from '../common.helpers';

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
});
