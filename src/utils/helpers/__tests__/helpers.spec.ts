import { renderHook } from '@testing-library/react-hooks';

import { DataProps, getMaskedMail, getSectionList } from '../helpers';

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

describe('getSectionList function', () => {
  const getRenderedMaskedMail = (dataArray: DataProps[]) => renderHook(() => getSectionList(dataArray));
  const mockDate = new Date();

  // avoiding seconds issue, when test cases execution
  mockDate.setSeconds(0);

  it('should return a array with a object, Today as title property and dataArray as the data property', async () => {
    const dataArray = [
      {
        time: mockDate,
        message: 'test message one',
        read: false,
      },
      {
        time: mockDate,
        message: 'test message two',
        read: true,
      },
    ];
    const { result } = getRenderedMaskedMail(dataArray);

    const expectedResult = [
      {
        title: 'Today',
        data: [
          {
            time: mockDate,
            message: 'test message one',
            read: false,
          },
          {
            time: mockDate,
            message: 'test message two',
            read: true,
          },
        ],
      },
    ];
    expect(result.current).toStrictEqual(expectedResult);
  });

  it('should return a array with two objects, Today as title property and dataArray first item as the data property and Yesterday as title property and dataArray second item as the data property', async () => {
    // getting yesterday date
    const mockYesterday = new Date(mockDate);
    mockYesterday.setDate(mockYesterday.getDate() - 1);

    const dataArray = [
      {
        time: mockDate,
        message: 'test message one',
        read: false,
      },
      {
        time: mockYesterday,
        message: 'test message two',
        read: true,
      },
    ];
    const { result } = getRenderedMaskedMail(dataArray);

    const expectedResult = [
      {
        title: 'Today',
        data: [
          {
            time: mockDate,
            message: 'test message one',
            read: false,
          },
        ],
      },
      {
        title: 'Yesterday',
        data: [
          {
            time: mockYesterday,
            message: 'test message two',
            read: true,
          },
        ],
      },
    ];
    expect(result.current).toStrictEqual(expectedResult);
  });
});
