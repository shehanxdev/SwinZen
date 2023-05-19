import { render } from '@testing-library/react-native';
import * as React from 'react';

import { FaqSection } from '@sz/models';

import { FAQSectionContent } from '../components/FAQSectionContent';

describe('FAQ section content', () => {
  const testID = 'FAQSectionContentTestID';

  const dummyFAQ: FaqSection = {
    question: 'Lorem ipsum dolor sit amet, consectetur',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non dolor purus. Nunc semper sapien congue tortor',
    questionNumber: 1,
  };

  const getRenderedComponent = () =>
    render(
      <FAQSectionContent
        question={dummyFAQ.question}
        answer={dummyFAQ.answer}
        questionNumber={dummyFAQ.questionNumber}
      />,
    );

  it(`should render FAQ Section content correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the FAQ section content via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
