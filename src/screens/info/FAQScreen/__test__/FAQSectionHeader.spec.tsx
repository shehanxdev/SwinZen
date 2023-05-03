import { render } from '@testing-library/react-native';

import { FAQSectionHeader } from '../components/FAQSectionHeader';

describe('FAQ section header', () => {
  const testID = 'FAQSectionHeaderTestID';
  const dummyFAQ = [
    {
      title: 'Lorem ipsum dolor sit amet, consectetur',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non dolor purus. Nunc semper sapien congue tortor',
    },
  ];

  const getRenderedComponent = () => render(<FAQSectionHeader content={dummyFAQ[0]} index={1} isActive={true} />);

  it(`should render FAQ Section content correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the FAQ Screen via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
