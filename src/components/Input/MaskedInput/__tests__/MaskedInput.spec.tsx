import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { MaskedInput } from '../MaskedInput';

describe('MaskedInput component', () => {
  const TEST_ID = 'MaskedtextInput';
  const mockOnChange = jest.fn<string, string[]>();
  const testData = [
    {
      mask: '#### #### #### ####',
      value: '4555666677778888',
      maskedValue: '4555 6666 7777 8888',
    },
    {
      mask: '## / ## / ####',
      value: '08051993',
      maskedValue: '08 / 05 / 1993',
    },
    {
      mask: '+61 # #### ####',
      value: '456472134',
      maskedValue: '+61 4 5647 2134',
    },
  ];

  beforeAll(() => {
    jest.useFakeTimers();
  });

  const getRenderedTextInput = (inputMask: string, value?: string) =>
    render(<MaskedInput testID={TEST_ID} inputMask={inputMask} value={value} onChangeText={mockOnChange} />);

  it('Shoud mask onChange value', async () => {
    let i = 0;
    for (const { mask, maskedValue, value } of testData) {
      const { getByTestId } = getRenderedTextInput(mask);
      const input = getByTestId(TEST_ID);
      await act(async () => {
        fireEvent.changeText(input, value);
      });
      await act(async () => {
        jest.runOnlyPendingTimers();
      });
      expect(mockOnChange.mock.calls[i++][0]).toBe(maskedValue);
    }
  });
});
