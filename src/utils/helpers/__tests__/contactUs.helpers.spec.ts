import { formatMobileNumber } from '../contactUs.helpers';

describe('contact us helper test cases', () => {
  const testCases = [
    { input: '+1-123-456-7890', expectedOutput: '123-456-7890' },
    { input: '+1-987-654-3210', expectedOutput: '987-654-3210' },
    { input: '+1-987-654-5610', expectedOutput: '987-654-5610' },
    { input: '+1-987-874-3210', expectedOutput: '987-874-3210' },
  ];

  it('should format internation US number into Domestic US number format', () => {
    testCases.forEach(testCase => {
      const formattedNumber = formatMobileNumber(testCase.input);
      expect(formattedNumber).toEqual(testCase.expectedOutput);
    });
  });
});
